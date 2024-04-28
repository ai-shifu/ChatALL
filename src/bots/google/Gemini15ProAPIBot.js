import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini15ProAPIBot extends GeminiAPIBot {
  static _className = "Gemini15ProAPIBot";
  static _logoFilename = "gemini-1.5-logo.png"; // Place it in public/bots/
  static _model = "gemini-1.5-pro-latest";

  constructor() {
    super();
  }
}
