import LMSYSBot from "./LMSYSBot";

export default class Claude3OpusBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Claude3OpusBot"; // Class name of the bot
  static _logoFilename = "claude-3-opus-logo.png"; // Place it in public/bots/
  static _model = "claude-3-opus-20240229";

  constructor() {
    super();
  }
}
