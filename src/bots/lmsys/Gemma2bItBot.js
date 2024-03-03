import LMSYSBot from "./LMSYSBot";

export default class Gemma2bItBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Gemma2bItBot"; // Class name of the bot
  static _logoFilename = "gemma-2b-it-logo.png"; // Place it in public/bots/
  static _model = "gemma-2b-it";

  constructor() {
    super();
  }
}
