import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT4Bot extends ChatGPTBot {
  static _logoFilename = "chatgpt-logo.svg"; // Place it in assets/bots/
  static _model = "gpt-4";

  constructor() {
    super();
  }
}
