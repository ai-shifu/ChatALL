import AsyncLock from "async-lock";
import axios from "axios";

import Bot from "@/bots/Bot";
import store from "@/store";

export default class SkyWorkBot extends Bot {
  static _brandId = "skyWork"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "SkyWorkBot"; // Class name of the bot
  static _logoFilename = "skywork-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _loginUrl = "https://chat.tiangong.cn/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  currentPrompt = ""; // Used by createChatContext() only

  constructor() {
    super();
  }

  getAuthHeaders() {
    return {
      headers: {
        "invite-token": `Bearer ${store.state.skyWork?.inviteToken}`,
        token: `Bearer ${store.state.skyWork?.token}`,
      },
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;

    try {
      const { data } = await axios.post(
        "https://api-chat.tiangong.cn/api/v1/user/inviteVerify",
        { data: {} },
        this.getAuthHeaders(),
      );

      if (data.code === 200) {
        available = true;
      } else if (data.code >= 60100) {
        // Invite token expired, request a new one
        const { data } = await axios.post(
          "https://api-chat.tiangong.cn/api/v1/queue/waitAccess",
          { data: { token: "" } },
          this.getAuthHeaders(),
        );
        if (data.code === 200 && data.resp_data?.busy_now === false) {
          await store.commit("setSkyWork", {
            inviteToken: data.resp_data?.invite_token,
          });
          available = true;
        }
      }
    } catch (err) {
      console.error("SkyWork login error:", err);
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
    await this.checkAvailability();

    this.currentPrompt = prompt;
    const context = await this.getChatContext();

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // If context.currentMessageId is not empty,
          // it means a prompt has been sent through createChatContext()
          let messageId = context.currentMessageId;
          context.currentMessageId = "";
          this.setChatContext(context);
          if (!messageId) {
            await axios
              .post(
                "https://api-chat.tiangong.cn/api/v1/chat/chat",
                { data: { content: prompt, session_id: context.sessionId } },
                this.getAuthHeaders(),
              )
              .then((res) => {
                const data = res.data;
                if (data.code === 200) {
                  messageId = data.resp_data?.result_message?.message_id;
                } else {
                  console.error(data);
                  reject(new Error(`${data.code} ${data.code_msg}`));
                }
              })
              .catch((err) => {
                console.error(err);
                reject(err);
              });
          }

          // Get the response
          if (messageId) {
            let done = false;
            do {
              // wait 1s
              await new Promise((resolve) => setTimeout(resolve, 1000));
              await axios
                .post(
                  "https://api-chat.tiangong.cn/api/v1/chat/getMessage",
                  { data: { message_id: messageId } },
                  this.getAuthHeaders(),
                )
                .then((res) => {
                  const data = res.data;
                  if (data.code !== 200) {
                    console.error(data);
                    reject(new Error(`${data.code} ${data.code_msg}`));
                  }
                  const status = data.resp_data?.result_message?.status;
                  done = status == 3 || status == 6; // 3 - done, 6 - need continue
                  const content = data.resp_data?.result_message?.content;
                  if (content) {
                    onUpdateResponse(callbackParam, { content, done });
                  }
                });
            } while (!done);
          }

          resolve();
        } catch (error) {
          reject(error);
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
    let context = null;
    await axios
      .post(
        "https://api-chat.tiangong.cn/api/v1/session/newSession",
        { data: { content: this.currentPrompt } },
        this.getAuthHeaders(),
      )
      .then((res) => {
        const data = res.data;
        if (data.code === 200) {
          context = {
            sessionId: data.resp_data.session_id,
            currentMessageId: data.resp_data.dialogue?.[1]?.message_id,
          };
        }
      });
    return context;
  }
}
