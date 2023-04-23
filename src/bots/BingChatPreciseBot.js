import BingChatBot from "./BingChatBot";

export default class BingChatPreciseBot extends BingChatBot {
  static _logoFilename = "bing-precise-logo.png"; // Place it in assets/bots/
  static _model = "h3precise"; // Bing styles: h3imaginative, harmonyv3, h3precise

  constructor() {
    super();
  }
}
