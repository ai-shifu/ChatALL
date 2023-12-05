import PoeBot from "@/bots/poe/PoeBot";

export default class CodeLlama34bPoeBot extends PoeBot {
  static _className = "CodeLlama34bPoeBot"; // Class name of the bot
  static _logoFilename = "codellama-poe-logo.png"; // Place it in public/bots/
  static _model = "code_llama_34b_instruct";

  constructor() {
    super();
  }
}
