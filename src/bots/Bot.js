// To get actual logo path of the bot, we need to use Webpack 4's require.context()
// to get the context of the logo files, and then use the context to get the actual
// path of the logo file.
const botLogoContext = require.context(
  "../assets/bots/",
  false,
  /\.(png|jpg|jpeg|svg)$/
);

export default class Bot {
  static _instance;
  static _logoPackedPaths = null;
  static _isLoggedIn = false;

  static _id = "Bot"; // ID of the bot, should be unique
  static _name = "bot.nullBot"; // String of the bot's name, should be unique
  static _logoFilename = "default-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "undefined";

  constructor() {
    // Compute the logo paths after packing by Webpack 4
    if (!this.constructor._logoPackedPaths) {
      this.constructor._logoPackedPaths = botLogoContext
        .keys()
        .reduce((logos, logoPath) => {
          logos[logoPath.replace("./", "")] = botLogoContext(logoPath);
          return logos;
        }, {});
    }

    if (this.constructor._instance) {
      return this.constructor._instance;
    }
    this.constructor._instance = this;

    this.checkLoginStatus();
  }

  static getInstance() {
    return new this();
  }

  getLogo() {
    return this.constructor._logoPackedPaths[this.constructor._logoFilename];
  }

  getId() {
    return this.constructor._id;
  }

  getDisplayName() {
    return this.constructor._name;
  }

  getSettingsComponent() {
    return `${this.constructor._id}Settings`;
  }

  getLoginUrl() {
    return this.constructor._loginUrl;
  }

  isSelected() {
    return this.constructor._isSelected;
  }

  isLoggedIn() {
    return this.constructor._isLoggedIn;
  }

  async sendPrompt(prompt) {
    prompt.trim();
    throw new Error("Method 'sendPrompt()' must be implemented.");
  }

  async checkLoginStatus() {
    throw new Error("Method 'checkLoginStatus()' must be implemented.");
  }
}
