import LMSYSBot from "./LMSYSBot";

export default class ClaudeBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ClaudeBot"; // Class name of the bot
  static _logoFilename = "claude-logo.png"; // Place it in public/bots/
  static _model = "claude-1";

  constructor() {
    super();
  }
}
