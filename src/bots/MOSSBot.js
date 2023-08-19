import WebSocketAsPromised from "websocket-as-promised";
import axios from "axios";
import AsyncLock from "async-lock";

import Bot from "./Bot";
import store from "@/store";
import i18n from "@/i18n";

export default class MOSSBot extends Bot {
  static _brandId = "moss";
  static _className = "MOSSBot";
  static _logoFilename = "moss-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://moss.fastnlp.top/moss/";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }

  getAuthHeader() {
    const token = store.state.moss?.token?.refresh;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async createChatContext() {
    try {
      const res = await axios.post(
        "https://moss.fastnlp.top/api/chats",
        {},
        this.getAuthHeader(),
      );
      return res.data.id;
    } catch (err) {
      console.error("Error creating conversation:", err);
      throw new Error(
        i18n.global.t("bot.failedToCreateConversation") + "\n" + err.message,
      );
    }
  }

  async _checkAvailability() {
    const token = store.state.moss?.token?.refresh;
    let available = false;

    if (token) {
      await axios
        .get("https://moss.fastnlp.top/api/users/me", this.getAuthHeader())
        .then(() => {
          available = true;
        });
    }

    return available;
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const chat_id = await this.getChatContext();
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          if (chat_id === 0) {
            reject(new Error(i18n.global.t("bot.failedToCreateConversation")));
          }

          const url = `wss://moss.fastnlp.top/api/ws/chats/${chat_id}/records?jwt=${
            this.getAuthHeader().headers.Authorization.split(" ")[1]
          }`;

          const wsp = new WebSocketAsPromised(url, {
            packMessage: (data) => {
              return JSON.stringify(data);
            },
            unpackMessage: (data) => {
              return JSON.parse(data);
            },
          });

          wsp.onOpen.addListener(() => {
            wsp.sendPacked({ request: prompt });
          });

          let beginning = "";
          let body = "";
          let ending = "";
          wsp.onUnpackedMessage.addListener(async (event) => {
            if (!("status" in event)) {
              // The last message. Parse links first
              const links = event.processed_extra_data?.[0]?.data;
              for (const key in links) {
                if (Object.hasOwnProperty.call(links, key)) {
                  const link = links[key];
                  ending += `> ${key}. [${link.title}](${link.url})\n`;
                }
              }

              onUpdateResponse(callbackParam, {
                content: `${beginning}\n${body}\n${ending}`,
                done: true,
              });
              wsp.removeAllListeners();
              wsp.close();
              resolve();
              return;
            } else if (event.status === 1) {
              body = event.output;
            } else if (event.status === 3) {
              if (event.stage === "start") {
                beginning += `> ${event.type} ${event.output}\n`;
              }
            } else if (event.status === -1) {
              wsp.removeAllListeners();
              wsp.close();
              reject(new Error(`${event.status_code} ${event.output}`));
              return;
            }
            onUpdateResponse(callbackParam, {
              content: `${beginning}\n${body}\n${ending}`,
              done: false,
            });
          });

          wsp.onError.addListener((event) => {
            wsp.removeAllListeners();
            wsp.close();
            reject(
              i18n.global.t("error.failedConnectUrl", {
                url: event.target.url,
              }),
            );
          });

          wsp.open();
        } catch (err) {
          reject(err);
        }
      })();
    });
  }
}
