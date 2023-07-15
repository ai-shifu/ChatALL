import Bot from "@/bots/Bot";
import i18n from "@/i18n";
import AsyncLock from "async-lock";
import axios from "axios";
import queryString from "query-string";
import { SSE } from "sse.js";

export default class OpenAssistantBot extends Bot {
  static _brandId = "openAssistant"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "OpenAssistantBot"; // Class name of the bot
  static _logoFilename = "open-assistant.svg"; // Place it in public/bots/
  static _loginUrl = "https://open-assistant.io/auth/signin/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    await axios
      .get("https://open-assistant.io/api/auth/session")
      .then((response) => {
        if (response.data) {
          this.constructor._isAvailable = false;
          // eslint-disable-next-line
          for (var i in response.data) {
            // if data object not empty, user logged in
            this.constructor._isAvailable = true;
            break;
          }
        } else {
          this.constructor._isAvailable = false;
        }
      })
      .catch((error) => {
        console.error("Error OpenAssistantBot check login:", error);
        this.constructor._isAvailable = false;
      });
    return this.isAvailable(); // Always return like this
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  // eslint-disable-next-line
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();

    const prompterResponse = await axios.post(
      "https://open-assistant.io/api/chat/prompter_message",
      { chat_id: context.id, content: prompt, parent_id: context.parent_id },
    );

    if (prompterResponse.status !== 200) {
      throw new Error(prompterResponse);
    }

    const assistantResponse = await axios.post(
      "https://open-assistant.io/api/chat/assistant_message",
      {
        chat_id: context.id,
        model_config_name: "OA_SFT_Llama_30B_6",
        content: prompt,
        parent_id: prompterResponse.data.id,
        plugins: [],
        sampling_parameters: {
          top_k: 50,
          top_p: 0.95,
          typical_p: null,
          temperature: 0.75,
          repetition_penalty: 1.2,
          max_new_tokens: 1024,
        },
      },
    );

    if (assistantResponse.status !== 200) {
      throw new Error(prompterResponse);
    }

    this.setChatContext({
      ...context,
      parent_id: assistantResponse.data.id, // save assistant response id for next prompt parent_id
    });

    const headers = {
      accept: "*/*",
    };
    const payload = {
      chat_id: context.id,
      message_id: assistantResponse.data.id,
    };
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          `https://open-assistant.io/api/chat/events?${queryString.stringify(
            payload,
          )}`,
          {
            headers,
            withCredentials: true,
          },
        );
        let text = "";
        source.addEventListener("message", (event) => {
          let data;
          try {
            // handle event data: ": ping - 2023-07-14 13:28:17.735145"
            data = JSON.parse(event.data);
          } catch {
            return;
          }
          switch (data.event_type) {
            case "pending":
              onUpdateResponse(callbackParam, {
                content: i18n.global.t("openAssistant.queue", {
                  ...data,
                }),
                done: false,
              });
              break;
            case "token":
              text += data.text;
              onUpdateResponse(callbackParam, {
                content: text,
                done: false,
              });
              break;
            case "message":
              onUpdateResponse(callbackParam, {
                content: data.message.content, // full message
                done: true,
              });
              break;
            default:
              break;
          }
          resolve();
        });
        source.addEventListener("error", (event) => {
          console.error(event);
          reject(this.getSSEDisplayError(event));
        });
        source.stream();
      } catch (err) {
        reject(err);
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
    let context = null;
    await axios.post("https://open-assistant.io/api/chat").then((response) => {
      if (response.status === 200) {
        context = {
          ...response.data,
        };
      }
    });
    return context;
  }
}
