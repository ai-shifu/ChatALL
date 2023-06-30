import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatOpenAI } from "langchain/chat_models/openai";

export default class OpenAIAPIBot extends LangChainBot {
  static _brandId = "openaiApi";
  static _className = "OpenAIAPIBot";

  constructor() {
    super();
  }

  async checkAvailability() {
    if (!store.state.openaiApi.apiKey) {
      this.constructor._isAvailable = false;
    } else {
      const chatModel = new ChatOpenAI({
        configuration: {
          basePath: store.state.openaiApi.alterUrl ? store.state.openaiApi.alterUrl : "",
        },
        openAIApiKey: store.state.openaiApi.apiKey,
        modelName: this.constructor._model ? this.constructor._model : "",
        temperature: store.state.openaiApi.temperature,
        streaming: true,
      });
      this.constructor._chatModel = chatModel;
      this.constructor._isAvailable = true;
    }
    return this.isAvailable();
  }

  getPastRounds() {
    return store.state.openaiApi.pastRounds;
  }
}
