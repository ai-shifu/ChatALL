import Bot from "@/bots/Bot";
import axios from "axios";
// import i18n from "@/i18n";

export default class ERNIEBot extends Bot {
  static _brandId = "ernie"; // ID of the bot, should be unique
  static _className = "ERNIEBot"; // Class name of the bot
  static _logoFilename = "ernie-bot-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true;
  static _loginUrl = "https://yiyan.baidu.com/";

  constructor() {
    super();
  }

  async checkAvailability() {
    try {
      const res = await axios.get("https://yiyan.baidu.com/eb/user/info");
      if (res.data.content.isLogin) {
        this.user = res.data.content.uname;
        await this.get_sessionId()
          .then(this.get_history)
          .then(({ data }) => {
            this.currentChatId = data.data.currentChatId;
          });
        this.constructor._isAvailable = true;
      } else {
        this.constructor._isAvailable = false;
      }
    } catch (err) {
      console.log(err);
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async get_sessionId() {
    if (this.sessionId) {
      return this.sessionId;
    }
    const that = this;
    const body = {
      pageSize: 1000,
      timestamp: new Date().getTime(),
      deviceType: "pc",
    };
    return axios
      .post("https://yiyan.baidu.com/eb/session/list", body, {
        headers: {
          Accept: "*/*",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
          "Content-Type": "application/json",
        },
        referrer: "https://yiyan.baidu.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        data: JSON.stringify(body),
      })
      .then(({ data }) => {
        that.sessionId = data.data.sessions[0].sessionId;
        that.sessionName = data.data.sessions[0].sessionName;
        return that.sessionId;
      });
  }
  get_history(sessionId) {
    const time = new Date().getTime();
    const body = {
      sessionId,
      pageSize: 2000,
      timestamp: time,
      deviceType: "pc",
    };
    return axios.post("https://yiyan.baidu.com/eb/chat/history", body, {
      headers: {
        Accept: "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "Content-Type": "application/json",
      },
      referrer: "https://yiyan.baidu.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      data: JSON.stringify(body),
    });
  }
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // const chat_id = await this.getChatContext();
    let interval;
    return new Promise((resolve, reject) => {
      try {
        // if (chat_id === 0) {
        //   reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
        // }
        this.sendConversation(prompt).then(() => {
          interval = setInterval(() => {
            this.get_history(this.sessionId).then(({ data }) => {
              const answer = Object.values(data.data.chats)
                .filter((d) => d.role == "robot" && d.message[0].content)
                .sort((a, b) => (b.createTime > a.createTime ? 1 : -1))[0];
              const content = answer?.message[0].content;
              if (content) {
                const done = content !== "正在生成中...";
                // resolve({ content, done: done })
                onUpdateResponse(callbackParam, { content, done });
                if (done) {
                  clearInterval(interval);
                }
              }
            });
          }, 3000);
        });
      } catch (err) {
        const message = this.getSSEDisplayError(err);
        reject(message);
      }
    });
  }
  sendConversation(prompt) {
    const body = {
      text: prompt,
      sessionId: this.sessionId,
      sessionName: this.sessionName || prompt,
      parentChatId: this.currentChatId,
      type: 10,
      pluginInfo: [],
      plugins: [],
      timestamp: new Date().getTime(),
      deviceType: "pc",
      code: 0,
      msg: "",
    };
    return axios.post("https://yiyan.baidu.com/eb/chat/conversation/v2", body, {
      headers: {
        Accept: "text/event-stream,application/json, text/event-stream",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "Content-Type": "application/json",
      },
      referrer: "https://yiyan.baidu.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      data: JSON.stringify(body),
    });
  }
}
