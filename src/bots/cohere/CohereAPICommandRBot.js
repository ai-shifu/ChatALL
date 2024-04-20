import CohereAPIBot from "./CohereAPIBot";

export default class CohereAPICommandRBot extends CohereAPIBot {
  static _className = "CohereAPICommandRBot";
  static _logoFilename = "cohere-logo.png";
  static _model = "command-r";
  constructor() {
    super();
  }
}
