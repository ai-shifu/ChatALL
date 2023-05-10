import Bot from "@/bots/Bot";
import { SSE } from "sse.js";
import store from "@/store";

export default class OpenAIAPIBot extends Bot {
  static _brandId = "openaiApi";
  static _className = "OpenAIAPIBot";
  static _logoFilename = "";
  static _loginUrl = ""; // URL for the login button on the bots page
  static _model = "";

  messages = [];

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
    // Send the prompt to the OpenAI API
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.state.openaiApi.apiKey}`,
      };

      this.messages.push({ role: "user", content: `‘${prompt}’` });
      const payload = JSON.stringify({
        model: this.constructor._model,
        messages: this.messages,
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
            this.messages.push({ role: "assistant", content: res });
            source.close();
            resolve();
          } else if (regex.test(event.data)) {
            // Ignore the timestamp
            return;
          } else {
            const data = JSON.parse(event.data);
            const partialText = data.choices?.[0]?.delta?.content;
            if (!partialText) {
              console.warn("No partial text in ChatGPT response:", data);
              return;
            }
            res += partialText;
            onUpdateResponse(callbackParam, { content: res, done: false });
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
}
