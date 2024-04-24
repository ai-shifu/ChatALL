import Bot from "@/bots/Bot";
import store from "@/store";
import AsyncLock from "async-lock";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import WebSocketAsPromised from "websocket-as-promised";

export default class CharacterAIBot extends Bot {
  static _brandId = "characterAI"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "CharacterAIBot"; // Class name of the bot
  static _logoFilename = "character-ai-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true;
  static _loginUrl = "https://character.ai/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests
  static _loginScript = "document.getElementsByTagName('a')[0].click();";

  get requestId() {
    return uuidv4().split("-").fill("vhj9cXafWcF8", 4, 5).join("-");
  }

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    try {
      if (
        store.state.characterAI.id &&
        store.state.characterAI.username &&
        store.state.characterAI.version
      ) {
        available = true;
      } else {
        const response = await axios.get(
          `https://character.ai/_next/data/${store.state.characterAI.version}/chat/${store.state.characterAI.characterId}.json?character=${store.state.characterAI.characterId}`,
          {
            headers: {
              "x-nextjs-data": 1,
            },
          },
        );
        if (response?.data?.pageProps?.user?.user) {
          store.commit("setCharacterAI", {
            id: response.data.pageProps.user.user?.id,
            username: response.data.pageProps.user.user?.username,
          });
          available = true;
        }
      }
    } catch (error) {
      console.error("Error CharacterAIBot check login:", error);
    }
    return available;
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    return new Promise((resolve, reject) => {
      try {
        const url = "wss://neo.character.ai/ws/";
        const wsp = new WebSocketAsPromised(url, {
          packMessage: (data) => JSON.stringify(data),
          unpackMessage: (data) => JSON.parse(data),
        });
        wsp.onUnpackedMessage.addListener(async (data) => {
          try {
            if (data.command === "neo_error" || data.error_code) {
              throw new Error(JSON.stringify(data));
            }
            if (data?.turn) {
              if (data.turn.author?.author_id !== context.characterId) {
                return;
              }
              if (data.turn.candidates?.length) {
                onUpdateResponse(callbackParam, {
                  content: data.turn.candidates
                    .map((candidate) => candidate.raw_content)
                    .join(`\n---\n`),
                });
              }
              if (
                data.turn.candidates?.every((candidate) => candidate.is_final)
              ) {
                onUpdateResponse(callbackParam, {
                  done: true,
                });
                wsp.removeAllListeners();
                wsp.close();
                resolve();
              }
            }
          } catch (error) {
            console.error("Error CharacterAIBot onUnpackedMessage:", error);
            wsp.removeAllListeners();
            wsp.close();
            reject(error);
          }
        });

        wsp.onError.addListener((event) => {
          wsp.removeAllListeners();
          wsp.close();
          reject(new Error(JSON.stringify(event)));
        });

        wsp.onClose.addListener(() => {
          onUpdateResponse(callbackParam, { done: true });
          resolve();
        });

        wsp.open().then(() => {
          if (context.isFirstMessage) {
            this.setChatContext({
              ...context,
              isFirstMessage: false,
            });
            store.commit("setCharacterAI", {
              isFirstMessage: false,
            });
            wsp.sendPacked({
              command: "create_chat",
              request_id: this.requestId,
              payload: {
                chat: {
                  chat_id: context.chatId,
                  creator_id: context.id,
                  visibility: "VISIBILITY_PRIVATE",
                  character_id: context.characterId,
                  type: "TYPE_ONE_ON_ONE",
                },
                with_greeting: false,
              },
              origin_id: "web-next",
            });
          }
          const turnId = uuidv4();
          wsp.sendPacked({
            command: "create_and_generate_turn",
            request_id: this.requestId,
            payload: {
              num_candidates: 1,
              tts_enabled: false,
              selected_language: "",
              character_id: context.characterId,
              user_name: context.username,
              turn: {
                turn_key: {
                  turn_id: turnId,
                  chat_id: context.chatId,
                },
                author: {
                  author_id: context.id,
                  is_human: true,
                  name: context.username,
                },
                candidates: [
                  {
                    candidate_id: turnId,
                    raw_content: prompt,
                  },
                ],
                primary_candidate_id: turnId,
              },
            },
            origin_id: "web-next",
          });
        });
      } catch (error) {
        console.error("Error CharacterAIBot _sendPrompt", error);
        reject(error);
      }
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    let context = null;
    context = {
      chatId: uuidv4(),
      isFirstMessage: true,
      characterId: store.state.characterAI.characterId,
      username: store.state.characterAI.username,
      id: store.state.characterAI.id.toString(),
    };
    return context;
  }
}
