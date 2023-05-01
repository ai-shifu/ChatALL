import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI4Bot extends OpenAIAPIBot {
  static _className = "OpenAIAPI4Bot"; // Class name of the bot
  static _logoFilename = "openai-4-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4";

  constructor() {
    super();
  }
}
