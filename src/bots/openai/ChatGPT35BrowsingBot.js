import ChatGPT4Bot from "./ChatGPT4Bot";

export default class ChatGPT35BrowsingBot extends ChatGPT4Bot {
  static _className = "ChatGPT35BrowsingBot"; // Class name of the bot
  static _logoFilename = "chatgpt-browsing-logo.png"; // Place it in public/bots/
  static _model = "gpt-35-turbo";

  constructor() {
    super();
    this.is_gpt4=false
  }
}
