import axios from "axios";
import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT4BotMobile extends ChatGPTBot {
  static _className = "ChatGPT4Bot-mobile"; // Class name of the bot
  static _logoFilename = "chatgpt-4-mobile-logo.png"; // Place it in assets/bots/
  static _model = "gpt-4-mobile";

  constructor() {
    super();
  }

  async checkAvailability() {
    const isAvailable = await super.checkAvailability();
    if (isAvailable) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        };
        const response = await axios.get(
          "https://chat.openai.com/backend-api/accounts/check",
          { headers },
        );
        const isPaidSubscriptionActive =
          response.data.account_plan.is_paid_subscription_active;
        this.constructor._isAvailable = isPaidSubscriptionActive;
      } catch (error) {
        console.error("Error fetching paid status:", error);
        this.constructor._isAvailable = false;
      }
    } else {
      this.constructor._isAvailable = false;
    }
    return this.isAvailable();
  }
}
