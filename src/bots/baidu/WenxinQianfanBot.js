import axios from "axios";
import { SSE } from "sse.js";

import Bot from "@/bots/Bot";
import store from "@/store";

export default class WenxinQianfanBot extends Bot {
  static _brandId = "wenxinQianfan"; // ID of the bot, should be unique
  static _className = "WenxinQianfanBot"; // Class name of the bot
  static _logoFilename = "wenxin-qianfan-logo.png"; // Place it in public/bots/

  accessToken = "";

  constructor() {
    super();
  }

  async checkAvailability() {
    const { apiKey, secretKey } = store.state.wenxinQianfan;
    if (apiKey && secretKey) {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      try {
        const resp = await axios.post(
          `https://aip.baidubce.com/oauth/2.0/token?client_id=${apiKey}&client_secret=${secretKey}&grant_type=client_credentials`,
          {},
          { headers },
        );
        this.accessToken = resp.data.access_token;
        this.constructor._isAvailable = true;
      } catch (e) {
        console.error(e);
        this.constructor._isAvailable = false;
      }
    } else {
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let messages = await this.getChatContext();
    // Remove old messages if exceeding the pastRounds limit
    while (messages.length > store.state.wenxinQianfan.pastRounds * 2) {
      messages.shift();
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${this.accessToken}`;

      messages.push({ role: "user", content: `‘${prompt}’` });
      const payload = JSON.stringify({
        messages,
        stream: true,
        user: "chatall",
      });

      const requestConfig = {
        headers,
        method: "POST",
        payload,
      };

      let fullResult = "";
      return new Promise((resolve, reject) => {
        const source = new SSE(url, requestConfig);

        source.addEventListener("message", (event) => {
          if (event.data) {
            const data = JSON.parse(event.data);
            const partialResult = data.result;
            fullResult += partialResult;
            onUpdateResponse(callbackParam, {
              content: fullResult,
              done: data.is_end,
            });

            if (data.is_end) {
              messages.push({ role: "assistant", content: fullResult });
              this.setChatContext(messages);
              source.close();
              resolve();
            }
          } else {
            // To capture random errors
            console.error("Error Wenxin Qianfan:", event);
            const response = JSON.parse(event.source.xhr.responseText);
            source.close();
            reject(new Error(`${response.error_code} ${response.error_msg}`));
          }
        });
        source.addEventListener("error", (error) => {
          const data = JSON.parse(error.data);
          source.close();
          reject(new Error(`${data.error_code} ${data.error_msg}`));
        });
        source.stream();
      });
    } catch (error) {
      console.error("Error sending prompt to OpenAIAPI:", error);
      throw error;
    }
  }

  async createChatContext() {
    return [];
  }
}
