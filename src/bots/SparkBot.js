import axios from "axios";
import { SSE } from "sse.js";
import AsyncLock from "async-lock";

import i18n from "../i18n";
import Bot from "./Bot";

export default class SparkBot extends Bot {
  static _brandId = "spark";
  static _className = "SparkBot"; // Class name of the bot
  static _logoFilename = "spark-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://xinghuo.xfyun.cn/";
  static _lock = new AsyncLock(); // All Spark bots share the same lock

  static _chatId = 0; // ID of the chat session

  constructor() {
    super();
  }

  async checkAvailability() {
    try {
      const response = await axios.get(
        "https://xinghuo.xfyun.cn/iflygpt/userInfo"
      );
      this.constructor._isAvailable = response.data.flag;
    } catch (error) {
      console.error("Error checking Spark login status:", error);
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async createConversation() {
    try {
      const response = await axios.post(
        "https://xinghuo.xfyun.cn/iflygpt/u/chat-list/v1/create-chat-list",
        {}
      );

      if (response.data.flag && response.data.code === 0) {
        return response.data.data.id;
      } else {
        throw new Error(`Error creating conversation: ${response.data.desc}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    return null; // Return null if there's an error
  }

  async getGtToken() {
    return new Promise((resolve, reject) => {
      window.initGeeGuard(
        {
          appId: "ihuqg3dmuzcr2kmghumvivsk7c3l4joe",
          https: true,
        },
        function (t) {
          if (t.status === "success") {
            resolve(t.data.gee_token);
          } else {
            reject(new Error("Failed to get GtToken", t));
          }
        }
      );
    });
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // If there's no chat session, create one
          if (this.constructor._chatId === 0) {
            var chatId = await this.createConversation();
            if (chatId) {
              this.constructor._chatId = chatId;
            } else {
              onUpdateResponse(
                i18n.global.t("bot.failedToCreateConversation"),
                callbackParam,
                true
              );
              reject();
            }
          }

          // Create FormData payload
          const GtToken = await this.getGtToken();
          const formData = new FormData();
          formData.append("fd", String(+new Date()).slice(-6));
          formData.append("chatId", this.constructor._chatId);
          formData.append("text", prompt);
          formData.append("GtToken", GtToken);
          formData.append("clientType", "1");

          const source = new SSE(
            "https://xinghuo.xfyun.cn/iflygpt/u/chat_message/chat",
            { payload: formData }
          );

          var text = "";
          source.addEventListener("message", (event) => {
            if (event.data === "<end>") {
              onUpdateResponse(null, callbackParam, true);
              source.close();
              resolve();
            } else if (event.data.slice(-5) === "<sid>") {
              // ignore <sid> message
              return;
            } else {
              try {
                text += Buffer.from(event.data, "base64").toString("utf8");
                onUpdateResponse(text, callbackParam, false);
              } catch (error) {
                console.error("Error decoding Spark response:", error);
                onUpdateResponse(error.data, callbackParam, true);
                source.close();
                reject(error);
              }
            }
          });

          source.addEventListener("error", (error) => {
            console.error("Error handling real-time updates:", error);
            onUpdateResponse(error.data, callbackParam, true);
            source.close();
            reject(error);
          });

          source.addEventListener("done", () => {
            source.close();
            resolve();
          });

          source.stream();
        } catch (error) {
          console.error("Error sending prompt to Spark:", error);
          reject(error);
        }
      })();
    });
  }
}
