import GroqAPIBot from "./GroqAPIBot";

export default class Llama3170bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama3170bGroqAPIBot";
  static _logoFilename = "llama-3.1-70b-groq-logo.png";
  static _model = "llama-3.1-70b-versatile";
  constructor() {
    super();
  }
}
