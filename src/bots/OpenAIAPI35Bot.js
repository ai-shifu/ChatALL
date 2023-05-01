import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI35Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPI35Bot"; // Class name of the bot
  static _logoFilename = "openai-35-logo.png"; // Place it in assets/bots/
  static _model = "gpt-3.5-turbo";

  constructor() {
    super();
  }
}
