import LMSYSBot from "./LMSYSBot";

export default class Wizardlm13bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Wizardlm13bBot"; // Class name of the bot
  static _logoFilename = "wizardlm-13b-logo.png"; // Place it in public/bots/
  static _model = "wizardlm-13b";

  constructor() {
    super();
  }
}
