import LMSYSBot from "./LMSYSBot";

export default class ChatGLMBot extends LMSYSBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ChatGLMBot"; // Class name of the bot
  static _logoFilename = "chatglm-logo.svg"; // Place it in assets/bots/
  static _model = "chatglm-6b";

  constructor() {
    super();
  }
}
