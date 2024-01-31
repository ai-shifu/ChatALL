import AsyncLock from "async-lock";

import BingChatBot from "./BingChatBot";

export default class BingChatCreativeBot extends BingChatBot {
  static _className = "BingChatCreativeBot"; // Class name of the bot
  static _logoFilename = "bing-creative-logo.png"; // Place it in public/bots/
  static _model = "h3imaginative"; // Bing styles: h3imaginative, harmonyv3, h3precise
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
    "enable_user_consent",
    "fluxmemcst",
    "h3imaginative",
    "bicfluxv2",
    "memmidlat",
    "langdtwb",
    "014CB21D",
    "clgalileo",
    "gencontentv3",
  ];
  static _tone = "Creative";

  constructor() {
    super();
  }
}
