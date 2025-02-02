import GroqAPIBot from "./GroqAPIBot";

export default class Llama3290bGroqAPIBot extends GroqAPIBot {
  static _className = "Llama3290bGroqAPIBot";
  static _logoFilename = "llama-3.2-90b-groq-logo.svg";
  static _model = "llama-3.2-90b-vision-preview";
  constructor() {
    super();
  }
}
