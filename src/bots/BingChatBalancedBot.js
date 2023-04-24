import AsyncLock from "async-lock";

import BingChatBot from "./BingChatBot";

export default class BingChatBalancedBot extends BingChatBot {
  static _logoFilename = "bing-balanced-logo.png"; // Place it in assets/bots/
  static _model = "harmonyv3"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _lock = new AsyncLock(); // Must process requests in queue

  constructor() {
    super();
  }
}
