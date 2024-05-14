import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini15FlashAPIBot extends GeminiAPIBot {
  static _className = "Gemini15FlashAPIBot";
  static _logoFilename = "gemini-1.5-flash-logo.png";
  static _model = "gemini-1.5-flash-latest";

  constructor() {
    super();
  }
}
