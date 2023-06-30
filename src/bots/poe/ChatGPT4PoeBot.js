import PoeBot from "@/bots/poe/PoeBot";

export default class ChatGPT4PoeBot extends PoeBot {
  static _className = "ChatGPT4PoeBot"; // Class name of the bot
  static _logoFilename = "chatgpt-4-poe-logo.png"; // Place it in public/bots/
  static _model = "beaver";

  constructor() {
    super();
  }
}
