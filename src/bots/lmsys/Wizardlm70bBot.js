import LMSYSBot from "./LMSYSBot";

export default class Wizardlm70bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Wizardlm70bBot"; // Class name of the bot
  static _logoFilename = "wizardlm-70b-logo.png"; // Place it in public/bots/
  static _model = "wizardlm-70b";

  constructor() {
    super();
  }
}
