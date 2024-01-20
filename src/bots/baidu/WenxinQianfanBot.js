import LangChainBot from "@/bots/LangChainBot";
import { ChatBaiduWenxin } from "@langchain/community/chat_models/baiduwenxin";
import AsyncLock from "async-lock";
import store from "@/store";

export default class WenxinQianfanBot extends LangChainBot {
  static _brandId = "wenxinQianfan"; // ID of the bot, should be unique
  static _className = "WenxinQianfanBot"; // Class name of the bot
  static _logoFilename = "wenxin-qianfan-logo.png"; // Place it in public/bots/
  static _model = "ERNIE-Bot"; // Model name
  static _lock = new AsyncLock();

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;
    const { apiKey, secretKey } = store.state.wenxinQianfan;
    if (apiKey && secretKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const { apiKey, secretKey } = store.state.wenxinQianfan;
    const chatModel = new ChatBaiduWenxin({
      modelName: this.constructor._model,
      baiduApiKey: apiKey,
      baiduSecretKey: secretKey,
      streaming: true,
    });
    return chatModel;
  }

  getPastRounds() {
    return store.state.wenxinQianfan.pastRounds;
  }
}
