import PoeBot from "@/bots/poe/PoeBot";
import AsyncLock from "async-lock";

export default class ClaudePlusPoeBot extends PoeBot {
  static _className = "ClaudePlusPoeBot"; // Class name of the bot
  static _logoFilename = "claude-plus-poe-logo.png"; // Place it in public/bots/
  static _model = "a2_2";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
