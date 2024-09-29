import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SSE } from "sse.js";
import AsyncLock from "async-lock";

import Bot from "@/bots/Bot";
import store from "@/store";

// Inspired by https://v2ex.com/t/926890
const REFRESH_SESSION_URL =
  "https://chatgpt.com/_next/static/k9OKjvwgjWES7JT3k-6g9/_ssgManifest.js";

export default class ChatGPTBot extends Bot {
  static _brandId = "chatGpt";
  static _className = "ChatGPTBot"; // Class name of the bot
  static _logoFilename = "chatgpt-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://chatgpt.com/";
  // Remove Electron from the user agent to avoid blank login screen of Google
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) chatall/1.29.40 Chrome/114.0.5735.134 Safari/537.36";
  static _model = "";
  static _lock = new AsyncLock(); // All ChatGPT bots share the same lock

  static _sessionRefreshing = {
    interval: 0,
    id: null,
  };

  static _arkoseScriptLoaded = false;
  static _myEnforcement = null;
  static _arkosePromise = null;

  accessToken = "";

  constructor() {
    super();
    this.setRefreshCycle(store.state.chatgpt.refreshCycle);
  }

  async _checkAvailability() {
    let available = false;

    try {
      const response = await axios.get("https://chatgpt.com/api/auth/session");
      if (!response.data?.error && response.data?.accessToken) {
        this.accessToken = response.data.accessToken;
        available = true;
      }
    } catch (error) {
      console.error("Error checking ChatGPT login status:", error);
    }

    if (available) {
      this.loadArkoseScript();
    }
    // Toggle periodic session refreshing based on login status
    this.toggleSessionRefreshing(available);

    return available;
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

  loadArkoseScript() {
    // Append the Arkose JS tag to the Document Body. Reference https://github.com/ArkoseLabs/arkose-examples/blob/main/vue-example/src/components/Arkose.vue
    if (!ChatGPTBot._arkoseScriptLoaded) {
      ChatGPTBot._arkoseScriptLoaded = true;
      console.log("Loading Arkose API Script", this.getFullname());
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://tcr9i.chatgpt.com/v2/35536E1E-65B4-4D96-9D97-6ADB7EFF8147/api.js";
      script.setAttribute("data-callback", "setupEnforcement");
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Arkose API Script loaded");
        window.setupEnforcement = this.setupEnforcement.bind(this);
      };
      script.onerror = () => {
        console.log("Could not load the Arkose API Script!");
      };
    }
  }

  setupEnforcement(myEnforcement) {
    ChatGPTBot._myEnforcement = myEnforcement;
    ChatGPTBot._myEnforcement.setConfig({
      onReady: () => {},
      onShown: () => {},
      onShow: () => {},
      onSuppress: () => {},
      onCompleted: (response) => {
        ChatGPTBot._arkosePromise.resolve(response.token);
      },
      onReset: () => {},
      onHide: () => {},
      onError: (response) => {
        console.log("Arkose error:", response);
        ChatGPTBot._arkosePromise.reject(response);
      },
      onFailed: (response) => {
        console.log("Arkose failed:", response);
        ChatGPTBot._arkosePromise.reject(response);
      },
    });
  }

  async getArkoseToken() {
    if (ChatGPTBot._myEnforcement) {
      return new Promise((resolve, reject) => {
        ChatGPTBot._arkosePromise = { resolve, reject };
        ChatGPTBot._myEnforcement.run();
      });
    } else {
      return null;
    }
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // Make sure the access token is available
    if (!this.accessToken) await this.checkAvailability();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };

    let requirement;
    try {
      const result = await axios.post(
        "https://chatgpt.com/backend-api/sentinel/chat-requirements",
        undefined,
        { headers },
      );
      if (result) {
        requirement = result.data;
      }
    } catch (error) {
      console.error("Error get chat-requirements token:", error);
      console.error("ChatGPT response:", event);
    }

    if (requirement.token) {
      headers["Openai-Sentinel-Chat-Requirements-Token"] = requirement.token;
    }

    // Send the prompt to the ChatGPT API
    const context = await this.getChatContext();
    const payload = JSON.stringify({
      action: "next",
      conversation_mode: {
        kind: "primary_assistant",
      },
      arkose_token: requirement?.arkose?.required
        ? await this.getArkoseToken()
        : undefined,
      messages: [
        {
          id: uuidv4(),
          author: { role: "user" },
          content: {
            content_type: "text",
            parts: [prompt],
          },
          metadata: {},
        },
      ],
      conversation_id: context.conversationId,
      parent_message_id: context.parentMessageId,
      model: this.constructor._model,
      history_and_training_disabled: false, // allow training
    });

    return new Promise((resolve, reject) => {
      try {
        const source = new SSE("https://chatgpt.com/backend-api/conversation", {
          headers: {
            ...headers,
            accept: "text/event-stream",
          },
          payload,
        });

        let preInfo = [];
        source.addEventListener("message", (event) => {
          const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
          if (event.data.trim() === "[DONE]") {
            onUpdateResponse(callbackParam, { done: true });
            source.close();
            resolve();
          } else if (regex.test(event.data)) {
            // Ignore the timestamp
            return;
          } else
            try {
              const data = JSON.parse(event.data);

              // Ignore messages which includes repeated content
              if (data.message?.metadata?.is_complete) return;

              this.setChatContext({
                conversationId: data.conversation_id,
                parentMessageId: data.message_id,
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
              reject(error);
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

        source.addEventListener("readystatechange", (event) => {
          if (event.readyState === source.CLOSED) {
            // after stream closed, done
            onUpdateResponse(callbackParam, {
              done: true,
            });
            resolve();
          }
        });

        source.stream();
      } catch (error) {
        reject(error);
      }
    });
  }
}
