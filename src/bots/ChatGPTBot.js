import Bot from "./Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { SSE } from "sse.js";

export default class ChatGPTBot extends Bot {
  static _id = "ChatGPTBot"; // ID of the bot, should be unique
  static _name = "bot.ChatGPT"; // String of the bot's name, should be unique
  static _logoFilename = "chatgpt-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://chat.openai.com/";

  accessToken = "";
  conversationContext = {
    conversationId: "",
    parentMessageId: "",
  };

  constructor() {
    super();
  }

  async checkLoginStatus() {
    try {
      const response = await axios.get(
        "https://chat.openai.com/api/auth/session"
      );
      if (response.data && response.data.accessToken) {
        this.accessToken = response.data.accessToken;
        this.constructor._isLoggedIn = true;
      } else {
        this.constructor._isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error checking ChatGPT login status:", error);
      this.constructor._isLoggedIn = false;
    }
  }

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // Make sure the access token is available
    if (!this.accessToken) await this.checkLoginStatus();

    // If not logged in, handle the error
    if (!this.isLoggedIn()) {
      console.error("Not logged in to ChatGPT.");
      return;
    }

    // Send the prompt to the ChatGPT API
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      };
      const payload = JSON.stringify({
        action: "next",
        messages: [
          {
            id: uuidv4(),
            author: { role: "user" },
            content: {
              content_type: "text",
              parts: [prompt],
            },
          },
        ],
        model: "text-davinci-002-render-sha", // You can replace this with a dynamic model name if needed
        conversation_id: this.conversationContext.conversationId || undefined,
        parent_message_id: this.conversationContext.parentMessageId || uuidv4(),
      });

      const source = new SSE(
        "https://chat.openai.com/backend-api/conversation",
        { headers, payload }
      );
      source.addEventListener("message", (event) => {
        if (event.data === "[DONE]") {
          source.close();
        } else {
          const data = JSON.parse(event.data);
          this.conversationContext.conversationId = data.conversation_id;
          this.conversationContext.parentMessageId = data.message.id;
          const partialText = data.message?.content?.parts?.[0];
          if (partialText) {
            onUpdateResponse(partialText, callbackParam);
          }
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
      console.error("Error sending prompt to ChatGPT:", error);
    }
  }
}
