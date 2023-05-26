// import axios from "axios";
import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT4BotMobile extends ChatGPTBot {
  static _className = "ChatGPT4Bot-mobile"; // Class name of the bot
  static _logoFilename = "chatgpt-4-mobile-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4-mobile";

  constructor() {
    super();
  }
}
