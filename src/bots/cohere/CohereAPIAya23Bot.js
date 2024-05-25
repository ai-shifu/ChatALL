import CohereAPIBot from "./CohereAPIBot";

export default class CohereAPIAya23Bot extends CohereAPIBot {
  static _className = "CohereAPIAya23Bot";
  static _logoFilename = "cohere-logo.png";
  static _model = "c4ai-aya-23";
  constructor() {
    super();
  }
}
