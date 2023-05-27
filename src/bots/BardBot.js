import axios from "axios";
import Bot from "./Bot";
import AsyncLock from "async-lock";

async function fetchRequestParams() {
  const resp = await axios.get("https://bard.google.com/faq");
  const atValue = resp.data.match(/"SNlM0e":"([^"]+)"/)?.[1];
  const blValue = resp.data.match(/"cfb2h":"([^"]+)"/)?.[1];
  if (!atValue || !blValue) {
    throw new Error("Failed to fetch Bard at/bl values");
  }
  return { atValue, blValue };
}

function parseResponse(resp) {
  let data = JSON.parse(resp.split("\n")[3]);
  data = JSON.parse(data[0][2]);
  if (!data) {
    throw new Error("Failed to parse Bard response");
  }

  const ids = [...data[1], data[4][0][0]];

  let text = data[4][0][1][0];
  const images = data[4][0][4];
  if (images) {
    images.forEach((image) => {
      const url = image[0][0][0];
      const alt = image[0][4];
      const link = image[1][0][0];
      const placeholder = image[2];
      text = text.replace(
        placeholder,
        `[![${alt}](${url})](${link} "${link}")`,
      );
    });
  }

  return { text, ids };
}

export default class BardBot extends Bot {
  static _brandId = "bard";
  static _className = "BardBot"; // Class name of the bot
  static _logoFilename = "bard-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://bard.google.com/";
  // Remove Electron from the user agent to avoid blank login screen
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) ChatALL/1.18.13 Chrome/112.0.5615.165 Safari/537.36";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }

  async checkAvailability() {
    const context = await this.getChatContext();
    context.requestParams = await fetchRequestParams();
    if (context.requestParams.atValue) {
      this.constructor._isAvailable = true;
    } else {
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    return new Promise((resolve, reject) => {
      const { requestParams, contextIds } = context;

      axios
        .post(
          "https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
          new URLSearchParams({
            at: requestParams.atValue,
            "f.req": JSON.stringify([
              null,
              `[[${JSON.stringify(prompt)}],null,${JSON.stringify(
                contextIds,
              )}]`,
            ]),
          }),
          {
            params: {
              bl: requestParams.blValue,
              _reqid: Math.floor(Math.random() * 900000) + 100000,
              rt: "c",
            },
          },
        )
        .then(({ data: resp }) => {
          const { text, ids } = parseResponse(resp);
          context.contextIds = ids;
          onUpdateResponse(callbackParam, { content: text, done: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createChatContext() {
    return {
      requestParams: null,
      contextIds: ["", "", ""],
    };
  }
}
