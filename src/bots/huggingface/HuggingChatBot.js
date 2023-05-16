import AsyncLock from "async-lock";
import axios from "axios";
import { SSE } from "sse.js";
import { v4 as uuidv4 } from "uuid";
import Bot from "@/bots/Bot";
import i18n from "@/i18n";

export default class HuggingChatBot extends Bot {
  static _brandId = "huggingChat"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "HuggingChatBot"; // Class name of the bot
  static _logoFilename = "huggingchat-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://huggingface.co/chat/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  conversationId = "";

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    // Create a conversation to test if the bot is available
    const conversationId = await this.createConversation();
    if (conversationId) {
      this.constructor._isAvailable = true;
      // Delete the conversation after testing
      axios.delete(
        `https://huggingface.co/chat/conversation/${conversationId}`,
      );
    } else {
      this.constructor._isAvailable = false;
    }
    return this.isAvailable(); // Always return like this
  }

  packRequest(prompt) {
    return {
      inputs: prompt,
      parameters: {
        temperature: 0.9,
        truncate: 1000,
        max_new_tokens: 1024,
        stop: ["</s>"],
        top_p: 0.95,
        repetition_penalty: 1.2,
        top_k: 50,
        return_full_text: false,
      },
      stream: true,
      options: {
        id: uuidv4(),
        is_retry: false,
        use_cache: false,
      },
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
    return new Promise((resolve, reject) => {
      (async () => {
        // If there's no chat session, create one
        if (!this.conversationId) {
          this.conversationId = await this.createConversation();
          if (!this.conversationId) {
            reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
          }
        }

        const source = new SSE(
          `https://huggingface.co/chat/conversation/${this.conversationId}`,
          {
            headers: { "Content-Type": "application/json" },
            payload: JSON.stringify(this.packRequest(prompt)),
          },
        );

        let text = "";
        source.addEventListener("message", (event) => {
          const data = JSON.parse(event.data);
          if (data.generated_text === null) {
            text += data.token.text;
            onUpdateResponse(callbackParam, { content: text, done: false });
          } else {
            // the last message
            onUpdateResponse(callbackParam, {
              content: data.generated_text,
              done: true,
            });
            source.close();
            resolve();
          }
        });

        source.addEventListener("error", (error) => {
          source.close();
          reject(new Error(error.data.error));
        });

        source.addEventListener("done", () => {
          source.close();
          resolve();
        });

        source.stream();
      })();
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createConversation() {
    let conversationId = "";
    await axios
      .post("https://huggingface.co/chat/conversation", {
        model: "OpenAssistant/oasst-sft-6-llama-30b-xor",
      })
      .then(({ data: resp }) => {
        conversationId = resp.conversationId;
      })
      .catch((error) => {
        console.error(error);
      });
    return conversationId;
  }
}
