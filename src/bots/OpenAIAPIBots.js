import Bot from "./Bot";
// import axios from "axios";
import { SSE } from "sse.js";
// import { v4 as uuidv4 } from "uuid";
import store from "@/store";
export default class OpenAIAPIBots extends Bot {
    static apiKey = "";
    static apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    static _brandId = "OpenAIAPI";
    static _id = "OpenAIAPIBots"; // ID of the bot, should be unique
    static _name = "openAIApiBot.name"; // String of the bot's name, should be unique
    static _logoFilename = "openai-logo.svg";
    static _loginUrl = "openai-logo.svg"; // URL for the login button on the bots page
    model = "davinci";
    constructor() {
        super();
        this.apiKey = store.state.apiKey;
    }

    conversationContext = {
        conversationId: "",
        parentMessageId: "",
      };

    setApiKey(key) {
        this.apiKey = key
    }

    getDisplayName() {
       return `${super.getDisplayName()} (默认版 (GPT-3.5))`;
    }

    setModel(m) {
        if (this.constructor.model.includes(m)) {
          this.model = m 
        } else {
          console.log('Invalid model!')
        }
    }

    setApiUrlPath(url){
        if(url){
            this.apiUrl = url
        }
    }

    async checkLoginStatus() {
        console.log("checkLoginStatus openai api")
        console.log("apiKey: " + this.apiKey)
        console.log("apiUrl: " + this.constructor.apiUrl)
        if(this.apiKey && this.constructor.apiUrl && this.model){
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
        model: "gpt-3.5-turbo",
        ['messages']: [{ role: 'user', content: `"${prompt}"` }],
        temperature: 0.9,
        stream: true
      });
      return new Promise((resolve, reject) => {
        const source = new SSE(
          "https://api.openai.com/v1/chat/completions",
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