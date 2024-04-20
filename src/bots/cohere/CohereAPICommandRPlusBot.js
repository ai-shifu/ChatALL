import CohereAPIBot from "./CohereAPIBot";

export default class CohereAPICommandRPlusBot extends CohereAPIBot {
  static _className = "CohereAPICommandRPlusBot";
  static _logoFilename = "cohere-logo.png";
  static _model = "command-r-plus";
  constructor() {
    super();
  }
}
