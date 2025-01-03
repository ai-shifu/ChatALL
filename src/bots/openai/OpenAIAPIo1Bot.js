import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPIo1Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPIo1Bot"; // Class name of the bot
  static _logoFilename = "openai-o1-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "o1-preview";

  constructor() {
    super();
  }
}
