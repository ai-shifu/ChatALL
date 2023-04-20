import BingChatPreciseBot from "./BingChatPreciseBot";

export default class BingChatCreativeBot extends BingChatPreciseBot {
  static _id = "BingChatCreativeBot"; // ID of the bot, should be unique
  static _name = "bingChat.name"; // String of the bot's brand name
  static _version = "bingChat.creative"; // Version or style of the bot (eg. "GPT-4")
  static _logoFilename = "bing-creative-logo.png"; // Place it in assets/bots/
  static _style = "h3imaginative"; // Bing styles: h3imaginative, harmonyv3, h3precise

  constructor() {
    super();
  }
}
