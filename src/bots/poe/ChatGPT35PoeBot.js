import PoeBot from "@/bots/poe/PoeBot";

export default class ChatGPT35PoeBot extends PoeBot {
  static _className = "ChatGPT35PoeBot"; // Class name of the bot
  static _logoFilename = "chatgpt-35-poe-logo.png"; // Place it in public/bots/
  static _model = "chinchilla";

  constructor() {
    super();
  }
}
