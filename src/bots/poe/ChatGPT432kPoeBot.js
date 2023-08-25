import PoeBot from "@/bots/poe/PoeBot";

export default class ChatGPT432kPoeBot extends PoeBot {
  static _className = "ChatGPT432kPoeBot"; // Class name of the bot
  static _logoFilename = "gpt-4-32k-poe-logo.png"; // Place it in public/bots/
  static _model = "vizcacha";

  constructor() {
    super();
  }
}
