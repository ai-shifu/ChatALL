import BardBot from "./BardBot";

export default class GeminiAdvBot extends BardBot {
  static _brandId = "bard";
  static _className = "GeminiAdvBot"; // Class name of the bot
  static _model = "gemini-ultra"; // gemini-pro or gemini-ultra
  static _logoFilename = "gemini-chat-adv-logo.svg"; // Place it in public/bots/

  constructor() {
    super();
  }
}
