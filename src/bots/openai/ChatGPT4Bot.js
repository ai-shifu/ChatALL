import axios from "axios";
import ChatGPTBot from "./ChatGPTBot";

export default class ChatGPT4Bot extends ChatGPTBot {
  static _className = "ChatGPT4Bot"; // Class name of the bot
  static _logoFilename = "chatgpt-4-logo.png"; // Place it in public/bots/
  static _model = "gpt-4";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = await super._checkAvailability();

    if (available) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        };
        const response = await axios.get(
          "https://chatgpt.com/backend-api/accounts/check",
          { headers },
        );
        const isPaidSubscriptionActive =
          response.data.account_plan.is_paid_subscription_active;
        available = isPaidSubscriptionActive;
      } catch (error) {
        console.error("Error fetching paid status:", error);
        available = false;
      }
    }

    return available;
  }
}
