import Bot from "@/bots/Bot";
import axios from "axios";
import { SSE } from "sse.js";

export default class Qihoo360AIBrainBot extends Bot {
  static _brandId = "360AiBrain";
  static _className = "Qihoo360AIBrainBot"; // Class name of the bot
  static _logoFilename = "360-ai-brain-logo.png";
  static _loginUrl = "https://chat.360.com/";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    await axios
      .get("https://chat.360.com/backend-api/api/user/info")
      .then((response) => {
        available = response.data?.context?.message == "OK";
      })
      .catch((error) => {
        console.error("Error checking 360Bot Chat login status:", error);
      });

    return available;
  }

  async createChatContext() {
    return {};
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  // eslint-disable-next-line
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    let res = "";
    const headers = {
      accept: "text/event-stream",
      "content-type": "application/json",
    };
    const payload = JSON.stringify({
      is_regenerate: false,
      is_so: false,
      prompt: prompt,
      role: "00000001",
      source_type: "prophet_web",
    });

    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          "https://chat.360.com/backend-api/api/common/chat",
          {
            headers,
            payload,
          },
        );

        source.addEventListener("200", (event) => {
          res += event.data;
          onUpdateResponse(callbackParam, {
            content: res,
            done: true,
          });
          resolve();
        });

        //Get CONVERSATIONID e.g: CONVERSATIONID####f9563471f24a088d
        source.addEventListener("100", (event) => {
          context.parentConversationId = event.data.split("####")[1];
          this.setChatContext(context);
        });

        //Get MESSAGEID e.g: MESSAGEID####f9563471f24a088ddd34826b527ffdfb
        source.addEventListener("101", (event) => {
          context.parentMessageId = event.data.split("####")[1];
          this.setChatContext(context);
        });

        //unable to answer the user's question.
        source.addEventListener("40042", (event) => {
          res += event.data;
          onUpdateResponse(callbackParam, {
            content: res,
            done: true,
          });
        });

        source.addEventListener("error", (event) => {
          console.error(event);
          const message = this.getSSEDisplayError(event);
          reject(message);
        });

        source.stream();
      } catch (err) {
        reject(err);
      }
    });
  }
}
