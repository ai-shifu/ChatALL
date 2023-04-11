import Bot from "./Bot";

export default class BingChatBot extends Bot {
  static _id = "BingChatBot"; // ID of the bot, should be unique
  static _name = "bot.BingChat"; // String of the bot's name, should be unique
  static _logoFilename = "bing-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://www.bing.com/new";

  constructor() {
    super();
  }

  async checkLoginStatus() {}

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "你好，这是必应。妈妈和爸爸可以结婚，如果他们相爱并且没有其他的配偶。😊"
      );
    });
  }
}
