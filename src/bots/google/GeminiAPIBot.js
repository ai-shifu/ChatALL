import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default class GeminiAPIBot extends LangChainBot {
  static _brandId = "geminiApi";
  static _className = "GeminiAPIBot";
  static _logoFilename = "gemini-1.0-logo.png"; // Place it in public/bots/
  static _model = "gemini-pro";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.geminiApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  getPastRounds() {
    return store.state.geminiApi.pastRounds;
  }

  _setupModel() {
    const chatModel = new ChatGoogleGenerativeAI({
      apiKey: store.state.geminiApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.geminiApi.temperature,
      streaming: true,
      topK: store.state.geminiApi.topK,
      topP: store.state.geminiApi.topP,
    });
    return chatModel;
  }
}
