import LMSYSBot from "./LMSYSBot";

export default class Llama213bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Llama213bBot"; // Class name of the bot
  static _logoFilename = "llama-2-13b-logo.png"; // Place it in public/bots/
  static _model = "llama-2-13b-chat";

  constructor() {
    super();
  }
}
