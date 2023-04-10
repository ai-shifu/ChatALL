export default class Bot {
  static _instance;

  constructor() {
    if (this.constructor._instance) {
      return this.constructor._instance;
    }
    this.constructor._instance = this;
  }

  static getInstance() {
    return new this();
  }

  getIcon() {
    throw new Error("Method 'getIcon()' must be implemented.");
  }

  getName(lang = "en") {
    throw new Error("Method 'getName()' must be implemented.");
  }

  getConfigComponent() {
    throw new Error("Method 'getConfigComponent()' must be implemented.");
  }

  async sendPrompt(prompt) {
    throw new Error("Method 'sendPrompt()' must be implemented.");
  }
}
