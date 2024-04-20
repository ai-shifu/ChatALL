import CohereAPIBot from "./CohereAPIBot";

export default class CohereAPICommandBot extends CohereAPIBot {
  static _className = "CohereAPICommandBot";
  static _logoFilename = "cohere-logo.png";
  static _model = "command";
  constructor() {
    super();
  }
}
