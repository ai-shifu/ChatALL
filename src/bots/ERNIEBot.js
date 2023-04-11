import Bot from "./Bot";

export default class ERNIEBot extends Bot {
  static _id = "ERNIEBot"; // ID of the bot, should be unique
  static _name = "bot.ERNIE"; // String of the bot's name, should be unique
  static _logoFilename = "ernie-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://yiyan.baidu.com/";

  constructor() {
    super();
  }

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "不能，因为他们是两个独立的个体，并且已经有了孩子。如果他们想要结婚，他们必须先离婚，并且可以结婚的人只有其中一方。这通常是因为他们已经找到了愿意和他们一起生活的人。"
      );
    });
  }
}
