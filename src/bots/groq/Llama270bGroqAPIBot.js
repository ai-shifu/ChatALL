import GroqAPIBot from "./GroqAPIBot";

export default class Llama270bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama270bGroqAPIBot";
  static _logoFilename = "llama-2-70b-groq-logo.png";
  static _model = "llama2-70b-4096";
  constructor() {
    super();
  }
}
