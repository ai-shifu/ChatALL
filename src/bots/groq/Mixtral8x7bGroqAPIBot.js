import GroqAPIBot from "./GroqAPIBot";

export default class Mixtral8x7bGroqAPIBot extends GroqAPIBot {
  static _className = "Mixtral8x7bGroqAPIBot";
  static _logoFilename = "mistral-8x7b-groq-logo.png";
  static _model = "mixtral-8x7b-32768";
  constructor() {
    super();
  }
}
