import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini25ProPreviewBot extends GeminiAPIBot {
  static _className = "Gemini25ProPreviewBot";
  static _logoFilename = "gemini-2.5-pro-logo.png";
  static _model = "gemini-2.5-pro-preview-06-05";

  constructor() {
    super();
  }
}
