import ChatGPT4Bot from "./ChatGPT4Bot";

export default class ChatGPTBrowsingBot extends ChatGPT4Bot {
  static _className = "ChatGPTBrowsingBot"; // Class name of the bot
  static _logoFilename = "chatgpt-browsing-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4-browsing";

  constructor() {
    super();
  }
}
