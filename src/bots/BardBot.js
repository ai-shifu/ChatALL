import Bot from "./Bot";

export default class BardBot extends Bot {
  static _id = "BardBot"; // ID of the bot, should be unique
  static _name = "bot.Bard"; // String of the bot's name, should be unique
  static _logoFilename = "bard-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://bard.google.com/";

  constructor() {
    super();
  }

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "I'm still learning languages, so at the moment I can't help you with this request. So far I've only been trained to understand the languages listed in the Bard Help Center."
      );
    });
  }
}
