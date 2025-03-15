import LangChainBot from "../LangChainBot";
import { ChatOpenAI } from "@langchain/openai";
import store from "@/store/index";

export default class GitHubAPIBot extends LangChainBot {
  static _brandId = "gitHubApi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "GitHubAPIBot";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.gitHubApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatOpenAI({
      configuration: {
        basePath: "https://models.inference.ai.azure.com",
      },
      openAIApiKey: store.state.gitHubApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.gitHubApi.temperature,
      streaming: true,
    });
    return chatModel;
  }

  getPastRounds() {
    return store.state.gitHubApi.pastRounds;
  }
}
