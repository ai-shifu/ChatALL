import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";

export default class Zephyr7bBot extends HuggingChatBot {
  static _className = "Zephyr7bBot"; // Class name of the bot
  static _logoFilename = "zephyr-7b-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://huggingfaceh4-zephyr-chat.hf.space/";
  static _model = "HuggingFaceH4/zephyr-7b-beta";

  constructor() {
    super();
  }

  getFullname() {
    return "Zephyr-7B-β";
  }
}
