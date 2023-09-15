import AsyncLock from "async-lock";
import Bot from "@/bots/Bot";
import axios from "axios";
// import store from "@/store";
import { SSE } from "sse.js";

export default class ChatGLMBot extends Bot {
  static _brandId = "chatGLM"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ChatGLMBot"; // Class name of the bot
  static _logoFilename = "chatglm-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://chatglm.cn/detail";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests
  // Remove Electron from the user agent to avoid blank login screen
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) chatall/1.29.40 Chrome/114.0.5735.134 Safari/537.36";
  _glmLogin = "https://chatglm.cn/chatglm/backend-api/v1/user/login";
  _glmLogout = "https://chatglm.cn/chatglm/backend-api/v1/user/logout";
  _glmRefreshToken = "https://chatglm.cn/chatglm/backend-api/v1/user/refresh";
  _glmChat =
    "https://chatglm.cn/chatglm/backend-api/v1/stream?App-Name=chatglm&context_id=dc68ac01-899a-4ef2-a8dd-ba1093cd8be7&institution=";

  //https://chatglm.cn/chatglm/backend-api/v3/user/info -POST
  //https://chatglm.cn/chatglm/backend-api/v1/user/refresh -POST
  // https://chatglm.cn/chatglm/backend-api/v1/user/login -POST
  // GET https://chatglm.cn/chatglm/backend-api/v1/stream?App-Name=chatglm&context_id=dc68ac01-899a-4ef2-a8dd-ba1093cd8be7&institution=  -GET
  constructor() {
    super();
  }

  getAuthHeader() {
    // const token = store.state.chaglm?.token?.refresh;
    return {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NDcwMDM0OCwianRpIjoiZjZmNzg2MzgtN2MyNi00YTBkLWEzMWQtMzgyMmZjNjE4YTk0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY4NTZlZjY0OGUwYTRiNDE5MDFkYzZmYWEwNjQ2YzY4IiwibmJmIjoxNjk0NzAwMzQ4LCJleHAiOjE2OTQ3ODY3NDgsInJvbGVzIjpbInVuYXV0aGVkX3VzZXIiXX0._XHshuWeCy79LOnUpZf0wRGzLpVx1KVEB7lo-15Agd4`,
      },
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    let _glmUserInfo = "https://chatglm.cn/chatglm/backend-api/v3/user/info";
    await axios
      .get(_glmUserInfo, this.getAuthHeader())
      .then((response) => {
        console.log("---chatglm---statusCheck---: ", response.data);
        available = response.data?.message == "success";
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
    const context = await this.getChatContext();

    const streamContext = await axios.post(
      "https://chatglm.cn/chatglm/backend-api/v1/stream_context?__requestid=c05cbed6-2d3e-468b-918b-a7edc4733fc3 ",
      // { chat_id: context.id, content: prompt, parent_id: context.parent_id },
      {
        prompt: prompt,
        seed: 80241,
        max_tokens: 512,
        conversation_task_id: "6503fc00273ae95a2c2f23d8", //context.id
        retry: false,
        retry_history_task_id: null,
        institution: "",
        __userid: "64efe1720d6374d0a8041748",
      },
      this.getAuthHeader(),
    );

    if (streamContext.status !== 200) {
      throw new Error(streamContext);
    }
    this.setChatContext({
      ...context,
      parent_id: "AAAAAAA", // save assistant response id for next prompt parent_id
    });

    const context_id = streamContext.data.result.context_id;
    console.log("----streamContext----", streamContext);
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          `https://chatglm.cn/chatglm/backend-api/v1/stream?App-Name=chatglm&context_id=${context_id}&institution=`,
          this.getAuthHeader(),
        );
        let text = "";
        source.addEventListener("add", (event) => {
          try {
            // handle event data: ": ping - 2023-07-14 13:28:17.735145"
            console.log("---add---event---- ", event.data);
            text = event.data;
            onUpdateResponse(callbackParam, { content: text, done: false });
          } catch {
            console.error("Error ChatGLM JSON.parse message:", event.data);
            return;
          }
        });
        source.addEventListener("finish", (event) => {
          console.log("---add---finish---- ", event);
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
    return null;
  }
}
