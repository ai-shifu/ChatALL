import GroqAPIBot from "./GroqAPIBot";

export default class Llama4ScoutGroqAPIBot extends GroqAPIBot {
  static _className = "Llama4ScoutGroqAPIBot";
  static _logoFilename = "llama-4-scout-groq-logo.png";
  static _model = "meta-llama/llama-4-scout-17b-16e-instruct";
  constructor() {
    super();
  }
}
