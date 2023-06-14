import AsyncLock from "async-lock";
import axios from "axios";

import Bot from "@/bots/Bot";
import store from "@/store";

export default class SkyWorkBot extends Bot {
  static _brandId = "skyWork"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "SkyWorkBot"; // Class name of the bot
  static _logoFilename = "skywork-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://neice.tiangong.cn/";
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
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    await axios
      .post(
        "https://neice.tiangong.cn/api/v1/user/inviteVerify",
        { data: {} },
        this.getAuthHeaders(),
      )
      .then((res) => {
        if (res.data.code === 200) {
          this.constructor._isAvailable = true;
        } else if (res.data.code === 60101) {
          // Invite token expired, request a new one
          axios
            .post(
              "https://neice.tiangong.cn/api/v1/queue/waitAccess",
              { data: { token: "" } },
              this.getAuthHeaders(),
            )
            .then((res) => {
              if (res.data.code === 200) {
                store.commit("setSkyWork", {
                  inviteToken: res.data.resp_data.invite_token,
                });
                this.constructor._isAvailable = true;
              } else {
                this.constructor._isAvailable = false;
              }
            });
        } else {
          console.error("SkyWork login error:", res.data);
          this.constructor._isAvailable = false;
        }
      })
      .catch((err) => {
        console.error(err);
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
                "https://neice.tiangong.cn/api/v1/chat/chat",
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
          let done = false;
          do {
            // wait 1s
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await axios
              .post(
                "https://neice.tiangong.cn/api/v1/chat/getMessage",
                { data: { message_id: messageId } },
                this.getAuthHeaders(),
              )
              .then((res) => {
                const data = res.data;
                if (data.code !== 200) {
                  console.error(data);
                  reject(new Error(`${data.code} ${data.code_msg}`));
                }
                done = data.resp_data?.result_message?.status == 3;
                const content = data.resp_data?.result_message?.content;
                if (content) {
                  onUpdateResponse(callbackParam, { content, done });
                }
              });
          } while (!done);

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
        "https://neice.tiangong.cn/api/v1/session/newSession",
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
