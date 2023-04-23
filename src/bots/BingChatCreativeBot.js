import BingChatBot from "./BingChatBot";

export default class BingChatCreativeBot extends BingChatBot {
  static _logoFilename = "bing-creative-logo.png"; // Place it in assets/bots/
  static _model = "h3imaginative"; // Bing styles: h3imaginative, harmonyv3, h3precise

  constructor() {
    super();
  }
}
