import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default class GeminiBot extends LangChainBot {
  static _brandId = "gemini";
  static _className = "GeminiBot";
  static _logoFilename = "gemini-logo.png"; // Place it in public/bots/
  static _model = "gemini-pro";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.gemini.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  getPastRounds() {
    return store.state.gemini.pastRounds;
  }

  _setupModel() {
    const chatModel = new ChatGoogleGenerativeAI({
      apiKey: store.state.gemini.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.gemini.temperature,
      streaming: true,
      topK: store.state.gemini.topK,
      topP: store.state.gemini.topP,
    });
    return chatModel;
  }
}
