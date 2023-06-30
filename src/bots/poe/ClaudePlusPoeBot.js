import PoeBot from "@/bots/poe/PoeBot";

export default class ClaudePlusPoeBot extends PoeBot {
  static _className = "ClaudePlusPoeBot"; // Class name of the bot
  static _logoFilename = "claude-plus-poe-logo.png"; // Place it in public/bots/
  static _model = "a2_2";

  constructor() {
    super();
  }
}
