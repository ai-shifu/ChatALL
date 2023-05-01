import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT4Bot extends ChatGPTBot {
  static _className = "ChatGPT4Bot"; // Class name of the bot
  static _logoFilename = "chatgpt-4-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4";

  constructor() {
    super();
  }
}
