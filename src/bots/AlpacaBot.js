import LMSYSBot from "./LMSYSBot";

export default class AlpacaBot extends LMSYSBot {
  static _brandId = "alpaca"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "AlpacaBot"; // Class name of the bot
  static _logoFilename = "alpaca-logo.png"; // Place it in assets/bots/
  static _model = "alpaca-13b";
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS

  constructor() {
    super();
  }
}
