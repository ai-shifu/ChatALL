import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI41MiniBot extends OpenAIAPIBot {
  static _className = "OpenAIAPI41MiniBot"; // Class name of the bot
  static _logoFilename = "openai-41-mini-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "gpt-4.1-mini";

  constructor() {
    super();
  }
}
