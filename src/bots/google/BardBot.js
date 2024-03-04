import axios from "axios";
import Bot from "../Bot";
import AsyncLock from "async-lock";

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

function generateReq(model, prompt, contextIds) {
  let modelNumber = model == "gemini-ultra" ? 2 : 1;
  // The JSON is ugly and meaningless, but it works
  let innerJSON = [
    [prompt, 0, null, null, null, null, 0],
    ["en"],
    contextIds,
    "",
    "",
    null,
    [1],
    0,
    null,
    null,
    1,
    0,
    null,
    null,
    null,
    null,
    null,
    null,
    modelNumber,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [],
  ];
  return JSON.stringify([null, JSON.stringify(innerJSON)]);
}

export default class BardBot extends Bot {
  static _brandId = "bard";
  static _className = "BardBot"; // Class name of the bot
  static _model = "gemini-pro"; // gemini-pro or gemini-ultra
  static _logoFilename = "gemini-chat-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://gemini.google.com/";
  // Remove Electron from the user agent to avoid blank login screen
  static _userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) chatall/1.29.40 Chrome/114.0.5735.134 Safari/537.36";
  static _lock = new AsyncLock();

  constructor() {
    super();
  }

  async _checkAvailability() {
    const context = await this.getChatContext();
    let available = false;

    if (context.requestParams.atValue) {
      available = true;
    }

    return available;
  }

  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    return new Promise((resolve, reject) => {
      const { requestParams, contextIds } = context;

      axios
        .post(
          "https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate",
          new URLSearchParams({
            at: requestParams.atValue,
            "f.req": generateReq(this.constructor._model, prompt, contextIds),
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
          this.setChatContext(context);
          onUpdateResponse(callbackParam, { content: text, done: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createChatContext() {
    const resp = await axios.get("https://gemini.google.com/app");
    const atValue = resp.data.match(/"SNlM0e":"([^"]+)"/)?.[1];
    const blValue = resp.data.match(/"cfb2h":"([^"]+)"/)?.[1];
    if (!atValue || !blValue) {
      throw new Error("Failed to fetch Bard at/bl values");
    }

    return {
      requestParams: { atValue, blValue },
      contextIds: ["", "", ""],
    };
  }
}
