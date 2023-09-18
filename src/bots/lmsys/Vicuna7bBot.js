import LMSYSBot from "./LMSYSBot";

export default class Vicuna7bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Vicuna7bBot"; // Class name of the bot
  static _logoFilename = "vicuna-7b-logo.png"; // Place it in public/bots/
  static _model = "vicuna-7b";

  constructor() {
    super();
  }
}
