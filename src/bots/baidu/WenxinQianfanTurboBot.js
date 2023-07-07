import AsyncLock from "async-lock";
import WenxinQianfanBot from "./WenxinQianfanBot";

export default class WenxinQianfanTurboBot extends WenxinQianfanBot {
  static _className = "WenxinQianfanTurboBot"; // Class name of the bot
  static _logoFilename = "wenxin-qianfan-turbo-logo.png"; // Place it in public/bots/
  static _model = "ERNIE-Bot-turbo"; // Model name
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
