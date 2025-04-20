import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPIo3Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPIo3Bot"; // Class name of the bot
  static _logoFilename = "openai-o3-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "o3";

  constructor() {
    super();
  }
}
