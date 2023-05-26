import Bot from "@/bots/Bot";
import { SSE } from "sse.js";
import store from "@/store";

export default class OpenAIAPIBot extends Bot {
  static _brandId = "openaiApi";
  static _className = "OpenAIAPIBot";
  static _logoFilename = "";
  static _loginUrl = ""; // URL for the login button on the bots page
  static _model = "";

  constructor() {
    super();
  }

  async checkAvailability() {
    if (!store.state.openaiApi.apiKey) {
      this.constructor._isAvailable = false;
    } else {
      this.constructor._isAvailable = true;
    }
    return this.isAvailable();
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.state.openaiApi.apiKey}`,
      };

      messages.push({ role: "user", content: `‘${prompt}’` });
      const payload = JSON.stringify({
        model: this.constructor._model,
        messages,
        temperature: store.state.openaiApi.temperature,
        stream: true,
      });

      const requestConfig = {
        headers,
        method: "POST",
        payload,
      };

      let res = "";
      return new Promise((resolve, reject) => {
        // call OpenAI API
        const apiUrl =
          store.state.openaiApi.alterUrl ||
          "https://api.openai.com/v1/chat/completions";
        const source = new SSE(apiUrl, requestConfig);
        source.addEventListener("message", (event) => {
          const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
          if (event.data === "[DONE]") {
            onUpdateResponse(callbackParam, { done: true });
            messages.push({ role: "assistant", content: res });
            this.setChatContext(messages);
            source.close();
            resolve();
          } else if (regex.test(event.data)) {
            // Ignore the timestamp
            return;
          } else {
            const data = JSON.parse(event.data);
            const partialText = data.choices?.[0]?.delta?.content;
            if (partialText) {
              res += partialText;
              onUpdateResponse(callbackParam, { content: res, done: false });
            }
          }
        });
        source.addEventListener("error", (error) => {
          const data = JSON.parse(error.data);
          source.close();
          reject(data.error.message);
        });
        source.addEventListener("done", () => {
          source.close();
          resolve();
        });
        source.stream();
      });
    } catch (error) {
      console.error("Error sending prompt to OpenAIAPI:", error);
    }
  }

  async createChatContext() {
    return [];
  }
}
