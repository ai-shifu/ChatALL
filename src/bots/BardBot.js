import Bot from "./Bot";

export default class BardBot extends Bot {
  static _brandId = "BardBot";
  static _logoFilename = "bard-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "https://bard.google.com/";

  constructor() {
    super();
  }

  async checkLoginStatus() {}

  async sendPrompt(prompt) {
    prompt.trim();
    return new Promise((resolve) => {
      resolve(
        "I'm still learning languages, so at the moment I can't help you with this request. So far I've only been trained to understand the languages listed in the Bard Help Center."
      );
    });
  }
}
