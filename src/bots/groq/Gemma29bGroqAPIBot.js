import GroqAPIBot from "./GroqAPIBot";

export default class Gemma29bGroqAPIBot extends GroqAPIBot {
  static _className = "Gemma29bGroqAPIBot";
  static _logoFilename = "gemma2-9b-it-groq-logo.png";
  static _model = "gemma2-9b-it";
  constructor() {
    super();
  }
}
