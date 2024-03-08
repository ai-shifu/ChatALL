import AsyncLock from "async-lock";
import GradioBot from "@/bots/huggingface/GradioBot";

export default class LMSYSBot extends GradioBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "LMSYSBot"; // Class name of the bot
  static _logoFilename = "lmsys-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://chat.lmsys.org/"; // Any Gradio URL
  static _settingsComponent = "LMSYSBotSettings"; // Vue component filename for settings
  static _model = "";
  static _outputFormat = "html"; // "markdown" or "html"
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS

  static _fnIndexes = [41, 42]; // Indexes of the APIs to call in order. Sniffer it by devtools.
  _triggerId = 93; // From devtools

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = await super._checkAvailability();
    if (available) {
      this._sendFnIndex(43, "", () => {}, 0); // Refresh the session
    }
    return available;
  }

  makeData(fn_index, prompt) {
    let r = null;
    if (fn_index === this.constructor._fnIndexes[0]) {
      r = [null, this.constructor._model, prompt, null];
    } else if (fn_index === this.constructor._fnIndexes[1]) {
      r = [null, 0.7, 1, 512];
    } else if (fn_index === 43) {
      r = [{}];
    }
    return r;
  }

  parseData(fn_index, data) {
    let r = undefined;
    if (fn_index === this.constructor._fnIndexes[1]) {
      const dataOne = data[1];

      if (dataOne.length > 0) {
        const dataTwo = dataOne[dataOne.length - 1];
        const dataThree = dataTwo[dataTwo.length - 1];
        r = dataThree;
      }
    }
    if (!r) r = ""; // Sometimes the result from data[] is null
    return r;
  }

  parseError(errorMsg) {
    if (errorMsg.includes("REFRESH THIS PAGE")) {
      errorMsg = errorMsg.replace(
        "REFRESH THIS PAGE",
        `<a href="${this.constructor._loginUrl}" target="innerWindow">REFRESH THIS PAGE</a>`,
      );

      // Refresh the session too
      const context = this.createChatContext();
      this.setChatContext(context);
    }
    return errorMsg;
  }
}
