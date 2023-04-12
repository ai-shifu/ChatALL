import Bot from "./Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function randomIP() {
  return (
    "13." +
    Math.floor(Math.random() * 3 + 105) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255)
  );
}
export default class BingChatBot extends Bot {
  static _id = "BingChatBot"; // ID of the bot, should be unique
  static _name = "bot.BingChat"; // String of the bot's name, should be unique
  static _logoFilename = "bing-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://www.bing.com/new";

  constructor() {
    super();
  }

  async checkLoginStatus() {
    // Bing Chat does not have a login status API
    // So we just check if we can create a conversation

    const headers = {
      "x-ms-client-request-id": uuidv4(),
      "x-ms-useragent":
        "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32",
      "x-forwarded-for": randomIP(),
    };
    try {
      const response = await axios.get(
        "https://www.bing.com/turing/conversation/create",
        { headers }
      );
      if (response.data && response.data.result.value == "Success") {
        this.constructor._isLoggedIn = true;
      } else {
        console.error("Error checking Bing Chat login status:", response);
        this.constructor._isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error checking Bing Chat login status:", error);
      this.constructor._isLoggedIn = false;
    }
  }

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "你好，这是必应。妈妈和爸爸可以结婚，如果他们相爱并且没有其他的配偶。😊"
      );
    });
  }
}
