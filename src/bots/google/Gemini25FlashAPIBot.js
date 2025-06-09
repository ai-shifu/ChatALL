import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini25FlashAPIBot extends GeminiAPIBot {
  static _className = "Gemini25FlashAPIBot";
  static _logoFilename = "gemini-2.5-flash-logo.png";
  static _model = "gemini-2.5-flash-latest";

  constructor() {
    super();
  }
}
