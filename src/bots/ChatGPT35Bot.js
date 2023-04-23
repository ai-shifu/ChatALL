import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT35Bot extends ChatGPTBot {
  static _logoFilename = "chatgpt-35-logo.svg"; // Place it in assets/bots/
  static _model = "text-davinci-002-render-sha";

  constructor() {
    super();
  }
}
