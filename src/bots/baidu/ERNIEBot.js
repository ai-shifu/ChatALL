import Bot from "@/bots/Bot";
import axios from "axios";

export default class ERNIEBot extends Bot {
  static _brandId = "ernie"; // ID of the bot, should be unique
  static _className = "ERNIEBot"; // Class name of the bot
  static _logoFilename = "ernie-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://yiyan.baidu.com/";

  constructor() {
    super();
  }

  async checkAvailability() {
    try {
      const res = await axios.get("https://yiyan.baidu.com/eb/user/info");
      if (res.data.content.isLogin) {
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

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return super.sendPrompt(prompt, onUpdateResponse, callbackParam);
  }
}
