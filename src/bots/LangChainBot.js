import Bot from "@/bots/Bot";
import { BufferMemory } from "langchain/memory";

export default class LangChainBot extends Bot {
  static _brandId = "langChainBot";
  static _chatModel = undefined; // ChatModel instance

  constructor() {
    super();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let messages = await this.getChatContext();
    let bufferMemory = new BufferMemory();

    // Remove old messages if exceeding the pastRounds limit
    while (messages.length > this.getPastRounds() * 2) {
      messages.shift();
    }

    // Deserialize the messages and convert them to the correct format
    messages.forEach((item) => {
      let storedMessage = JSON.parse(item); // Deserialize
      if (
        storedMessage.type.toLowerCase() ===
        bufferMemory.humanPrefix.toLowerCase()
      ) {
        bufferMemory.chatHistory.addUserMessage(storedMessage.data);
      } else if (
        storedMessage.type.toLowerCase() === bufferMemory.aiPrefix.toLowerCase()
      ) {
        bufferMemory.chatHistory.addAIChatMessage(storedMessage.data);
      } else if (storedMessage.type === "system") {
        bufferMemory.chatHistory.addMessage(storedMessage.data);
      }
    });

    // Add the prompt to the messages
    await bufferMemory.chatHistory.addUserMessage(prompt);

    let res = "";
    const model = this.constructor._chatModel;
    messages = await bufferMemory.chatHistory.getMessages();
    const callbacks = [
      {
        handleLLMNewToken(token) {
          res += token;
          onUpdateResponse(callbackParam, { content: res, done: false });
        },
        handleLLMEnd() {
          onUpdateResponse(callbackParam, { done: true });
        },
      },
    ];
    model.callbacks = callbacks;
    await model.call(messages);
    await bufferMemory.chatHistory.addAIChatMessage(res);
    // Serialize the messages before storing
    messages = messages.map((item) => JSON.stringify(item.toDict()));
    this.setChatContext(messages);
  }

  async createChatContext() {
    return [];
  }

  setupModel() {
    this.constructor._chatModel = this._setupModel();
  }

  _setupModel() {
    throw new Error(
      "Abstract property '_setupModel' must be implemented in the subclass.",
    );
  }

  getPastRounds() {
    throw new Error(
      "Abstract property 'pastRounds' must be implemented in the subclass.",
    );
  }
}
