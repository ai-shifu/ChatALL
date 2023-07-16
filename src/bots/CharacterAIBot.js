import Bot from "@/bots/Bot";
import store from "@/store";
import AsyncLock from "async-lock";
import axios from "axios";

export default class CharacterAIBot extends Bot {
  static _brandId = "characterAI"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "CharacterAIBot"; // Class name of the bot
  static _logoFilename = "character-ai-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true;
  static _loginUrl = "https://character.ai/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  static _characterId = "YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8"; // Character Assistant id
  constructor() {
    super();
  }

  getAuthHeaders() {
    return {
      headers: {
        Authorization: `Token ${store.state.characterAI.token}`,
      },
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    try {
      this.constructor._isAvailable = false;

      if (!store.state.characterAI.token) {
        console.error("Error CharacterAIBot check login: token not found");
        return this.isAvailable();
      }

      if (new Date().getTime() >= store.state.characterAI?.ttl) {
        console.error("Error CharacterAIBot check login: token expired");
        return this.isAvailable();
      }

      const userInfoResponse = await axios.get(
        "https://beta.character.ai/chat/user/",
        this.getAuthHeaders(),
      );

      if (userInfoResponse.status !== 200) {
        console.error("Error CharacterAIBot check login:", userInfoResponse);
        return this.isAvailable();
      }

      if (userInfoResponse.data.user?.user?.username !== "ANONYMOUS") {
        this.constructor._isAvailable = true;
      }
    } catch (error) {
      console.error("Error CharacterAIBot check login:", error);
    }
    return this.isAvailable();
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
        const headers = {
          Accept: "*/*",
          "Content-Type": "application/json",
          ...this.getAuthHeaders().headers,
        };
        const payload = {
          history_external_id: context.history_external_id,
          character_external_id: this.constructor._characterId,
          text: prompt,
          tgt: context.tgt,
        };
        axios
          .post("https://beta.character.ai/chat/streaming/", payload, {
            headers: headers,
            onDownloadProgress: (progressEvent) => {
              this.onResponseDownloadProgress(
                progressEvent,
                onUpdateResponse,
                callbackParam,
                reject,
              );
            },
          })
          .then((response) => {
            if (response.status === 200) {
              resolve();
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  text = "";
  onResponseDownloadProgress(
    progressEvent,
    onUpdateResponse,
    callbackParam,
    reject,
  ) {
    try {
      const responses = progressEvent?.event?.currentTarget?.response
        ?.split("\n") // split with new line
        ?.filter((n) => n); //  filter empty string in array

      // take last response item only
      const lastResponse = JSON.parse(responses[responses.length - 1]);
      if (Array.isArray(lastResponse.replies) && lastResponse.replies.length) {
        this.text = lastResponse.replies[0].text;
        onUpdateResponse(callbackParam, {
          content: lastResponse.replies[0].text,
          done: lastResponse.is_final_chunk,
        });
      } else {
        // handle exception
        // {"abort": true, "error": "No eligible candidates", "last_user_msg_id": 123, "last_user_msg_uuid": "1111-uuid"}
        onUpdateResponse(callbackParam, {
          content: `${this.text}\n${this.wrapCollapsedSection(
            JSON.stringify(lastResponse),
          )}`,
          done: true,
        });
      }
    } catch (error) {
      reject(error);
      console.error("Error CharacterAIBot onChatDownloadProgress", error);
    }
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    let context = null;
    let characterInfoResponse = await axios.post(
      "https://beta.character.ai/chat/character/info/",
      { external_id: this.constructor._characterId },
      this.getAuthHeaders(),
    );

    if (characterInfoResponse.status !== 200) {
      console.error(
        "CharacterAIBot characterInfoResponse",
        characterInfoResponse,
      );
      throw new Error(characterInfoResponse);
    }

    let chatContinueResponse;
    try {
      chatContinueResponse = await axios.post(
        "https://beta.character.ai/chat/history/continue/",
        {
          character_external_id: this.constructor._characterId,
          history_external_id: null,
        },
        this.getAuthHeaders(),
      );
    } catch (error) {
      if (
        error.response.status === 404 &&
        error.response.data === "there is no history between user and character"
      ) {
        // no history, create
        chatContinueResponse = await axios
          .post(
            "https://beta.character.ai/chat/history/create/",
            {
              character_external_id: this.constructor._characterId,
            },
            this.getAuthHeaders(),
          )
          .catch((error) => {
            console.error("CharacterAIBot chatCreateResponse", error);
            throw Error(error);
          });
      } else {
        console.error("CharacterAIBot chatContinueResponse", error);
        throw Error(error);
      }
    }

    context = {
      history_external_id: chatContinueResponse?.data?.external_id,
      tgt: characterInfoResponse?.data?.character?.participant__user__username,
    };

    return context;
  }
}
