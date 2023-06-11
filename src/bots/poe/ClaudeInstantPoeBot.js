import PoeBot from "@/bots/poe/PoeBot";
import AsyncLock from "async-lock";

export default class ClaudeInstantPoeBot extends PoeBot {
  static _className = "ClaudeInstantPoeBot"; // Class name of the bot
  static _logoFilename = "claude-instant-poe-logo.png"; // Place it in public/bots/
  static _model = "a2";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
