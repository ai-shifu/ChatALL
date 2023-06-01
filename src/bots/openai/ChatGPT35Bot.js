import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT35Bot extends ChatGPTBot {
  static _className = "ChatGPT35Bot"; // Class name of the bot
  static _logoFilename = "chatgpt-35-logo.png"; // Place it in assets/bots/
  static _model = "text-davinci-002-render-sha";

  constructor() {
    super();
  }
}
