import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI41Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPI41Bot"; // Class name of the bot
  static _logoFilename = "openai-41-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "gpt-4.1";

  constructor() {
    super();
  }
}
