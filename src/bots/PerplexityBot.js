import store from "@/store";
import Bot from "@/bots/Bot";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WebSocketAsPromised from "websocket-as-promised";

export default class PerplexityBot extends Bot {
  static _brandId = "perplexity";
  static _className = "PerplexityBot"; // Class name of the bot
  static _logoFilename = "perplexity-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true; // True if the main color of logo is dark
  static _loginUrl = "https://www.perplexity.ai";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;
    try {
      const response = await axios.get(
        "https://www.perplexity.ai/api/auth/session",
      );
      if (response?.data?.user) {
        available = true;
      }
    } catch (error) {
      console.error("Error PerplexityBot _checkAvailability", error);
    }
    return available;
  }

  /**
   * @typedef {{
   *   last_backend_uuid: string | undefined,
   *   read_write_token: string | undefined
   * }} ChatContext
   */
  /**
   * @typedef {{
   *   0: string,
   *   1: string,
   *   2: {
   *     version: string,
   *     source: string,
   *     read_write_token: string,
   *     attachments: any[],
   *     language: string,
   *     timezone: string,
   *     search_focus: string,
   *     frontend_uuid: string,
   *     mode: string,
   *     is_related_query: boolean,
   *     is_default_related_query: boolean,
   *     frontend_context_uuid: string,
   *     prompt_source: string,
   *     query_source: string
   *   }
   * }} Prompt
   */

  /**
   * @typedef {{
   *   status: string,
   *   uuid: string,
   *   read_write_token: string,
   *   frontend_context_uuid: string,
   *   text: string,
   *   final: boolean,
   *   backend_uuid: string,
   *   media_items: any[],
   *   widget_data: any[],
   *   knowledge_cards: any[],
   *   expect_search_results: string,
   *   mode: string,
   *   search_focus: string,
   *   gpt4: boolean,
   *   display_model: string,
   *   attachments: any[],
   *   personalized: boolean,
   *   step_type: string,
   *   query_str: string,
   *   related_queries: string[],
   *   context_uuid: string,
   *   thread_title: string,
   *   thread_access: number,
   *   thread_url_slug: string,
   *   author_username: string,
   *   author_image: string,
   *   s3_social_preview_url: string,
   *   updated_datetime: string,
   *   author_id: string,
   *   prompt_source: string,
   *   query_source: string
   * }} Completed
   */
  /**
   * @typedef {{
   *   status: string,
   *   uuid: string,
   *   read_write_token: null,
   *   frontend_context_uuid: string,
   *   text: string,
   *   final: boolean,
   *   backend_uuid: string,
   *   media_items: any[],
   *   widget_data: any[],
   *   knowledge_cards: any[],
   *   expect_search_results: string,
   *   mode: string,
   *   search_focus: string,
   *   gpt4: boolean,
   *   display_model: string,
   *   attachments: any[]
   * }} Completing
   */

  /**
   * @returns {ChatContext}
   */
  createChatContext() {
    return { last_backend_uuid: undefined, read_write_token: undefined };
  }

  separateNumberAndObject(input) {
    const regex = /^(\d+)(.*)/;
    const match = input.match(regex);
    if (match) {
      const number = parseInt(match[1]);
      try {
        const object = JSON.parse(match[2]);
        return { number, object };
      } catch (error) {
        return { number, object: match[2] };
      }
    } else {
      return { object: input };
    }
  }

  seq = 1;
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let sid;
    /** @type {{ last_backend_uuid: string | undefined, read_write_token: string | undefined }} */
    let context = await this.getChatContext();
    try {
      const response = await axios.get(
        `https://www.perplexity.ai/socket.io/?EIO=4&transport=polling&t=${this.t}`,
      );
      const data = this.separateNumberAndObject(response.data);
      sid = data.object?.sid;
    } catch (error) {
      console.error("Error PerplexityBot get", error);
      throw error;
    }

    try {
      await axios.post(
        `https://www.perplexity.ai/socket.io/?EIO=4&transport=polling&t=${this.t}&sid=${sid}`,
        `40${JSON.stringify({ jwt: "anonymous-ask-user" })}`,
      );
    } catch (error) {
      console.error("Error PerplexityBot post sid", error);
    }

    try {
      await axios.get(
        `https://www.perplexity.ai/socket.io/?EIO=4&transport=polling&t=${this.t}&sid=${sid}`,
      );
    } catch (error) {
      console.error("Error PerplexityBot get sid", error);
    }

    return new Promise((resolve, reject) => {
      try {
        const wsp = new WebSocketAsPromised(
          `wss://www.perplexity.ai/socket.io/?EIO=4&transport=polling&t=${this.t}&sid=${sid}`,
          {
            packMessage: (data) => {
              return `42${this.seq++}${JSON.stringify(data)}`;
            },
            unpackMessage: (data) => {
              return this.separateNumberAndObject(data);
            },
          },
        );

        wsp.onOpen.addListener(() => {
          wsp.send("2probe");
        });

        wsp.onMessage.addListener((data) =>
          console.log("PerplexityBot onMessage", data),
        );

        wsp.onSend.addListener((data) =>
          console.log("PerplexityBot onSend", data),
        );

        wsp.onUnpackedMessage.addListener(async (data) => {
          if (!data) {
            console.error("Error PerplexityBot onUnpackedMessage");
            return;
          }
          try {
            switch (Number(data.number)) {
              case 2:
                wsp.send("3");
                break;
              case 3:
                if (data.object === "probe") {
                  wsp.send("5");
                  /** @type {Prompt} */
                  const ask = [
                    "perplexity_ask",
                    prompt,
                    {
                      version: store.state.perplexity.version,
                      source: "default",
                      last_backend_uuid: context?.last_backend_uuid,
                      read_write_token: context?.read_write_token,
                      attachments: [],
                      language: "en-US",
                      timezone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                      search_focus: "internet",
                      frontend_uuid: uuidv4(),
                      mode: "concise",
                      is_related_query: false,
                      is_default_related_query: false,
                      frontend_context_uuid: uuidv4(),
                      prompt_source: "user",
                      query_source: context?.last_backend_uuid
                        ? "followup"
                        : "home",
                    },
                  ];
                  wsp.sendPacked(ask);
                }
                break;
              case 42:
                if (data?.object?.length >= 2) {
                  /** @type {Completing} */
                  const result = data.object[1];
                  try {
                    const response = JSON.parse(result.text);
                    if (response) {
                      onUpdateResponse(callbackParam, {
                        content: response.answer,
                      });
                    }
                  } catch (error) {
                    console.error(
                      "Error PerplexityBot onUnpackedMessage 42",
                      error,
                    );
                  }
                  /** @type {ChatContext} */
                  const context = {};
                  if (result.backend_uuid) {
                    context.last_backend_uuid = result.backend_uuid;
                  }
                  this.setChatContext(context);
                }
                break;
              default:
                if (String(data.number).toString().startsWith("43")) {
                  // end
                  if (data?.object?.length >= 1) {
                    /** @type {Completed} */
                    const result = data.object[0];
                    try {
                      const text = JSON.parse(result.text);
                      if (text) {
                        onUpdateResponse(callbackParam, {
                          content: text.answer,
                          done: true,
                        });
                      }
                    } catch (error) {
                      console.error(
                        "Error PerplexityBot onUnpackedMessage default",
                        error,
                      );
                    } finally {
                      wsp.removeAllListeners();
                      wsp.close();
                    }

                    /** @type {ChatContext} */
                    const context = {};
                    if (result.backend_uuid) {
                      context.last_backend_uuid = result.backend_uuid;
                    }
                    if (result.read_write_token) {
                      context.read_write_token = result.read_write_token;
                    }
                    this.setChatContext(context);
                  }
                  resolve();
                }
                break;
            }
          } catch (error) {
            reject(error);
          }
        });

        wsp.onError.addListener((event) => {
          wsp.removeAllListeners();
          wsp.close();
          reject(event);
        });

        wsp.onClose.addListener(() => {
          resolve();
          onUpdateResponse(callbackParam, { done: true });
        });

        wsp.open();
      } catch (error) {
        console.error("Error PerplexityBot _sendPrompt", error);
        reject(error);
      }
    });
  }

  static V =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
      "",
    );

  Z(e) {
    let t = "";
    do (t = PerplexityBot.V[e % 64] + t), (e = Math.floor(e / 64));
    while (e > 0);
    return t;
  }

  get t() {
    return this.Z(+new Date());
  }
}
