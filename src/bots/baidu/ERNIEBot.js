// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-debugger */
// // eslint-disable-file
import Bot from "@/bots/Bot";
import axios from "axios";
// import i18n from "@/i18n";

export default class ERNIEBot extends Bot {
  static _brandId = "ernie"; // ID of the bot, should be unique
  static _className = "ERNIEBot"; // Class name of the bot
  static _logoFilename = "ernie-logo.png"; // Place it in public/bots/
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
          .then((data) => {
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
    return fetch("https://yiyan.baidu.com/eb/session/list", {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://yiyan.baidu.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        that.sessionId = data.data.sessions[0].sessionId;
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
    return fetch("https://yiyan.baidu.com/eb/chat/history", {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://yiyan.baidu.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }).then((res) => res.json());
  }
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // const chat_id = await this.getChatContext();
    let interval;
    new Promise((resolve, reject) => {
      (async () => {
        try {
          // if (chat_id === 0) {
          //   reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
          // }
          this.sendConversation(prompt).then(() => {
            interval = setInterval(() => {
              this.get_history(this.sessionId).then((data) => {
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
      })();
    });
  }
  sendConversation(prompt) {
    const body = {
      text: prompt,
      sessionId: this.sessionId,
      sessionName: prompt,
      parentChatId: this.currentChatId,
      type: 10,
      pluginInfo: [],
      plugins: [],
      timestamp: new Date().getTime(),
      deviceType: "pc",
      code: 0,
      msg: "",
      jt: "31$eyJrIj4iNiI0Iix5IkciQEZKQkpESEdNTU1STiJJIkFqIjwiNTs/Nz85PTxCQkJHQyI+IjYzIlEiSlBUTFROUjE3Njs6PCIzIit5IkYiQz9AQSI/IjkiUSJMSE9KVSJLImsiPSJGcFstL182Ui9mYFMqSylnPT5oMio3Smh3L0VnUkMydk5rLDs4O016VT1SX2Y2Xi9YOTVxT2dNQ2Q+cHZsOVleR3JyOG5rTS44YzN3L2JHYW86Nz8pLW9gbXByNmVIVFZRVCktTTJNMj5bc3EpRS5XTmhuXl40Xy9tZkM4OGdcOTBdXz0/LitEU0dIOFkqQlZpYTRAcktgZjdidW53Snk4RkduWWA+XFl2ZmRZa2lhMmJBSk9vK2Y6M2VoaVFMZ3NJcWpuOFw7P1NwQ1MpXVx1ai5vamVocT48a3U1V2xkVjUsSz06Wi9cNVJ6ZmQyWTlNKj1IO1I5REI+VnoyNGVzeVx2bTQyPGRgK3JZWWoxP1lvYDk6RWpjNDxRVVtTUk50blwtWilgU3ZzNHZWYTJcZUtKMm5vY05hUzI5d09ROXJXKkx1eiwvUyxESTVUbGtiRjVwZWJQYGo3ZncxaWRJR1orUnpccXFyUzZ0U3pZaTBjTyxjMlE4PT15OFZ2dGh8OXNZT2NwNC5FQFNbdnlpaCteRzI5cHJzcXF3ZnZPW05SNzNAPmBAUGhkRE58RER8R0tRek5UTC5TVWVmYzZqPTs7aTk9QW1yRUBJQ3hFRHgifQ==",
      sign: "1690682408080_1690703174822_cY33h+RSvsRYMhLlEdxiWjSL5B4HugyuKUniUNCbTQq675K3qJXAFWFC5pFlS0+ULFmgdYJ/QTPkJFxWG+PL8etWeQlhIGQvWQeIv9Mtk/spa9eLFtJTECsWxGllFGBvQXkBjCDhwLyYzbhZNZuPJDJPGF+NIS2nQrwqS38WqaJaqIS9RaoAN8x+5B79/jRUBCs4PvmDKYZQvgDlDfY7XlQHbJIKQG3eunqsXP1Q/v/d0e2Ay3GqbO6Z1TjyS9aQOtX3k1fQ5zzw9a8cP7XRoJo0Ww1OPsg03X7BjzsZNUYqWesitA9Wc9yN3FKOqIZXKijxQGxaySHreRJ8XAHUOvhNx7oEkj8Ntcd7cPrB6Atc33NDqvhRkRXRwPkF6BE5RIZV+6GloGXibyNWIhKcinMDnem2PtaJJR2Oa2WBEI4cqh3uGdm3ACpmTnMUGEfNISi9rHVrbNcySP0kwOafRa0OM/+spWvmFhxX7EEnXfc=",
    };
    return fetch("https://yiyan.baidu.com/eb/chat/conversation/v2", {
      headers: {
        accept: "text/event-stream,application/json, text/event-stream",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "acs-token":
          "1690682408080_1690703174822_cY33h+RSvsRYMhLlEdxiWjSL5B4HugyuKUniUNCbTQq675K3qJXAFWFC5pFlS0+ULFmgdYJ/QTPkJFxWG+PL8etWeQlhIGQvWQeIv9Mtk/spa9eLFtJTECsWxGllFGBvQXkBjCDhwLyYzbhZNZuPJDJPGF+NIS2nQrwqS38WqaJaqIS9RaoAN8x+5B79/jRUBCs4PvmDKYZQvgDlDfY7XlQHbJIKQG3eunqsXP1Q/v/d0e2Ay3GqbO6Z1TjyS9aQOtX3k1fQ5zzw9a8cP7XRoJo0Ww1OPsg03X7BjzsZNUYqWesitA9Wc9yN3FKOqIZXKijxQGxaySHreRJ8XAHUOvhNx7oEkj8Ntcd7cPrB6Atc33NDqvhRkRXRwPkF6BE5RIZV+6GloGXibyNWIhKcinMDnem2PtaJJR2Oa2WBEI4cqh3uGdm3ACpmTnMUGEfNISi9rHVrbNcySP0kwOafRa0OM/+spWvmFhxX7EEnXfc=",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://yiyan.baidu.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  }
}
