import GradioBot from "@/bots/huggingface/GradioBot";
import AsyncLock from "async-lock";
import axios from "axios";
import store from "@/store";

export default class Falcon180bBot extends GradioBot {
  static _brandId = "falcon"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Falcon180bBot"; // Class name of the bot
  static _logoFilename = "falcon-180b-logo.jpeg"; // Place it in public/bots/
  static _loginUrl = "https://tiiuae-falcon-180b-demo.hf.space/"; // Any Gradio URL
  static _settingsComponent = "Falcon180bBotSettings"; // Vue component filename for settings
  static _model = "falcon-180b";
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS
  static _fnIndexes = [3]; // Indexes of the APIs to call in order. Sniffer it by devtools.

  static _predictUrl = Falcon180bBot._loginUrl + "run/predict";

  constructor() {
    super();
  }

  sendPredict(fn_index, session_hash, payload) {
    return axios.post(Falcon180bBot._predictUrl, {
      fn_index,
      data: [],
      event_data: null,
      session_hash: session_hash,
      ...payload,
    });
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    try {
      const session_hash = await this.getChatContext();
      await axios.all([
        this.sendPredict(4, session_hash),
        this.sendPredict(1, session_hash, {
          data: [prompt],
        }),
      ]);
      await this.sendPredict(2, session_hash, { data: [null, null] });
      await super._sendPrompt(prompt, onUpdateResponse, callbackParam);
      await this.sendPredict(5, session_hash);
    } catch (error) {
      throw Error(error);
    }
  }

  /* eslint-disable no-unused-vars */
  makeData(fn_index, prompt) {
    let r = null;
    if (fn_index === this.constructor._fnIndexes[0]) {
      r = [
        null,
        null,
        "",
        store.state.falcon.temperature,
        store.state.falcon.maxNewTokens,
        store.state.falcon.topP,
        store.state.falcon.repetitionPenalty,
      ];
    }
    return r;
  }

  parseData(fn_index, data) {
    let r = undefined;
    if (fn_index === this.constructor._fnIndexes[0]) {
      r = data[0][data[0].length - 1][1];
    }
    return r;
  }

  parseError(errorMsg) {
    return errorMsg;
  }
}
