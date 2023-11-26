import LMSYSBot from "./LMSYSBot";

export default class ChatGLM36bBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ChatGLM36bBot"; // Class name of the bot
  static _logoFilename = "chatglm3-logo.png"; // Place it in public/bots/
  static _model = "chatglm3-6b";

  constructor() {
    super();
  }
}
