import LangChainBot from "../LangChainBot";
import store from "@/store";
import { ChatXAI } from "@langchain/xai";

export default class xAIAPIBot extends LangChainBot {
  static _brandId = "xaiApi";
  static _className = "xAIAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.xaiApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatXAI({
      apiKey: store.state.xaiApi.apiKey,
      model: this.constructor._model ? this.constructor._model : "",
      streaming: true,
    });

    return chatModel;
  }

  getPastRounds() {
    return store.state.xaiApi.pastRounds ? store.state.xaiApi.pastRounds : 5;
  }
}
