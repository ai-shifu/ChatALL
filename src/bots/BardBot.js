import axios from "axios";
import Bot from "./Bot";
import AsyncLock from "async-lock";

function extractFromHTML(variableName, html) {
  const regex = new RegExp(`"${variableName}":"([^"]+)"`);
  const match = regex.exec(html);
  return match?.[1];
}

async function fetchRequestParams() {
  const { data: html } = await axios.get("https://bard.google.com/faq");
  const atValue = extractFromHTML("SNlM0e", html);
  const blValue = extractFromHTML("cfb2h", html);
  return { atValue, blValue };
}

function parseBartResponse(resp) {
  const data = JSON.parse(resp.split("\n")[3]);
  const payload = JSON.parse(data[0][2]);
  if (!payload) {
    throw new Error("Failed to access Bard");
  }
  const text = payload[0][0];
  return {
    text,
    ids: [...payload[1], payload[4][0][0]],
  };
}

export default class BardBot extends Bot {
  static _brandId = "bard";
  static _className = "BardBot"; // Class name of the bot
  static _logoFilename = "bard-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://bard.google.com/";
  static _lock = new AsyncLock();

  conversationContext = {
    requestParams: null,
    contextIds: ["", "", ""],
  };

  constructor() {
    super();
  }

  async checkAvailability() {
    this.conversationContext.requestParams = await fetchRequestParams();
    if (this.conversationContext.requestParams.atValue) {
      this.constructor._isAvailable = true;
    } else {
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return new Promise((resolve, reject) => {
      const { requestParams, contextIds } = this.conversationContext;

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
          const { text, ids } = parseBartResponse(resp);
          this.conversationContext.contextIds = ids;
          onUpdateResponse(callbackParam, { content: text, done: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
