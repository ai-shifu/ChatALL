import axios from "axios";
import WebSocketAsPromised from "websocket-as-promised";
import Bot from "@/bots/Bot";
import i18n from "@/i18n";

export default class GradioBot extends Bot {
  static _brandId = "gradio"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "GradioBot"; // Class name of the bot
  static _logoFilename = "gradio-logo.svg"; // Place it in assets/bots/
  static _loginUrl = ""; // Any Gradio URL
  static _fnIndexes = [0]; // Indexes of the APIs to call in order. Sniffer it by devtools.

  config = {};

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    if (this.constructor._loginUrl === "") {
      this.constructor._isAvailable = false;
    } else {
      try {
        // Remove trailing slash
        this.constructor._loginUrl = this.constructor._loginUrl.replace(
          /\/$/,
          "",
        );

        const response = await axios.get(
          this.constructor._loginUrl + "/config",
        );
        this.config = response.data;
        this.config.path = response.data.path ?? "";
        this.config.root = this.constructor._loginUrl;

        this.constructor._isAvailable = true;
      } catch (err) {
        console.log(err);
        this.constructor._isAvailable = false;
      }
    }

    return this.isAvailable(); // Always return like this
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    for (const key in this.constructor._fnIndexes) {
      const fn_index = this.constructor._fnIndexes[key];
      await this._sendFnIndex(
        fn_index,
        prompt,
        onUpdateResponse,
        callbackParam,
      );
    }
  }

  async _sendFnIndex(fn_index, prompt, onUpdateResponse, callbackParam) {
    const config = this.config;
    const session_hash = await this.getChatContext();
    return new Promise((resolve, reject) => {
      try {
        const url = new URL(config.root + config.path + "/queue/join");
        url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

        const data = this.makeData(fn_index, prompt);

        const wsp = new WebSocketAsPromised(url.toString(), {
          packMessage: (data) => {
            return JSON.stringify(data);
          },
          unpackMessage: (data) => {
            return JSON.parse(data);
          },
        });

        wsp.onUnpackedMessage.addListener(async (event) => {
          if (event.msg === "send_hash") {
            wsp.sendPacked({ fn_index, session_hash });
          } else if (event.msg === "send_data") {
            // Requested to send data
            wsp.sendPacked({
              data,
              event_data: null,
              fn_index,
              session_hash,
            });
          } else if (event.msg === "estimation") {
            if (event.rank > 0) {
              // Waiting in queue
              event.rank_eta = Math.floor(event.rank_eta);
              onUpdateResponse(callbackParam, {
                content: i18n.global.t("gradio.waiting", { ...event }),
                done: false,
              });
            }
          } else if (event.msg === "process_generating") {
            // Generating data
            if (event.success && event.output.data) {
              onUpdateResponse(callbackParam, {
                content: this.parseData(fn_index, event.output.data),
                done: false,
              });
            } else {
              reject(new Error(event.output.error));
            }
          } else if (event.msg === "process_completed") {
            // Done
            if (event.success && event.output.data) {
              onUpdateResponse(callbackParam, {
                content: this.parseData(fn_index, event.output.data),
                done: fn_index == this.constructor._fnIndexes.slice(-1), // Only the last one is done
              });
            } else {
              reject(new Error(event.output.error));
            }
            wsp.removeAllListeners();
            wsp.close();
            resolve();
          } else if (event.msg === "queue_full") {
            reject(i18n.global.t("gradio.queueFull"));
          }
        });

        wsp.onClose.addListener((event) => {
          console.log("WebSocket closed:", event);
          wsp.removeAllListeners();
          wsp.close();
          reject(new Error(i18n.global.t("error.closedByServer")));
        });

        wsp.onError.addListener((event) => {
          wsp.removeAllListeners();
          wsp.close();
          reject(
            i18n.global.t("error.failedConnectUrl", { url: event.target.url }),
          );
        });

        wsp.open();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    return Math.random().toString(36).substring(2);
  }
}
