import PoeBot from "@/bots/poe/PoeBot";
import AsyncLock from "async-lock";

export default class ChatGPT4PoeBot extends PoeBot {
  static _className = "ChatGPT4PoeBot"; // Class name of the bot
  static _logoFilename = "chatgpt-4-poe-logo.png"; // Place it in public/bots/
  static _model = "beaver";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
