import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatOpenAI } from "langchain/chat_models/openai";

export default class AzureOpenAIAPIBot extends LangChainBot {
  static _brandId = "azureOpenaiApi";
  static _className = "AzureOpenAIAPIBot";
  static _logoFilename = "azure-openai-logo.png";
  static _isDarkLogo = true; // The main color of logo is dark

  constructor() {
    super();
  }

  async checkAvailability() {
    if (
      !store.state.azureOpenaiApi.azureApiKey ||
      !store.state.azureOpenaiApi.azureApiInstanceName ||
      !store.state.azureOpenaiApi.azureOpenAIApiDeploymentName ||
      !store.state.azureOpenaiApi.azureOpenAIApiVersion
    ) {
      this.constructor._isAvailable = false;
    } else {
      const chatModel = new ChatOpenAI({
        azureOpenAIApiKey: store.state.azureOpenaiApi.azureApiKey,
        azureOpenAIApiInstanceName:
          store.state.azureOpenaiApi.azureApiInstanceName,
        azureOpenAIApiDeploymentName:
          store.state.azureOpenaiApi.azureOpenAIApiDeploymentName,
        azureOpenAIApiVersion: store.state.azureOpenaiApi.azureOpenAIApiVersion,
        temperature: store.state.azureOpenaiApi.temperature,
        streaming: true,
      });
      this.constructor._chatModel = chatModel;
      this.constructor._isAvailable = true;
    }
    return this.isAvailable();
  }

  getPastRounds() {
    return store.state.azureOpenaiApi.pastRounds;
  }
}
