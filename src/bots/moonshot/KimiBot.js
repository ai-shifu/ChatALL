import AsyncLock from "async-lock";
import Bot from "@/bots/Bot";
import axios from "axios";
import store from "@/store";
import { SSE } from "sse.js";
import i18n from "@/i18n";

export default class KimiBot extends Bot {
  static _brandId = "kimi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "KimiBot"; // Class name of the bot
  static _logoFilename = "kimi-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://kimi.moonshot.cn/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${store.state.kimi?.access_token}`,
      },
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    let userInfoUrl = "https://kimi.moonshot.cn/api/user";
    await axios
      .get(userInfoUrl, this.getAuthHeader())
      .then((response) => {
        available = response.data?.status == "normal";
      })
      .catch(async (error) => {
        if (
          error.response?.status == 401 &&
          error.response?.data?.error_type == "auth.token.invalid"
        ) {
          await this.refreshTokens();
          available = await this._checkAvailability();
        } else {
          console.error("Error checking Kimi login status:", error);
        }
      });

    return available;
  }

  async refreshTokens() {
    let refreshUrl = "https://kimi.moonshot.cn/api/auth/token/refresh";
    await axios
      .get(refreshUrl, {
        headers: {
          Authorization: `Bearer ${store.state.kimi?.refresh_token}`,
        },
      })
      .then((response) => {
        store.commit("setKimi", {
          access_token: response.data?.access_token,
          refresh_token: response.data?.refresh_token,
        });
      })
      .catch((error) => {
        console.error("Error refreshing Kimi tokens:", error);
      });
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let context = await this.getChatContext();

    return new Promise((resolve, reject) => {
      const headers = this.getAuthHeader().headers;
      headers["Content-Type"] = "application/json";
      try {
        const source = new SSE(
          `https://kimi.moonshot.cn/api/chat/${context.chat}/completion/stream`,
          {
            headers,
            payload: JSON.stringify({
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              refs: [],
              use_search: true,
            }),
            withCredentials: true,
          },
        );

        let beginning = "";
        let body = "";
        source.addEventListener("message", (event) => {
          const data = JSON.parse(event.data);

          if (data.event === "search_plus") {
            if (data.msg?.type == "start_res")
              beginning += `> ${i18n.global.t("kimi.searching")}\n`;
            else if (data.msg?.type === "get_res")
              beginning += `> ${i18n.global.t("kimi.found", { num: data.msg.successNum })}[${data.msg.title}](${data.msg.url})\n`;
          } else if (data.event === "cmpl") {
            body += data.text;
          }

          if (data.event === "all_done") {
            onUpdateResponse(callbackParam, {
              content: `${beginning}\n${body}`,
              done: true,
            });
            resolve();
          } else {
            onUpdateResponse(callbackParam, {
              content: `${beginning}\n${body}`,
              done: false,
            });
          }
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
    await axios
      .post(
        "https://kimi.moonshot.cn/api/chat",
        {
          is_example: false,
          name: "ChatALL",
        },
        this.getAuthHeader(),
      )
      .then((response) => {
        context = {
          chat: response.data?.id,
        };
      })
      .catch((error) => {
        console.error("Error Kimi createChatContext ", error);
      });
    return context;
  }
}
