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

  chatId = 0; // ID of the chat session

  constructor() {
    super();
  }

  async checkAvailability() {
    try {
      const response = await axios.get(
        "https://xinghuo.xfyun.cn/iflygpt/userInfo",
      );
      this.constructor._isAvailable = response.data.flag;
    } catch (error) {
      console.error("Error checking Spark login status:", error);
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async createConversation() {
    const response = await axios.post(
      "https://xinghuo.xfyun.cn/iflygpt/u/chat-list/v1/create-chat-list",
      {},
    );

    if (response.data.flag && response.data.code === 0) {
      return response.data.data.id;
    } else {
      console.error("Error creating conversation:", response.data.desc);
      return 0;
    }
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
        },
      );
    });
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return new Promise((resolve, reject) => {
      (async () => {
        // If there's no chat session, create one
        if (this.chatId === 0) {
          this.chatId = await this.createConversation();
          if (!this.chatId) {
            reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
          }
        }

        // Create FormData payload
        const GtToken = await this.getGtToken();
        const formData = new FormData();
        formData.append("fd", String(+new Date()).slice(-6));
        formData.append("chatId", this.chatId);
        formData.append("text", prompt);
        formData.append("GtToken", GtToken);
        formData.append("clientType", "1");

        const source = new SSE(
          "https://xinghuo.xfyun.cn/iflygpt/u/chat_message/chat",
          { payload: formData },
        );

        let text = "";
        source.addEventListener("message", (event) => {
          if (event.data === "<end>") {
            onUpdateResponse(callbackParam, { done: true });
            source.close();
            resolve();
          } else if (event.data.slice(-5) === "<sid>") {
            // ignore <sid> message
            return;
          } else if (event.data.startsWith("[") && event.data.endsWith("]")) {
            source.close();
            reject(new Error(event.data));
          } else {
            try {
              let partialText;
              if (event.data[0] === "{") {
                // JSON data
                const data = JSON.parse(event.data);
                partialText = data.descr;
              } else if (event.data[0] === "[") {
                // [error] or [geeError]
                partialText = event.data;
              } else {
                // Normal data
                partialText = Buffer.from(event.data, "base64").toString(
                  "utf8",
                );
              }
              text += partialText;
              onUpdateResponse(callbackParam, { content: text, done: false });
            } catch (error) {
              console.error("Error decoding Spark response:", error);
              source.close();
              reject(new Error(error.data));
            }
          }
        });

        source.addEventListener("error", (error) => {
          source.close();
          reject(new Error(error.data));
        });

        source.addEventListener("done", () => {
          source.close();
          resolve();
        });

        source.stream();
      })();
    });
  }
}
