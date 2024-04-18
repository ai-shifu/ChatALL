import GroqAPIBot from "./GroqAPIBot";

export default class Gemma7bGroqAPIBot extends GroqAPIBot {
  static _className = "Gemma7bGroqAPIBot";
  static _logoFilename = "gemma-7b-it-groq-logo.png";
  static _model = "gemma-7b-it";
  constructor() {
    super();
  }
}
