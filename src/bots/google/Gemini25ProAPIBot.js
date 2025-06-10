import GeminiAPIBot from "./GeminiAPIBot";

export default class Gemini25ProAPIBot extends GeminiAPIBot {
  static _className = "Gemini25ProAPIBot";
  static _logoFilename = "gemini-2.5-pro-logo.png"; // Place it in public/bots/
  static _model = "gemini-2.5-pro-preview-06-05";

  constructor() {
    super();
  }
}
