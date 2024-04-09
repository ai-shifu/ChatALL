import Bot from "@/bots/Bot";
import store from "@/store";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class MistralBot extends Bot {
  static _brandId = "mistral"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "MistralBot"; // Class name of the bot
  static _logoFilename = "mistral-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://chat.mistral.ai/login";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;
    try {
      const response = await axios.get("https://chat.mistral.ai/chat");
      if (typeof response?.data === "string") {
        available = true;
      }
    } catch (error) {
      console.error("Error MistralBot _checkAvailability", error);
    }
    return available;
  }

  async createChatContext() {
    return { chatId: undefined };
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    if (!context.chatId) {
      // first message
      try {
        const result = await axios.post(
          "https://chat.mistral.ai/api/trpc/message.newChat?batch=1",
          {
            0: {
              json: {
                chatId: null,
                content: prompt,
                rag: false,
              },
              meta: {
                values: {
                  chatId: ["undefined"],
                },
              },
            },
          },
        );
        if (result?.data[0].result?.data?.json?.chatId) {
          context.chatId = result?.data[0].result?.data?.json?.chatId;
          this.setChatContext({
            chatId: context.chatId,
          });
        } else {
          throw Error("chatId empty newChat");
        }
      } catch (error) {
        console.error("Error MistralBot _sendPrompt message.newChat", error);
      }
    }

    try {
      await axios.post(
        "https://chat.mistral.ai/api/chat",
        {
          chatId: context.chatId,
          model: store.state.mistral.model,
          messageInput: context.chatId ? prompt : undefined,
          messageId: context.chatId ? uuidv4() : undefined,
          mode: context.chatId ? "append" : "retry",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          onDownloadProgress: (progressEvent) => {
            this.onResponseDownloadProgress(
              progressEvent,
              onUpdateResponse,
              callbackParam,
            );
          },
        },
      );
    } catch (error) {
      console.error("Error MistralBot _sendPrompt", error);
    } finally {
      onUpdateResponse(callbackParam, {
        done: true,
      });
    }
  }

  onResponseDownloadProgress(progressEvent, onUpdateResponse, callbackParam) {
    try {
      let text = "";
      const responses = progressEvent?.event?.currentTarget?.response
        ?.split("\n") // split with new line
        ?.filter((n) => n); //  filter empty string in array
      for (const response of responses) {
        const chunks = this.separateChunks(response);
        if (chunks.number == 0) {
          text += chunks.content
            .slice(1, chunks.content.length - 1)
            .replaceAll("\\n", "\n");
          onUpdateResponse(callbackParam, {
            content: text,
            done: false,
          });
        }
      }
      onUpdateResponse(callbackParam, {
        done: true,
      });
    } catch (error) {
      console.error("Error MistralBot onChatDownloadProgress", error);
    }
  }

  separateChunks(line) {
    const regex = /^(\d+):(.*)/;
    const match = line.match(regex);
    if (match) {
      return { number: match[1], content: match[2] };
    } else {
      return { number: undefined, content: line };
    }
  }
}
