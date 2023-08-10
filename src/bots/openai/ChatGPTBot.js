import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SSE } from "sse.js";
import AsyncLock from "async-lock";

import Bot from "@/bots/Bot";
import store from "@/store";

// Inspired by https://v2ex.com/t/926890
const REFRESH_SESSION_URL =
  "https://chat.openai.com/_next/static/k9OKjvwgjWES7JT3k-6g9/_ssgManifest.js";

export default class ChatGPTBot extends Bot {
  static _brandId = "chatGpt";
  static _className = "ChatGPTBot"; // Class name of the bot
  static _logoFilename = "chatgpt-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://chat.openai.com/";
  // Remove Electron from the user agent to avoid blank login screen of Google
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) chatall/1.29.40 Chrome/114.0.5735.134 Safari/537.36";
  static _model = "";
  static _lock = new AsyncLock(); // All ChatGPT bots share the same lock

  static _sessionRefreshing = {
    interval: 0,
    id: null,
  };

  accessToken = "";

  constructor() {
    super();
    this.setRefreshCycle(store.state.chatgpt.refreshCycle);
  }

  async checkAvailability() {
    try {
      const response = await axios.get(
        "https://chat.openai.com/api/auth/session",
      );
      if (response.data?.error) {
        this.constructor._isAvailable = false;
      } else if (response.data?.accessToken) {
        this.accessToken = response.data.accessToken;
        this.constructor._isAvailable = true;
      } else {
        this.constructor._isAvailable = false;
      }
    } catch (error) {
      console.error("Error checking ChatGPT login status:", error);
      this.constructor._isAvailable = false;
    }
    // Toggle periodic session refreshing based on login status
    this.toggleSessionRefreshing(this.isAvailable());
    return this.isAvailable();
  }

  async createChatContext() {
    return { conversationId: undefined, parentMessageId: uuidv4() };
  }

  refreshSession() {
    axios.get(REFRESH_SESSION_URL).catch((error) => {
      // the REFRESH_SESSION_URL always returns a 404 error
      // if 403, then the session has expired
      if (error.response && error.response.status === 403) {
        this.constructor._isAvailable = false;
        this.toggleSessionRefreshing(false);
      }
    });
  }

  /**
   * @param {int} cycle - Refresh cycle in seconds
   */
  setRefreshCycle(cycle) {
    const sr = this.constructor._sessionRefreshing;
    sr.interval = cycle * 1000;
    this.toggleSessionRefreshing(sr.interval > 0);
  }

  toggleSessionRefreshing(shouldRefresh) {
    const sr = this.constructor._sessionRefreshing;

    if (sr.id) {
      clearInterval(sr.id);
      sr.id = null;
    }

    if (shouldRefresh && sr.interval > 0) {
      this.refreshSession();
      sr.id = setInterval(this.refreshSession.bind(this), sr.interval);
    }
  }

  // Credit: https://github.com/linweiyuan/go-chatgpt-api/issues/175
  async getArkoseToken() {
    let token = void 0;

    if (this.constructor._model !== "text-davinci-002-render-sha") {
      await axios.get("https://arkose-token.linweiyuan.com/").then((res) => {
        token = res.data.token;
      });
    }

    return token;
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // Make sure the access token is available
    if (!this.accessToken) await this.checkAvailability();

    // Send the prompt to the ChatGPT API
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
    const context = await this.getChatContext();
    const payload = JSON.stringify({
      action: "next",
      arkose_token: await this.getArkoseToken(),
      messages: [
        {
          id: uuidv4(),
          author: { role: "user" },
          content: {
            content_type: "text",
            parts: [prompt],
          },
        },
      ],
      conversation_id: context.conversationId,
      parent_message_id: context.parentMessageId,
      model: this.constructor._model,
      history_and_training_disabled: false, // allow training
    });

    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          "https://chat.openai.com/backend-api/conversation",
          { headers, payload },
        );

        let preInfo = [];
        source.addEventListener("message", (event) => {
          const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
          if (event.data === "[DONE]") {
            onUpdateResponse(callbackParam, { done: true });
            source.close();
            resolve();
          } else if (regex.test(event.data)) {
            // Ignore the timestamp
            return;
          } else
            try {
              const data = JSON.parse(event.data);
              this.setChatContext({
                conversationId: data.conversation_id,
                parentMessageId: data.message.id,
              });
              const content = data.message?.content;
              if (
                content?.content_type === "code" ||
                content?.content_type === "system_error"
              ) {
                // Preprocessing info
                onUpdateResponse(callbackParam, {
                  content:
                    "```python\n" +
                    preInfo.join("\n") +
                    (preInfo.length > 0 ? "\n" : "") +
                    content.text +
                    "\n```",
                  done: false,
                });
                if (data.message.status === "finished_successfully")
                  preInfo.push(content.text);
              } else if (content?.content_type === "text") {
                // The final response
                let text = content.parts[0];

                if (preInfo.length > 0)
                  text = "```python\n" + preInfo.join("\n") + "\n```\n" + text;

                const citations = data.message.metadata?.citations;
                if (citations) {
                  citations.forEach((element) => {
                    text += `\n> 1. [${element.metadata.title}](${element.metadata.url})`;
                  });
                }

                onUpdateResponse(callbackParam, {
                  content: text,
                  done: false,
                });
              }
            } catch (error) {
              console.error("Error parsing ChatGPT response:", error);
              console.error("ChatGPT response:", event);
              return;
            }
        });

        source.addEventListener("error", (error) => {
          source.close();

          let message = "";
          if (error.data) {
            try {
              const data = JSON.parse(error.data);
              message = data.detail?.message || data.detail;
            } catch (e) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(error.data, "text/html");
              const msg = doc.querySelector(".message p");
              message = msg ? msg.textContent + ". " : "";
              const explanation = doc.querySelector(".explanation");
              message += explanation ? explanation.textContent : "";
            }
          } else {
            message = error.source.url;
          }

          reject(new Error(message));
        });

        source.stream();
      } catch (error) {
        reject(error);
      }
    });
  }
}
