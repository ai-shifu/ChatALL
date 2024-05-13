import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI4oBot extends OpenAIAPIBot {
  static _className = "OpenAIAPI4oBot"; // Class name of the bot
  static _logoFilename = "openai-4o-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "gpt-4o";

  constructor() {
    super();
  }
}
