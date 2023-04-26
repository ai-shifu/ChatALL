import Bot from "./Bot";
// import axios from "axios";
import { SSE } from "sse.js";
// import { v4 as uuidv4 } from "uuid";
import store from "@/store";
export default class OpenAIAPIBots extends Bot {
    static apiKey = "";
    static apiUrl = "";
    static _brandId = "OpenAIAPI";
    static _id = "OpenAIAPIBots"; // ID of the bot, should be unique
    static _name = "openAIApiBot.name"; // String of the bot's name, should be unique
    static _logoFilename = "openai-logo.svg";
    static _loginUrl = ""; // URL for the login button on the bots page
    static _model = "";
    constructor() {
        super();
        this.apiKey = store.state.apiKey;
        this._model = store.state.gptAPIModel;
        this.apiUrl = store.state.gptAPIUrl;
    }

    // getDisplayName() {
    //   return `${super.getDisplayName()} (默认版 (GPT-3.5))`;
    // }

    async checkLoginStatus() {
        console.log("checkLoginStatus openai api")
        console.log("apiKey: " + this.apiKey)
        console.log("apiUrl: " + this.apiUrl)
        console.log("model: " + this._model)
        if(this.apiKey && this.apiUrl && this._model){
            console.log("checkLoginStatus openai api true")
            this.constructor._isLoggedIn = true;
        }else{
            console.log("checkLoginStatus openai api false")
            this.constructor._isLoggedIn = false;
        }
    }

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let res = ""
    // Send the prompt to the OpenAI API
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      };

      let payload = JSON.stringify({
        model: this._model,
        ['messages']: [{ role: 'user', content: `"${prompt}"` }],
        temperature: 0.9,
        stream: true
      });
      return new Promise((resolve, reject) => {
        const source = new SSE(
          this.apiUrl,
          {
            headers,
            method: "POST",
            payload
          }
        );
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
          console.error("Error handling real-time updates:", data.error.message);
          onUpdateResponse(data.error.message, callbackParam);
          source.close();
          reject(error);
        });
        source.addEventListener("done", (event) => {
          console.log("done", event);
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