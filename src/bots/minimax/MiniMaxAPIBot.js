import LangChainBot from "../LangChainBot";
import store from "@/store";
import { ChatOpenAI } from "@langchain/openai";

export default class MiniMaxAPIBot extends LangChainBot {
  static _brandId = "minimaxApi";
  static _className = "MiniMaxAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.minimaxApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatOpenAI({
      configuration: {
        basePath: store.state.minimaxApi.alterUrl
          ? store.state.minimaxApi.alterUrl
          : "https://api.minimax.io/v1",
      },
      openAIApiKey: store.state.minimaxApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.minimaxApi.temperature,
      streaming: true,
    });
    return chatModel;
  }

  getPastRounds() {
    return store.state.minimaxApi.pastRounds;
  }
}
