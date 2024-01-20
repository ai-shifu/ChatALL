import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatOpenAI } from "@langchain/openai";

export default class AzureOpenAIAPIBot extends LangChainBot {
  static _brandId = "azureOpenaiApi";
  static _className = "AzureOpenAIAPIBot";
  static _logoFilename = "azure-openai-logo.png";
  static _isDarkLogo = true; // The main color of logo is dark

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;
    if (
      store.state.azureOpenaiApi.azureApiKey &&
      store.state.azureOpenaiApi.azureApiInstanceName &&
      store.state.azureOpenaiApi.azureOpenAIApiDeploymentName &&
      store.state.azureOpenaiApi.azureOpenAIApiVersion
    ) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
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
    return chatModel;
  }

  getPastRounds() {
    return store.state.azureOpenaiApi.pastRounds;
  }
}
