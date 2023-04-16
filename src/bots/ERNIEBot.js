import Bot from "./Bot";
import axios from "axios";

export default class ERNIEBot extends Bot {
  static _id = "ERNIEBot"; // ID of the bot, should be unique
  static _name = "bot.ERNIE"; // String of the bot's name, should be unique
  static _logoFilename = "ernie-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://yiyan.baidu.com/";

  constructor() {
    super();
  }

  async checkLoginStatus() {
    try {
      const res = await axios.get("https://yiyan.baidu.com/eb/user/info");
      if (res.data.content.isLogin) {
        this.constructor._isLoggedIn = true;
      } else {
        this.constructor._isLoggedIn = false;
      }
    } catch (err) {
      console.log(err);
      this.constructor._isLoggedIn = false;
    }
  }

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return super.sendPrompt(prompt, onUpdateResponse, callbackParam);
  }
}
