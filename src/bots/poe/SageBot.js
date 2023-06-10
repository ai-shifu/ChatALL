import PoeBot from "@/bots/poe/PoeBot";
import AsyncLock from "async-lock";

export default class SageBot extends PoeBot {
  static _className = "SageBot"; // Class name of the bot
  static _logoFilename = "sage-logo.png"; // Place it in public/bots/
  static _model = "capybara";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
