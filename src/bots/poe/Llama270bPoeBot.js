import PoeBot from "@/bots/poe/PoeBot";

export default class Llama270bPoeBot extends PoeBot {
  static _className = "Llama270bPoeBot"; // Class name of the bot
  static _logoFilename = "llama-2-70b-logo.png"; // Place it in public/bots/
  static _model = "llama_2_70b_chat";

  constructor() {
    super();
  }
}
