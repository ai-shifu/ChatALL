import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPIo4MiniBot extends OpenAIAPIBot {
  static _className = "OpenAIAPIo4MiniBot"; // Class name of the bot
  static _logoFilename = "openai-o4-mini-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "o4-mini";

  constructor() {
    super();
  }
}
