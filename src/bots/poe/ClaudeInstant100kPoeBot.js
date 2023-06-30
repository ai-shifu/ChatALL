import PoeBot from "@/bots/poe/PoeBot";

export default class ClaudeInstant100kPoeBot extends PoeBot {
  static _className = "ClaudeInstant100kPoeBot"; // Class name of the bot
  static _logoFilename = "claude-100k-poe-logo.png"; // Place it in public/bots/
  static _model = "a2_100k";

  constructor() {
    super();
  }
}
