import AsyncLock from "async-lock";
import GradioBot from "./GradioBot";
import store from "@/store";

export default class GradioAppBot extends GradioBot {
  static _className = "GradioAppBot"; // Class name of the bot
  static _loginUrl = "";
  static _settingsComponent = "GradioAppBotSettings"; // Vue component filename for settings
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
    this.constructor._loginUrl = store.state.gradio.url;
    this.constructor._fnIndexes[0] = store.state.gradio.fnIndex;
  }

  _checkAvailability() {
    this.constructor._loginUrl = store.state.gradio.url;
    this.constructor._fnIndexes[0] = store.state.gradio.fnIndex;
    return super._checkAvailability();
  }

  makeData(fn_index, prompt) {
    return Array(prompt);
  }

  parseData(fn_index, data) {
    return data[0];
  }
}
