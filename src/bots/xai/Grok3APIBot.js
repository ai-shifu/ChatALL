import xAIAPIBot from "./xAIAPIBot";

export default class Grok3APIBot extends xAIAPIBot {
  static _className = "Grok3APIBot";
  static _logoFilename = "grok-3-logo.png";
  static _model = "grok-3-beta";
  constructor() {
    super();
  }
}
