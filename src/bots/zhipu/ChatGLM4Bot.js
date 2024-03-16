import ChatGLMBot from "./ChatGLMBot";
import { SSE } from "sse.js";

export default class ChatGLM4Bot extends ChatGLMBot {
  static _brandId = "chatGlm"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ChatGLM4Bot"; // Class name of the bot
  static _logoFilename = "chatglm-4-logo.png"; // Place it in public/bots/
  static _model = "GLM-4"; // Model name

  constructor() {
    super();
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    let context = await this.getChatContext();
    if (context.user_id == null || context.user_id == undefined) {
      await this._checkAvailability();
      context = await this.getChatContext();
    }

    return new Promise((resolve, reject) => {
      try {
        const headers = this.getAuthHeader().headers;
        headers.accept = "text/event-stream";
        headers["Content-Type"] = "application/json";

        const source = new SSE(
          "https://chatglm.cn/chatglm/backend-api/assistant/stream",
          {
            headers,
            payload: JSON.stringify({
              assistant_id: "65940acff94777010aa6b796",
              conversation_id: context.conversation_id || "",
              meta_data: {
                is_test: false,
                input_question_type: "xxxx",
                channel: "",
                draft_id: "",
              },
              messages: [
                { role: "user", content: [{ type: "text", text: prompt }] },
              ],
            }),
            withCredentials: true,
          },
        );

        let beginning = "";
        source.addEventListener("message", (event) => {
          let body = "";
          let ending = "";
          let data = JSON.parse(event.data);

          if (!context.conversation_id && data.conversation_id) {
            context.conversation_id = data.conversation_id;
            this.setChatContext(context);
          }

          const response = data.parts?.[0];
          if (!response || response.role !== "assistant") return;
          const content = response.content[0];
          if (!content) return;

          // Parse search tool calls
          if (content.type === "tool_calls" && response.status === "init") {
            if (content.tool_calls.name === "browser") {
              const info = content.tool_calls.arguments;
              if (info.startsWith("search")) {
                beginning += `> ${info}\n`;
              }
            }
          } else if (content.type === "text") {
            body = content.text;
            response.meta_data?.citations?.forEach((citation) => {
              ending += `> 1. [${citation.metadata.title}](${citation.metadata.url})\n`;
            });
          }

          const done = data.status === "finish";
          onUpdateResponse(callbackParam, {
            content: `${beginning}\n${body}\n${ending}`,
            done,
          });
          done && resolve();
        });
        source.stream();
      } catch (err) {
        reject(err);
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
    return { conversation_id: "" };
  }
}
