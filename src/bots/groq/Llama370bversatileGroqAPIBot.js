import GroqAPIBot from "./GroqAPIBot";

export default class Llama370bversatileGroqAPIBot extends GroqAPIBot {
  static _className = "Llama370bversatileGroqAPIBot";
  static _logoFilename = "llama-3-70b-versatile-groq-logo.svg";
  static _model = "llama-3.3-70b-versatile";
  constructor() {
    super();
  }
}
