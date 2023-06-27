import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI3516KBot extends OpenAIAPIBot {
  static _className = "OpenAIAPI3516KBot"; // Class name of the bot
  static _logoFilename = "openai-35-16k-logo.png"; // Place it in public/bots/
  static _model = "gpt-3.5-turbo-16k";

  constructor() {
    super();
  }
}
