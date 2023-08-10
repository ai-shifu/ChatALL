import Bot from "@/bots/Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WebSocketAsPromised from "websocket-as-promised";
import i18n from "@/i18n";

export default class BingChatBot extends Bot {
  static _brandId = "bingChat";
  static _className = "BingChatBot"; // Class name of the bot
  static _model = "h3precise"; // Bing styles: h3imaginative, harmonyv3, h3precise
  static _logoFilename = "bing-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://www.bing.com/new";
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.48";

  static _optionsSets = null; // Set by the subclass
  static _tone = ""; // Set by the subclass

  constructor() {
    super();
  }

  async createChatContext() {
    const headers = {
      "x-ms-client-request-id": uuidv4(),
      "x-ms-useragent":
        "azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/MacIntel",
    };
    let conversation = null;

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
      throw new Error(
        i18n.global.t("bot.failedToCreateConversation") + " " + response.data,
      );
    }

    return conversation;
  }

  async checkAvailability() {
    await axios
      .get("https://www.bing.com/turing/conversation/chats")
      .then((response) => {
        this.constructor._isAvailable =
          response.data?.result?.value == "Success";

        // If login user is changed, clear the chat context
        const context = this.getChatContext(false);
        if (response.data?.clientId != context?.clientId) {
          this.setChatContext(null);
        }
      })
      .catch((error) => {
        this.constructor._isAvailable = false;
        console.error("Error checking Bing Chat login status:", error);
      });
    return this.isAvailable();
  }

  async makePromptRequest(prompt) {
    const context = await this.getChatContext();
    const uuid = uuidv4();
    return {
      arguments: [
        {
          source: "cib",
          optionsSets: this.constructor._optionsSets,
          allowedMessageTypes: ["Chat", "InternalSearchQuery"],
          sliceIds: [
            "winmuid2tf",
            "tnaenableux",
            "adssqovr",
            "tnaenable",
            "upselltr2",
            "gaincrrev2",
            "anssupfo",
            "tempcacheread",
            "temptacache",
            "oldmmadesign-prod",
            "winstmsg2tf",
            "724mtcls",
            "713savemems0",
            "727nrprdrss0",
            "207hlthgrds0",
          ],
          isStartOfSession: context.invocationId === 0,
          message: {
            timestamp: new Date().toISOString(),
            author: "user",
            inputMethod: "Keyboard",
            text: prompt,
            messageType: "Chat",
            requestId: uuid,
            messageId: uuid,
          },
          tone: this.constructor._tone,
          requestId: uuid,
          conversationSignature: context.conversationSignature,
          participant: { id: context.clientId },
          conversationId: context.conversationId,
        },
      ],
      invocationId: context.invocationId.toString(),
      target: "chat",
      type: 4,
    };
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let context = await this.getChatContext();
    return new Promise((resolve, reject) => {
      try {
        const seperator = String.fromCharCode(30);
        const wsp = new WebSocketAsPromised(
          "wss://sydney.bing.com/sydney/ChatHub",
          {
            packMessage: (data) => {
              return JSON.stringify(data) + seperator;
            },
            unpackMessage: (data) => {
              return data
                .toString()
                .split(seperator)
                .filter(Boolean)
                .map((r) => JSON.parse(r));
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
          try {
            for (const event of events) {
              if (JSON.stringify(event) === "{}") {
                wsp.sendPacked({ type: 6 });
                wsp.sendPacked(await this.makePromptRequest(prompt));
                context.invocationId += 1;
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
                    context = await this.createChatContext();
                    this.setChatContext(context);
                    this._sendPrompt(prompt, onUpdateResponse, callbackParam);
                    reject(
                      new Error(i18n.global.t("bot.creatingConversation")),
                    );
                  } else if (event.item.result.value === "Throttled") {
                    if (await this.isAnonymous(context.clientId)) {
                      const url = this.getLoginUrl();
                      onUpdateResponse(callbackParam, {
                        content: i18n.global.t("bingChat.loginToContinue", {
                          attributes: `href="${url}" title="${url}" target="innerWindow"`,
                        }),
                        format: "html",
                        done: false,
                      });
                      this.setChatContext(null);
                    } else {
                      reject(new Error(event.item.result.message));
                    }
                  } else if (event.item.result.value === "CaptchaChallenge") {
                    const url = "https://www.bing.com/turing/captcha/challenge";
                    onUpdateResponse(callbackParam, {
                      content: i18n.global.t("bingChat.solveCaptcha", {
                        attributes: `href="${url}" title="${url}" target="innerWindow"`,
                      }),
                      format: "html",
                      done: false,
                    });
                  } else {
                    reject(
                      new Error(
                        `${event.item.result.message} (${event.item.result.value})`,
                      ),
                    );
                  }
                } else if (
                  event.item.throttling.maxNumUserMessagesInConversation ===
                  event.item.throttling.numUserMessagesInConversation
                ) {
                  // Max number of messages reached
                  context = await this.createChatContext();
                  this.setChatContext(context);
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
              } else if (event.type === 7) {
                wsp.removeAllListeners();
                wsp.close();
                reject(new Error(event.error));
              } else {
                console.warn("Unknown Bing Chat response:", event);
              }
            }
          } catch (error) {
            reject(error);
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

        wsp.onClose.addListener(() => {
          onUpdateResponse(callbackParam, { done: true });
        });

        wsp.open();
      } catch (error) {
        reject(error);
      }
    });
  }

  async isAnonymous(clientId) {
    return clientId.length > 30; // TODO: find a better way to check if anonymous
  }
}
