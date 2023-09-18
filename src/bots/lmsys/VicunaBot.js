import LMSYSBot from "./LMSYSBot";

export default class VicunaBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "VicunaBot"; // Class name of the bot
  static _logoFilename = "vicuna-33b-logo.png"; // Place it in public/bots/
  static _model = "vicuna-33b";

  constructor() {
    super();
  }
}
