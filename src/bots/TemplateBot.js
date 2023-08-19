import AsyncLock from "async-lock";
import Bot from "@/bots/Bot";

export default class YourAIBot extends Bot {
  static _brandId = "yourAi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "YourAIBot"; // Class name of the bot
  static _logoFilename = "default-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://example.com/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    // Check:
    // 1. Whether the bot is logged in as needed
    // 2. Whether the bot settings are correct (e.g. API key is valid)
    // If yes:
    //   return true;
    // else:
    //   return false;

    return true; // For simplicity, default to true
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    return new Promise((resolve, reject) => {
      // Send the prompt to the bot and call onUpdateResponse() when the response is ready
      // onUpdateResponse(callbackParam, {content, done})
      //   callbackParam: Just pass it to onUpdateResponse() as is
      //   Object.content: Response text from the bot, even if it's not fully complete
      //   Object.done: true if the response is completed, false otherwise
      //
      // When everything is done, call resolve()
      // If there is an error, call reject(error)

      try {
        onUpdateResponse(callbackParam, {
          content: "Hello, world!",
          done: true,
        });
        resolve();
      } catch (error) {
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
    return null;
  }
}
