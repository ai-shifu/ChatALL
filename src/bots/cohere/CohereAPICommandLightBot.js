import CohereAPIBot from "./CohereAPIBot";

export default class CohereAPICommandLightBot extends CohereAPIBot {
  static _className = "CohereAPICommandLightBot";
  static _logoFilename = "cohere-logo.png";
  static _model = "command-light";
  constructor() {
    super();
  }
}
