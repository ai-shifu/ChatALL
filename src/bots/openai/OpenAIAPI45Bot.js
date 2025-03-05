import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI45Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPI45Bot"; // Class name of the bot
  static _logoFilename = "openai-45-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "gpt-4.5-preview";

  constructor() {
    super();
  }
}
