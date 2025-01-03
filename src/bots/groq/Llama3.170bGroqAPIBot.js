import GroqAPIBot from "./GroqAPIBot";

export default class Llama318bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama318bGroqAPIBot";
  static _logoFilename = "llama-3.1-8b-groq-logo.svg";
  static _model = "llama-3.1-8b-instant";
  constructor() {
    super();
  }
}
