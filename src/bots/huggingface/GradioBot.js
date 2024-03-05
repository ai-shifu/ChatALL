import axios from "axios";
import Bot from "@/bots/Bot";
import i18n from "@/i18n";
import { SSE } from "sse.js";

export default class GradioBot extends Bot {
  static _brandId = "gradio"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "GradioBot"; // Class name of the bot
  static _logoFilename = "gradio-logo.svg"; // Place it in public/bots/
  static _loginUrl = ""; // Any Gradio URL
  static _fnIndexes = [0]; // Indexes of the APIs to call in order. Sniffer it by devtools.

  config = {};
  eventListeners = new Map();

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    if (this.constructor._loginUrl !== "") {
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

        available = true;
      } catch (err) {
        console.log(err);
      }
    }

    return available;
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

    const joinUrl = new URL(config.root + config.path + "/queue/join");
    const data = this.makeData(fn_index, prompt);

    const streamData = {
      data,
      event_data: null,
      fn_index,
      session_hash,
      trigger_id: this._triggerId ?? 0,
    };
    const streamContext = await axios.post(joinUrl.toString(), streamData);

    if (streamContext.status !== 200 || !streamContext.data.event_id) {
      return Promise.reject(
        i18n.global.t("error.failedConnectUrl", { url: joinUrl }),
      );
    }

    return new Promise((resolve, reject) => {
      try {
        const dataUrl = new URL(config.root + config.path + "/queue/data");
        dataUrl.searchParams.set("session_hash", session_hash);

        const source = new SSE(dataUrl.toString());

        const onMessageEventHandler = (event) => {
          const data = JSON.parse(event.data);

          if (data.msg === "estimation") {
            if (data.rank > 0) {
              // Waiting in queue
              data.rank_eta = Math.floor(data.rank_eta);
              onUpdateResponse(callbackParam, {
                content: i18n.global.t("gradio.waiting", { ...data }),
                done: false,
              });
            }
          } else if (data.msg === "process_generating") {
            // Generating data
            if (data.success && data.output.data) {
              onUpdateResponse(callbackParam, {
                content: this.parseData(fn_index, data.output.data),
                done: false,
              });
            } else {
              reject(new Error(data.output.error));
            }
          } else if (data.msg === "process_completed") {
            // Done
            if (data.success && data.output.data) {
              if (
                typeof data.output.data[2] !== "string" ||
                data.output.data[2] === ""
              ) {
                onUpdateResponse(callbackParam, {
                  content: this.parseData(fn_index, data.output.data),
                  done: fn_index == this.constructor._fnIndexes.slice(-1), // Only the last one is done
                });
              } else {
                const errorMsg = this.parseError(data.output.data[2]);
                reject(new Error(errorMsg));
              }
            }

            this.removeAllEventListeners(source);
            source.close();
            resolve();
          } else if (data.msg === "queue_full") {
            reject(i18n.global.t("gradio.queueFull"));
          }
        };

        const onAbortEventHandler = (event) => {
          console.log("Server-Sent Event closed:", event);
          this.removeAllEventListeners(source);
          source.close();
          reject(new Error(i18n.global.t("error.closedByServer")));
        };

        const onErrorEventHandler = (event) => {
          this.removeAllEventListeners(source);
          source.close();
          reject(
            i18n.global.t("error.failedConnectUrl", { url: event.target.url }),
          );
        };

        this.eventListeners.set("message", onMessageEventHandler);
        this.eventListeners.set("error", onErrorEventHandler);
        this.eventListeners.set("abort", onAbortEventHandler);

        for (const [eventName, eventHandler] of this.eventListeners) {
          source.addEventListener(eventName, eventHandler);
        }

        source.stream();
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

  parseError(errorMsg) {
    return errorMsg;
  }

  removeAllEventListeners(source) {
    for (const [eventName, eventHandler] of this.eventListeners) {
      source.removeEventListener(eventName, eventHandler);
    }
  }
}
