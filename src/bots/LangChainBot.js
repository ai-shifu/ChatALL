import Bot from "@/bots/Bot";
import store from "@/store";
import { SSE } from 'sse.js';

export default class LangChainBot extends Bot {
  static _brandId = "langChainBot";
  static _chatModel = undefined; // ChatModel instance

  constructor() {
      super();
      this.source = null;
  }
    async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
        let messages = await this.getChatContext();
        // Remove old messages if exceeding the pastRounds limit
        while (messages.length > store.state.openaiApi.pastRounds * 2) {
            messages.shift();
        }

        // Send the prompt to the OpenAI API
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.openaiApi.apiKey}`,
            };

            messages.push({ role: 'user', content: `‘${prompt}’` });
            const payload = JSON.stringify({
                model: this.constructor._model,
                messages: messages,
                temperature: store.state.openaiApi.temperature,
                stream: true,
            });

            const requestConfig = {
                headers,
                method: 'POST',
                payload,
            };

            let res = '';
            return new Promise((resolve, reject) => {
                // call OpenAI API
                const apiUrl
                    = store.state.openaiApi.alterUrl
                    || 'https://api.openai.com/v1/chat/completions';
                this.source = new SSE(apiUrl, requestConfig);
                this.source.addEventListener('message', event => {
                    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
                    if (event.data === '[DONE]') {
                        onUpdateResponse(callbackParam, { done: true });
                        messages.push({ role: 'assistant', content: res });
                        this.setChatContext(messages);
                        this.source.close();
                        resolve();
                    }
                    else if (regex.test(event.data)) {
                        // Ignore the timestamp
                        return;
                    }
                    else {
                        if (event?.source?.chunk?.startsWith('{')) {
                            const { code, msg, error } = JSON.parse(event?.source?.chunk || '{}');
                            if (error && error?.message) {
                                this.source.close();
                                reject(error?.message);
                                return;
                            }
                            if (code >= 400) {
                                this.source.close();
                                reject(`${code}： ${msg}`);
                                return;
                            }
                        }
                        try {
                            const data = JSON.parse(event.data);
                            const partialText = data.choices?.[0]?.delta?.content;
                            if (partialText) {
                                res += partialText;
                                onUpdateResponse(callbackParam, { content: res, done: false });
                            }
                        }
                        catch (e) {
                            this.source.close();
                            reject(e);
                        }
                    }
                });
                this.source.addEventListener('error', error => {
                    try {
                        const data = (() => {
                            if (error?.data) {
                                return error?.data?.startsWith('{')
                                    ? JSON.parse(error.data) : typeof error?.data === 'object'
                                        ? JSON.stringify(error.data) : error.data;
                            }
                            return error;
                        })();
                        this.source.close();
                        reject(data?.error?.message || data?.error?.msg || data?.data || data || '');
                    }
                    catch (e) {
                        this.source.close();
                        console.error(e);
                        reject(e);
                    }

                });
                this.source.stream();
            });
        }
        catch (error) {
            console.error('Error sending prompt to OpenAIAPI:', error);
            throw error;
        }
    }

    _stopGenerating() {
        this.source && this.source.close();
    }

//   async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
//     let messages = await this.getChatContext();
//     // Remove old messages if exceeding the pastRounds limit
//     while (messages.length > this.getPastRounds() * 2) {
//       messages.shift();
//     }

//     // Deserialize the messages and convert them to the correct format
//     messages = messages.map((item) => {
//       let storedMessage = JSON.parse(item); // Deserialize
//       if (storedMessage.type === "human") {
//         return new HumanMessage(storedMessage.data);
//       } else if (storedMessage.type === "ai") {
//         return new AIMessage(storedMessage.data);
//       } else if (storedMessage.type === "system") {
//         return new SystemMessage(storedMessage.data);
//       }
//     });

//     // Add the prompt to the messages
//     messages.push(new HumanMessage(prompt));

//     let res = "";
//     const model = this.constructor._chatModel;
//     const callbacks = [
//       {
//         handleLLMNewToken(token) {
//           res += token;
//           onUpdateResponse(callbackParam, { content: res, done: false });
//         },
//         handleLLMEnd() {
//           onUpdateResponse(callbackParam, { done: true });
//         },
//       },
//     ];
//     model.callbacks = callbacks;
//     await model.call(messages);
//     messages.push(new AIMessage(res));
//     // Serialize the messages before storing
//     messages = messages.map((item) => JSON.stringify(item.toDict()));
//     this.setChatContext(messages);
//   }

  async createChatContext() {
    return [];
  }

  getPastRounds() {
    throw new Error(
      "Abstract property 'pastRounds' must be implemented in the subclass.",
    );
  }
}
