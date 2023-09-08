import Bot from "@/bots/Bot";
import { BufferMemory } from "langchain/memory";

export default class LangChainBot extends Bot {
  static _brandId = "langChainBot";
  static _chatModel = undefined; // ChatModel instance

  constructor() {
    super();
    this.bufferMemory = new BufferMemory();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // Fetch the chat messages from the buffer memory.
    let messages = await this.getChatContext();
    // Clear the buffer memory and set the new chat title as the memory key.
    await this.bufferMemory.clear();
    messages = messages.map((item) => {
      let storedMessage = JSON.parse(item); // Deserialize
      if (
        storedMessage.type.toLowerCase() ===
        this.bufferMemory.humanPrefix.toLowerCase()
      ) {
        this.bufferMemory.chatHistory.addUserMessage(storedMessage.data);
      } else if (
        storedMessage.type.toLowerCase() ===
        this.bufferMemory.aiPrefix.toLowerCase()
      ) {
        this.bufferMemory.chatHistory.addAIChatMessage(storedMessage.data);
      } else if (storedMessage.type === "system") {
        this.bufferMemory.chatHistory.addMessage(storedMessage.data);
      }
    });
    // Remove old messages if exceeding the pastRounds limit
    while (messages.length > this.getPastRounds() * 2) {
      messages.shift();
    }
    // Deserialize the messages and convert them to the correct format

    // Add the prompt to the messages
    await this.bufferMemory.chatHistory.addUserMessage(prompt);

    let res = "";
    const model = this.constructor._chatModel;
    messages = await this.bufferMemory.chatHistory.getMessages();
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
    await this.bufferMemory.chatHistory.addAIChatMessage(res);
    // Serialize the messages before storing
    messages = messages.map((item) => JSON.stringify(item.toDict()));
    this.setChatContext(messages);
  }

  async createChatContext() {
    return [];
  }

  getPastRounds() {
    throw new Error(
      "Abstract property 'pastRounds' must be implemented in the subclass.",
    );
  }
}
