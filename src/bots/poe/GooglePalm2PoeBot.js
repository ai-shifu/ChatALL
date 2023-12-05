import PoeBot from "@/bots/poe/PoeBot";

export default class GooglePalm2PoeBot extends PoeBot {
  static _className = "GooglePalm2PoeBot"; // Class name of the bot
  static _logoFilename = "google-palm-2.png"; // Place it in public/bots/
  static _model = "acouchy";

  constructor() {
    super();
  }
}
