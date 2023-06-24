import Bot from "@/bots/Bot";
import {
  HumanChatMessage,
  AIChatMessage,
  SystemChatMessage,
} from "langchain/schema";

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

    // Convert the messages to the correct format
    messages = messages.map((item) => {
      if (item.type === "human") {
        return new HumanChatMessage(item.data.content);
      } else if (item.type === "ai") {
        return new AIChatMessage(item.data.content);
      } else if (item.type === "system") {
        return new SystemChatMessage(item.data.content);
      } else {
        return item;
      }
    });

    // Add the prompt to the messages
    messages.push(new HumanChatMessage(prompt));

    let res = "";
    const model = this.constructor._chatModel;
    const callbacks = [
      {
        handleLLMNewToken(token) {
          if (token) {
            res += token;
            onUpdateResponse(callbackParam, { content: res, done: false });
          } else {
            onUpdateResponse(callbackParam, { done: true });
          }
        },
      },
    ];
    model.callbacks = callbacks;
    await model.call(messages);
    messages.push(new AIChatMessage(res));
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
