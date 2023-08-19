import Bot from "@/bots/Bot";
import axios from "axios";

export default class ERNIEBot extends Bot {
  static _brandId = "ernie"; // ID of the bot, should be unique
  static _className = "ERNIEBot"; // Class name of the bot
  static _logoFilename = "ernie-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://yiyan.baidu.com/";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    try {
      const res = await axios.get("https://yiyan.baidu.com/eb/user/info");
      if (res.data.content.isLogin) {
        available = true;
      }
    } catch (err) {
      console.log(err);
    }
    return available;
  }

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return super.sendPrompt(prompt, onUpdateResponse, callbackParam);
  }
}
