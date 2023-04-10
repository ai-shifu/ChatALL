import Bot from "./Bot";
import ChatGPTBotConfig from "../components/ChatGPTBotConfig.vue";

export default class ChatGPTBot extends Bot {
  constructor() {
    super();
    if (this.constructor._instance) {
      return this.constructor._instance;
    }
    this.constructor._instance = this;
  }

  getIcon() {
    return "chat-gpt-icon.svg";
  }

  getName(lang = "en") {
    return lang === "en" ? "ChatGPT" : "聊天GPT";
  }

  getConfigComponent() {
    return ChatGPTBotConfig;
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
