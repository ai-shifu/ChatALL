import xAIAPIBot from "./xAIAPIBot";

export default class GrokAPIBot extends xAIAPIBot {
  static _className = "GrokAPIBot";
  static _logoFilename = "grok-logo.svg";
  static _model = "grok-beta";
  constructor() {
    super();
  }
}
