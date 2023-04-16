import Bot from "./Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WebSocketAsPromised from "websocket-as-promised";

function randomIP() {
  return (
    "13." +
    Math.floor(Math.random() * 3 + 105) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255)
  );
}
export default class BingChatPreciseBot extends Bot {
  static _id = "BingChatBot"; // ID of the bot, should be unique
  static _name = "bingChat.namePrecise"; // String of the bot's name, should be unique
  static _logoFilename = "bing-precise-logo.png"; // Place it in assets/bots/
  static _loginUrl = "https://www.bing.com/new";

  static _style = "h3precise"; // Bing styles: h3imaginative, harmonyv3, h3precise

  conversationContext = {
    clientId: "",
    conversationId: "",
    conversationSignature: "",
    invocationId: "",
  };

  constructor() {
    super();
  }

  async checkLoginStatus() {
    // Bing Chat does not have a login status API
    // So we just check if we can create a conversation

    const headers = {
      "x-ms-client-request-id": uuidv4(),
      "x-ms-useragent":
        "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32",
      "x-forwarded-for": randomIP(),
    };
    try {
      const response = await axios.get(
        "https://www.bing.com/turing/conversation/create",
        { headers }
      );
      if (response.data && response.data.result.value == "Success") {
        // Save the conversation context
        this.conversationContext = {
          clientId: response.data.clientId,
          conversationId: response.data.conversationId,
          conversationSignature: response.data.conversationSignature,
          invocationId: 0,
        };
        this.constructor._isLoggedIn = true;
      } else {
        console.error("Error checking Bing Chat login status:", response);
        this.constructor._isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error checking Bing Chat login status:", error);
      this.constructor._isLoggedIn = false;
    }
  }

  buildChatRequest(prompt) {
    return {
      arguments: [
        {
          source: "cib",
          optionsSets: [
            "nlu_direct_response_filter",
            "deepleo",
            "disable_emoji_spoken_text",
            "responsible_ai_policy_235",
            "enablemm",
            this.constructor._style,
            "responseos",
            "nourldedupe",
            "healthansgnd",
            "dv3sugg",
            "clgalileo",
            "gencontentv3",
          ],
          allowedMessageTypes: ["Chat", "InternalSearchQuery"],
          isStartOfSession: this.conversationContext.invocationId === 0,
          message: {
            timestamp: new Date().toISOString(),
            author: "user",
            inputMethod: "Keyboard",
            text: prompt,
            messageType: "Chat",
          },
          conversationSignature: this.conversationContext.conversationSignature,
          conversationId: this.conversationContext.conversationId,
          participant: { id: this.conversationContext.clientId },
        },
      ],
      invocationId: this.conversationContext.invocationId.toString(),
      target: "chat",
      type: 4,
    };
  }

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const RecordSeparator = String.fromCharCode(30);
    const wsp = new WebSocketAsPromised(
      "wss://sydney.bing.com/sydney/ChatHub",
      {
        packMessage: (data) => {
          return JSON.stringify(data) + RecordSeparator;
        },
        unpackMessage: (data) => {
          return data
            .toString()
            .split(RecordSeparator)
            .filter(Boolean)
            .map((d) => JSON.parse(d));
        },
      }
    );

    wsp.onUnpackedMessage.addListener((events) => {
      for (const event of events) {
        if (JSON.stringify(event) === "{}") {
          wsp.sendPacked({ type: 6 });
          wsp.sendPacked(this.buildChatRequest(prompt));
          this.conversationContext.invocationId += 1;
        } else if (event.type === 6) {
          wsp.sendPacked({ type: 6 });
        } else if (event.type === 3) {
          // onUpdateResponse(null, callbackParam);
          wsp.removeAllListeners();
          wsp.close();
        } else if (event.type === 1) {
          if (event.arguments[0].messages?.length > 0) {
            const response = event.arguments[0].messages[0].text;
            onUpdateResponse(response, callbackParam);
          }
        }
      }
    });

    wsp.onClose.addListener(() => {
      // onUpdateResponse(null, callbackParam);
    });

    await wsp.open();
    wsp.sendPacked({ protocol: "json", version: 1 });
  }
}
