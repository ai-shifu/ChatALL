import LMSYSBot from "./LMSYSBot";

export default class Vicuna13bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Vicuna13bBot"; // Class name of the bot
  static _logoFilename = "vicuna-13b-logo.png"; // Place it in public/bots/
  static _model = "vicuna-13b";

  constructor() {
    super();
  }
}
