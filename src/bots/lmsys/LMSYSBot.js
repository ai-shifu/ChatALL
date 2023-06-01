import AsyncLock from "async-lock";
import GradioBot from "@/bots/huggingface/GradioBot";

export default class LMSYSBot extends GradioBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "LMSYSBot"; // Class name of the bot
  static _logoFilename = "lmsys-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://chat.lmsys.org/"; // Any Gradio URL
  static _settingsComponent = "LMSYSBotSettings"; // Vue component filename for settings
  static _fnIndexes = [7, 8]; // Indexes of the APIs to call in order. Sniffer it by devtools.
  static _model = "";
  static _outputFormat = "html"; // "markdown" or "html"
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS

  constructor() {
    super();
  }

  makeData(fn_index, prompt) {
    let r = null;
    if (fn_index === this.constructor._fnIndexes[0]) {
      r = [null, this.constructor._model, prompt];
    } else if (fn_index === this.constructor._fnIndexes[1]) {
      r = [null, 0.7, 1, 512];
    }
    return r;
  }

  parseData(fn_index, data) {
    let r = "";
    if (fn_index === this.constructor._fnIndexes[1]) {
      r = data[1][data[1].length - 1][1];
    }
    return r;
  }
}
