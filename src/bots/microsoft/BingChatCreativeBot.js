import AsyncLock from "async-lock";

import BingChatBot from "./BingChatBot";

export default class BingChatCreativeBot extends BingChatBot {
  static _className = "BingChatCreativeBot"; // Class name of the bot
  static _logoFilename = "bing-creative-logo.png"; // Place it in assets/bots/
  static _model = "h3imaginative"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _lock = new AsyncLock(); // Must process requests in queue

  static _optionsSets = [
    "nlu_direct_response_filter",
    "deepleo",
    "disable_emoji_spoken_text",
    "responsible_ai_policy_235",
    "enablemm",
    "h3imaginative",
    "cricketansgnd",
    "autosave",
    "knowimg",
    "eiatrvlansgnd",
    "dv3sugg",
    "autosave",
    "clgalileo",
    "gencontentv3",
  ];

  constructor() {
    super();
  }
}
