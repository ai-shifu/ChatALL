import BingChatPreciseBot from "./BingChatPreciseBot";

export default class BingChatBalancedBot extends BingChatPreciseBot {
  static _model = "harmonyv3"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _logoFilename = "bing-balanced-logo.png"; // Place it in assets/bots/

  constructor() {
    super();
  }
}
