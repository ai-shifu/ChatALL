import store from "@/store";
import LangChainBot from "../LangChainBot";
import { ChatAnthropic } from "@langchain/anthropic";

export default class ClaudeAPIBot extends LangChainBot {
  static _brandId = "claudeApi";
  static _className = "ClaudeAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.claudeApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatAnthropic({
      anthropicApiKey: store.state.claudeApi.apiKey,
      anthropicApiUrl: store.state.claudeApi.alterUrl
        ? store.state.claudeApi.alterUrl
        : "",
      maxTokens: store.state.claudeApi.maxTokens,
      temperature: store.state.claudeApi.temperature,
      modelName: this.constructor._model ? this.constructor._model : "",
      streaming: true,
    });

    return chatModel;
  }

  getPastRounds() {
    return store.state.claudeApi.pastRounds
      ? store.state.claudeApiApi.pastRounds
      : 1;
  }
}
