import LangChainBot from "../LangChainBot";
import store from "@/store";
import { ChatCohere } from "@langchain/cohere";

export default class CohereAPIBot extends LangChainBot {
  static _brandId = "cohereApi";
  static _className = "CohereAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.cohereApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatCohere({
      apiKey: store.state.cohereApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      streaming: true,
      temperature: store.state.cohereApi.temperature,
    });

    return chatModel;
  }

  getPastRounds() {
    return store.state.cohereApi.pastRounds
      ? store.state.cohereApi.pastRounds
      : 5;
  }
}
