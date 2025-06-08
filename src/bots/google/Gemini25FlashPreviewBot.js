import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini25FlashPreviewBot extends GeminiAPIBot {
  static _className = "Gemini25FlashPreviewBot";
  static _logoFilename = "gemini-2.5-flash-logo.png";
  static _model = "gemini-2.5-flash-preview-05-20";

  constructor() {
    super();
  }
}
