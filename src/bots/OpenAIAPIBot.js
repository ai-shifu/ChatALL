import Bot from "./Bot";
import { SSE } from "sse.js";
import store from "@/store";

export default class OpenAIAPIBot extends Bot {
  static _brandId = "OpenAIAPI";
  static _logoFilename = "";
  static _loginUrl = ""; // URL for the login button on the bots page
  static _apiUrl = "https://api.openai.com/v1/chat/completions";
  static _model = "";
  static _botType = "API"; // API Bot or Web Bot

  constructor() {
    super();
  }

  async checkLoginStatus() {
    if(!store.state.openaiApiKey) {
      this.constructor._isLoggedIn = false;
    } else {
      this.constructor._isLoggedIn = true;
    }
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // Send the prompt to the OpenAI API
    try {

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.state.openaiApiKey}`,
      };
  
      const payload = JSON.stringify({
        model: this.constructor._model,
        messages: [{ role: 'user', content: `‘${prompt}’` }],
        temperature: 0.9,
        stream: true,
      });
  
      const requestConfig = {
        headers,
        method: "POST",
        payload
      };

      let res = "";
      return new Promise((resolve, reject) => {
        // call OpenAI API
        const source = new SSE(this.constructor._apiUrl,requestConfig);

        source.addEventListener("message", (event) => {
          const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
          if (event.data === "[DONE]") {
            onUpdateResponse(null, callbackParam, true);
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
            onUpdateResponse(res, callbackParam);
          }
        });
        source.addEventListener("error", (error) => {
          const data = JSON.parse(error.data);
          onUpdateResponse(data.error.message, callbackParam, true);
          source.close();
          reject(error);
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