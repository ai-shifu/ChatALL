import ChatGPT4Bot from "./ChatGPT4Bot";

export default class ChatGPT4MobileBot extends ChatGPT4Bot {
  static _className = "ChatGPT4MobileBot"; // Class name of the bot
  static _logoFilename = "chatgpt-4-mobile-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4-mobile";

  constructor() {
    super();
  }
}
