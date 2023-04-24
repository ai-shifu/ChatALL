import Bot from "./Bot";
// import axios from "axios";
import { SSE } from "sse.js";
export default class OpenAIAPIBots extends Bot {
    static model = ["davinci", "curie", "babbage", "ada", "content-filter-alpha-c4", "content-filter-dev"];
    static apiKey = "";
    static apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    static _id = "OpenAIAPIBots"; // ID of the bot, should be unique
    static _name = "openAIApiBot.name"; // String of the bot's name, should be unique
    static _loginUrl = ""; // URL for the login button on the bots page

    constructor() {
        super();
    }

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
        if(this.constructor.apiKey && this.constructor.apiUrl && this.constructor.model){
            this.constructor._isLoggedIn = true;
        }else{
            this.constructor._isLoggedIn = false;
        }
    }



    async sendPrompt(prompt, onUpdateResponse, callbackParam) {
       
        // Send the prompt to the OpenAI API
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          };
          const payload = JSON.stringify({
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 100
            });
    
          const source = new SSE(
            `https://api.openai.com/v1/engines/${this.model}/completions`,
            { headers, payload }
          );
          source.addEventListener("message", (event) => {
            const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
            if (event.data === "[DONE]") {
              source.close();
            } else if (regex.test(event.data)) {
              // Ignore the timestamp
              return;
            } else
              try {
                const data = JSON.parse(event.data);
                this.conversationContext.conversationId = data.conversation_id;
                this.conversationContext.parentMessageId = data.message.id;
                const partialText = data.message?.content?.parts?.[0];
                if (partialText) {
                  onUpdateResponse(partialText, callbackParam);
                }
              } catch (error) {
                console.error("Error parsing ChatGPT response:", error);
                console.error("ChatGPT response:", event);
                return;
              }
          });
          source.addEventListener("error", (error) => {
            console.error("Error handling real-time updates:", error);
            source.close();
          });
          source.addEventListener("done", (event) => {
            console.log("done", event);
            source.close();
          });
          source.stream();
        } catch (error) {
          console.error("Error sending prompt to OpenAIAPI:", error);
        }
      }


}