import LangChainBot from "../LangChainBot";
import store from "@/store";
import { ChatGroq } from "@langchain/groq";

export default class GroqAPIBot extends LangChainBot {
  static _brandId = "groqApi";
  static _className = "GroqAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.groqApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatGroq({
      apiKey: store.state.groqApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      streaming: true,
      temperature: store.state.groqApi.temperature,
      maxTokens: store.state.groqApi.maxTokens,
    });

    return chatModel;
  }

  getPastRounds() {
    return store.state.groqApi.pastRounds ? store.state.groqApi.pastRounds : 1;
  }
}
