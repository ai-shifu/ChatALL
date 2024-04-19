import GroqAPIBot from "./GroqAPIBot";

export default class Llama370bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama370bGroqAPIBot";
  static _logoFilename = "llama-3-70b-groq-logo.png";
  static _model = "llama3-70b-8192";
  constructor() {
    super();
  }
}
