import GroqAPIBot from "./GroqAPIBot";

export default class Mistral24bGroqAPIBot extends GroqAPIBot {
  static _className = "Mistral24bGroqAPIBot";
  static _logoFilename = "mistral-saba-24b-groq-logo.svg";
  static _model = "mistral-saba-24b";
  constructor() {
    super();
  }
}
