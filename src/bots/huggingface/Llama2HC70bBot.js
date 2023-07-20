import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";

export default class Llama2HC70bBot extends HuggingChatBot {
  static _className = "Llama2HC70bBot"; // Class name of the bot
  static _logoFilename = "llama-huggingchat-logo.png"; // Place it in public/bots/
  static _model = "meta-llama/Llama-2-70b-chat-hf";

  constructor() {
    super();
  }
}
