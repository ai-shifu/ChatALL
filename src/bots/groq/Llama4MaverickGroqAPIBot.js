import GroqAPIBot from "./GroqAPIBot";

export default class Llama4MaverickGroqAPIBot extends GroqAPIBot {
  static _className = "Llama4MaverickGroqAPIBot";
  static _logoFilename = "llama-4-maverick-groq-logo.png";
  static _model = "meta-llama/llama-4-maverick-17b-128e-instruct";
  constructor() {
    super();
  }
}
