import BingChatPreciseBot from "./BingChatPreciseBot";

export default class BingChatBalancedBot extends BingChatPreciseBot {
  static _id = "BingChatBalancedBot"; // ID of the bot, should be unique
  static _name = "bingChat.name"; // String of the bot's brand name
  static _version = "bingChat.balanced"; // Version or style of the bot (eg. "GPT-4")
  static _logoFilename = "bing-balanced-logo.png"; // Place it in assets/bots/
  static _style = "harmonyv3"; // Bing styles: h3imaginative, harmonyv3, h3precise

  constructor() {
    super();
  }
}
