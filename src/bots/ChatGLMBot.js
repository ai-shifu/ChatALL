import AsyncLock from "async-lock";
import Bot from "@/bots/Bot";
import axios from "axios";
import store from "@/store";
import { SSE } from "sse.js";
import { v4 as uuidv4 } from "uuid";

export default class ChatGLMBot extends Bot {
  static _brandId = "chatGlm"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ChatGLMBot"; // Class name of the bot
  static _logoFilename = "chatglm-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://chatglm.cn/detail";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${store.state.chatGlm?.token}`,
      },
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    let userInfoUrl = "https://chatglm.cn/chatglm/backend-api/v3/user/info";
    const context = await this.getChatContext();
    await axios
      .get(userInfoUrl, this.getAuthHeader())
      .then((response) => {
        available = response.data?.message == "success";
        this.setChatContext({
          ...context,
          user_id: response.data?.result._id,
        });
      })
      .catch((error) => {
        console.error("Error checking ChatGLM login status:", error);
      });

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
    let context = await this.getChatContext();
    if (context.user_id == null || context.user_id == undefined) {
      await this._checkAvailability();
      context = await this.getChatContext();
    }
    const uuid = uuidv4();
    const streamContext = await axios.post(
      `https://chatglm.cn/chatglm/backend-api/v1/stream_context?__requestid=${uuid}`,
      {
        prompt: prompt,
        seed: Math.floor(Math.random() * 100000),
        max_tokens: 512,
        conversation_task_id: context.conversation_task_id,
        retry: false,
        retry_history_task_id: null,
        institution: "",
        __userid: context.user_id,
      },
      this.getAuthHeader(),
    );

    if (streamContext.status !== 200) {
      throw new Error(streamContext);
    }

    const context_id = streamContext.data.result.context_id;
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          `https://chatglm.cn/chatglm/backend-api/v1/stream?App-Name=chatglm&context_id=${context_id}&institution=`,
          this.getAuthHeader(),
        );
        let text = "";
        source.addEventListener("add", (event) => {
          try {
            text = event.data;
            onUpdateResponse(callbackParam, { content: text, done: false });
          } catch {
            console.error("Error ChatGLM JSON.parse message:", event.data);
            return;
          }
        });
        source.addEventListener("finish", () => {
          // after stream closed, done
          onUpdateResponse(callbackParam, {
            content: text,
            done: true,
          });
          resolve();
        });
        source.addEventListener("sse_error", (event) => {
          console.error(event);
          reject(this.getSSEDisplayError(event));
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
        `https://chatglm.cn/chatglm/backend-api/v1/conversation`,
        {},
        this.getAuthHeader(),
      )
      .then((response) => {
        context = {
          conversation_task_id: response.data?.result.task_id,
        };
      })
      .catch((error) => {
        console.error("Error ChatGLM createChatContext ", error);
      });
    return context;
  }
}
