import xAIAPIBot from "./xAIAPIBot";

export default class Grok2APIBot extends xAIAPIBot {
  static _className = "Grok2APIBot";
  static _logoFilename = "grok-2-logo.png";
  static _model = "grok-2-latest";
  constructor() {
    super();
  }
}
