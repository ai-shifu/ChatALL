import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";

export default class CodeLlamaHCBot extends HuggingChatBot {
  static _className = "CodeLlamaHCBot"; // Class name of the bot
  static _logoFilename = "codellama-hc-logo.png"; // Place it in public/bots/
  static _model = "codellama/CodeLlama-34b-Instruct-hf";

  constructor() {
    super();
  }
}
