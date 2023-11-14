import AsyncLock from "async-lock";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Bot, { LoginError } from "@/bots/Bot";
import i18n from "@/i18n";

export default class HuggingChatBot extends Bot {
  static _brandId = "huggingChat"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "HuggingChatBot"; // Class name of the bot
  static _logoFilename = "huggingchat-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://huggingface.co/chat/";
  static _model = "OpenAssistant/oasst-sft-6-llama-30b-xor";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    return true; // Support anonymous chat
  }

  packRequest(prompt) {
    return {
      inputs: prompt,
      id: uuidv4(),
      is_retry: false,
      response_id: uuidv4(),
      web_search: false,
    };
  }
  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const conversationId = await this.getChatContext();
    return new Promise((resolve, reject) => {
      (async () => {
        if (!conversationId) {
          reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
        }

        try {
          const response = await fetch(
            `${this.constructor._loginUrl}conversation/${conversationId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.packRequest(prompt)),
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            if (
              errorData.message === "Exceeded number of messages before login"
            ) {
              reject(new LoginError(errorData.message));
            } else {
              reject(new Error(errorData.message || "Unknown error"));
            }
            return;
          }

          const reader = response.body.getReader();
          let text = "";

          const processStream = async () => {
            const { done, value } = await reader.read();
            if (done) {
              return;
            }

            const dataChunk = new TextDecoder().decode(value);
            // Split the chunk into individual JSON strings
            const jsonDataArray = dataChunk.split("\n").filter(Boolean); // filter(Boolean) removes any empty strings

            for (let i = 0; i < jsonDataArray.length; i++) {
              const jsonData = jsonDataArray[i];
              const data = JSON.parse(jsonData);

              if (data.type === "stream") {
                text += data.token;
                onUpdateResponse(callbackParam, { content: text, done: false });
              } else if (data.type === "finalAnswer") {
                onUpdateResponse(callbackParam, {
                  content: data.text,
                  done: true,
                });
                return;
              }
            }
            await processStream(); // Continue processing stream
          };

          await processStream(); // Start processing stream
          resolve();
        } catch (error) {
          if (error.message === "network error") {
            // ignore network error
          } else {
            reject(new Error(error.message));
          }
        }
      })();
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    let conversationId = "";
    await axios
      .post(`${this.constructor._loginUrl}conversation`, {
        model: this.constructor._model,
      })
      .then(({ data: resp }) => {
        conversationId = resp.conversationId;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
    return conversationId;
  }
}
