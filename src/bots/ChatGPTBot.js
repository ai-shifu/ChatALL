import Bot from "./Bot";
import axios from "axios";

export default class ChatGPTBot extends Bot {
  static _id = "ChatGPTBot"; // ID of the bot, should be unique
  static _name = "bot.ChatGPT"; // String of the bot's name, should be unique
  static _logoFilename = "chatgpt-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://chat.openai.com/";

  constructor() {
    super();
  }

  async checkLoginStatus() {
    try {
      const response = await axios.get(
        "https://chat.openai.com/api/auth/session"
      );
      if (response.data && response.data.accessToken) {
        this.accessToken = response.data.accessToken;
        this.constructor._isLoggedIn = true;
      } else {
        this.constructor._isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      this.constructor._isLoggedIn = false;
    }
  }

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "当然可以，妈妈和爸爸通常是在相爱并决定共度一生后结婚的。在许多文化中，婚姻是一种公认的、合法的制度，用以确认两人之间的关系、权利和义务。结婚有助于为夫妻之间建立家庭提供稳定的基础，并为子女的成长提供良好的环境。当然，每个人的婚姻观念和选择可能因文化、信仰和个人经历的不同而有所差异。"
      );
    });
  }
}
