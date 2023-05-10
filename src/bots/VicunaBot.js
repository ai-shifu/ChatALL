import AsyncLock from "async-lock";
import LMSYSBot from "./LMSYSBot";

export default class VicunaBot extends LMSYSBot {
  static _brandId = "vicuna"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "VicunaBot"; // Class name of the bot
  static _logoFilename = "vicuna-logo.jpeg"; // Place it in assets/bots/
  static _model = "vicuna-13b";
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS

  constructor() {
    super();
  }
}
