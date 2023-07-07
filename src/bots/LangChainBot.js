import Bot from "@/bots/Bot";
import { HumanMessage, AIMessage, SystemMessage } from "langchain/schema";

export default class LangChainBot extends Bot {
  static _brandId = "langChainBot";
  static _chatModel = undefined; // ChatModel instance

  constructor() {
    super();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let messages = await this.getChatContext();
    // Remove old messages if exceeding the pastRounds limit
    while (messages.length > this.getPastRounds() * 2) {
      messages.shift();
    }

    // Deserialize the messages and convert them to the correct format
    messages = messages.map((item) => {
      let storedMessage = JSON.parse(item); // Deserialize
      if (storedMessage.type === "human") {
        return new HumanMessage(storedMessage.data);
      } else if (storedMessage.type === "ai") {
        return new AIMessage(storedMessage.data);
      } else if (storedMessage.type === "system") {
        return new SystemMessage(storedMessage.data);
      }
    });

    // Add the prompt to the messages
    messages.push(new HumanMessage(prompt));

    let res = "";
    const model = this.constructor._chatModel;
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
    messages.push(new AIMessage(res));
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
