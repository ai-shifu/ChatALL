import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatOpenAI } from "@langchain/openai";

export default class AtlasCloudAPIBot extends LangChainBot {
  static _brandId = "atlasCloudApi";
  static _className = "AtlasCloudAPIBot";
  static _logoFilename = "default-logo.svg";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.atlasCloudApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatOpenAI({
      configuration: {
        basePath: "https://api.atlascloud.ai/v1",
      },
      openAIApiKey: store.state.atlasCloudApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.atlasCloudApi.temperature,
      maxTokens: store.state.atlasCloudApi.maxTokens,
      streaming: true,
    });
    return chatModel;
  }

  getPastRounds() {
    return store.state.atlasCloudApi.pastRounds
      ? store.state.atlasCloudApi.pastRounds
      : 5;
  }
}
