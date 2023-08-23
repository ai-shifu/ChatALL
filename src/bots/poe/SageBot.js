import PoeBot from "@/bots/poe/PoeBot";

export default class SageBot extends PoeBot {
  static _className = "SageBot"; // Class name of the bot
  static _logoFilename = "sage-logo.webp"; // Place it in public/bots/
  static _model = "capybara";

  constructor() {
    super();
  }
}
