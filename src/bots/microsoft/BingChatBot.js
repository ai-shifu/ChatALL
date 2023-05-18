import Bot from "@/bots/Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WebSocketAsPromised from "websocket-as-promised";
import i18n from "@/i18n";

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
export default class BingChatBot extends Bot {
  static _brandId = "bingChat";
  static _className = "BingChatBot"; // Class name of the bot
  static _model = "h3precise"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _logoFilename = "bing-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://www.bing.com/new";
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.48";

  static _conversation = null;
  static _optionsSets = null;

  constructor() {
    super();
  }

  async createConversation() {
    const headers = {
      "x-ms-client-request-id": uuidv4(),
      "x-ms-useragent":
        "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/Win32",
      "x-forwarded-for": randomIP(),
    };
    var conversation = null;

    try {
      const response = await axios.get(
        "https://www.bing.com/turing/conversation/create",
        { headers },
      );
      if (response.data && response.data.result.value == "Success") {
        // Save the conversation context
        conversation = {
          clientId: response.data.clientId,
          conversationId: response.data.conversationId,
          conversationSignature: response.data.conversationSignature,
          invocationId: 0,
        };
      } else {
        console.error("Error creating Bing Chat conversation:", response);
      }
    } catch (error) {
      console.error("Error creating Bing Chat conversation:", error);
    }

    return conversation;
  }

  async checkAvailability() {
    // Bing Chat does not have a login status API
    // So we just check if we can create a conversation
    const conversation = await this.createConversation();
    this.constructor._isAvailable = !!conversation;
    if (this.constructor._conversation === null) {
      this.constructor._conversation = conversation;
    }
    return this.isAvailable();
  }

  buildChatRequest(prompt) {
    return {
      arguments: [
        {
          source: "cib",
          optionsSets: this.constructor._optionsSets,
          allowedMessageTypes: ["Chat", "InternalSearchQuery"],
          isStartOfSession: this.constructor._conversation.invocationId === 0,
          message: {
            timestamp: new Date().toISOString(),
            author: "user",
            inputMethod: "Keyboard",
            text: prompt,
            messageType: "Chat",
          },
          conversationSignature:
            this.constructor._conversation.conversationSignature,
          conversationId: this.constructor._conversation.conversationId,
          participant: { id: this.constructor._conversation.clientId },
        },
      ],
      invocationId: this.constructor._conversation.invocationId.toString(),
      target: "chat",
      type: 4,
    };
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return new Promise((resolve, reject) => {
      try {
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
          },
        );

        wsp.onOpen.addListener(() => {
          wsp.sendPacked({ protocol: "json", version: 1 });
        });

        let beginning = "";
        let body = "";
        let ending = "";
        wsp.onUnpackedMessage.addListener(async (events) => {
          for (const event of events) {
            if (JSON.stringify(event) === "{}") {
              wsp.sendPacked({ type: 6 });
              wsp.sendPacked(this.buildChatRequest(prompt));
              this.constructor._conversation.invocationId += 1;
            } else if (event.type === 6) {
              wsp.sendPacked({ type: 6 });
            } else if (event.type === 3) {
              onUpdateResponse(callbackParam, { done: true });
              wsp.removeAllListeners();
              wsp.close();
              resolve();
            } else if (event.type === 2) {
              if (event.item.result.value !== "Success") {
                console.error("Error sending prompt to Bing Chat:", event);
                if (event.item.result.value === "InvalidSession") {
                  // Create a new conversation and retry
                  this.constructor._conversation =
                    await this.createConversation();
                  this._sendPrompt(prompt, onUpdateResponse, callbackParam);
                  reject(new Error(i18n.global.t("bot.creatingConversation")));
                } else {
                  reject(new Error(event.item.result.message));
                }
              } else if (
                event.item.throttling.maxNumUserMessagesInConversation ===
                event.item.throttling.numUserMessagesInConversation
              ) {
                // Max number of messages reached
                this.constructor._conversation =
                  await this.createConversation();
              }
              wsp.removeAllListeners();
              wsp.close();
              resolve();
            } else if (event.type === 1) {
              // Content response
              if (event.arguments[0].messages?.length > 0) {
                const message = event.arguments[0].messages[0];
                if (message.messageType === "InternalSearchQuery") {
                  beginning += "> " + message.text + "\n";
                } else {
                  body = message.adaptiveCards[0]?.body[0]?.text;
                  const moreLinks = message.adaptiveCards[0]?.body[1]?.text;
                  if (moreLinks !== undefined) {
                    ending = `> ${moreLinks}`;
                  }
                }
                onUpdateResponse(callbackParam, {
                  content: `${beginning}\n${body}\n${ending}`,
                  done: false,
                });
              }
            }
          }
        });

        wsp.onError.addListener((event) => {
          wsp.removeAllListeners();
          wsp.close();
          reject(
            new Error(
              i18n.global.t("error.failedConnectUrl", {
                url: event.target.url,
              }),
            ),
          );
        });

        wsp.open();
      } catch (error) {
        reject(error);
      }
    });
  }
}
