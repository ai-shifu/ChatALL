import LMSYSBot from "./LMSYSBot";

export default class CodeLlamaBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "CodeLlamaBot"; // Class name of the bot
  static _logoFilename = "codellama-logo.png"; // Place it in public/bots/
  static _model = "codellama-34b-instruct";

  constructor() {
    super();
  }
}
