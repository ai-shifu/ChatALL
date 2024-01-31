import AsyncLock from "async-lock";

import BingChatBot from "./BingChatBot";

export default class BingChatPreciseBot extends BingChatBot {
  static _className = "BingChatPreciseBot"; // Class name of the bot
  static _logoFilename = "bing-precise-logo.png"; // Place it in public/bots/
  static _model = "h3precise"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _lock = new AsyncLock(); // Must process requests in queue

  static _optionsSets = [
    "nlu_direct_response_filter",
    "deepleo",
    "disable_emoji_spoken_text",
    "responsible_ai_policy_235",
    "enablemm",
    "dv3sugg",
    "autosave",
    "iyxapbing",
    "iycapbing",
    "h3precise",
    "bicfluxv2",
    "memmidlat",
    "langdtwb",
    "014CB21D",
    "clgalileo",
    "gencontentv3",
    "fluxmemcst",
    "enable_user_consent",
  ];
  static _tone = "Precise";

  constructor() {
    super();
  }
}
