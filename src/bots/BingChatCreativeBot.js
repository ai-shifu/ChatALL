import BingChatPreciseBot from "./BingChatPreciseBot";

export default class BingChatCreativeBot extends BingChatPreciseBot {
  static _logoFilename = "bing-creative-logo.png"; // Place it in assets/bots/
  static _model = "h3imaginative"; // Bing styles: h3imaginative, harmonyv3, h3precise

  constructor() {
    super();
  }
}
