import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";

export default class FalconHC180bBot extends HuggingChatBot {
  static _className = "FalconHC180bBot"; // Class name of the bot
  static _logoFilename = "falcon-180b-hc-logo.png"; // Place it in public/bots/
  static _model = "tiiuae/falcon-180B-chat";

  constructor() {
    super();
  }
}
