import GroqAPIBot from "./GroqAPIBot";

export default class Llama38bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama38bGroqAPIBot";
  static _logoFilename = "llama-3-8b-groq-logo.png";
  static _model = "llama3-8b-8192";
  constructor() {
    super();
  }
}
