import AsyncLock from "async-lock";
import WenxinQianfanBot from "./WenxinQianfanBot";

export default class WenxinQianfan4Bot extends WenxinQianfanBot {
  static _className = "WenxinQianfan4Bot"; // Class name of the bot
  static _logoFilename = "wenxin-qianfan-4-logo.png"; // Place it in public/bots/
  static _model = "ERNIE-Bot-4"; // Model name
  static _lock = new AsyncLock();

  constructor() {
    super();
  }
}
