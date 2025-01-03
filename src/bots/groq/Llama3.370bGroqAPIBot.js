import GroqAPIBot from "./GroqAPIBot";

export default class Llama3370bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama3370bGroqAPIBot";
  static _logoFilename = "llama-3.3-70b-groq-logo.png";
  static _model = "llama-3.3-70b-versatile";
  constructor() {
    super();
  }
}
