import Bot from "./Bot";

export default class ChatGPTBot extends Bot {
  static _id = "ChatGPTBot"; // ID of the bot, should be unique
  static _name = "bot.ChatGPT"; // String of the bot's name, should be unique
  static _logoFilename = "chatgpt-logo.svg";

  constructor() {
    super();
  }

  async sendPrompt(prompt) {
    // 实现发送 prompt 的逻辑，以下仅为示例
    const response = await fetch(
      `https://example.com/api/chat?prompt=${encodeURIComponent(prompt)}`
    );
    const data = await response.json();
    return data.response;
  }
}
