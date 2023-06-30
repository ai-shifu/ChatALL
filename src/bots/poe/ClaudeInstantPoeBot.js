import PoeBot from "@/bots/poe/PoeBot";

export default class ClaudeInstantPoeBot extends PoeBot {
  static _className = "ClaudeInstantPoeBot"; // Class name of the bot
  static _logoFilename = "claude-instant-poe-logo.png"; // Place it in public/bots/
  static _model = "a2";

  constructor() {
    super();
  }
}
