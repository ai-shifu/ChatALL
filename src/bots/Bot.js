import i18n from "@/i18n";

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

  static _brandId = "Bot"; // Brand id of the bot, should be unique. Used in i18n.
  static _model = ""; // Model of the bot (eg. "text-davinci-002-render-sha")
  static _logoFilename = "default-logo.svg"; // Place it in assets/bots/
  static _loginUrl = "undefined";
  static _userAgent = ""; // Empty string means using the default user agent

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
  }

  static getInstance() {
    return new this();
  }

  getLogo() {
    return this.constructor._logoPackedPaths[this.constructor._logoFilename];
  }

  getBrandName() {
    const c = this.constructor;
    return i18n.global.t(`${c._brandId}.name`);
  }

  getModelName() {
    const c = this.constructor;
    return c._model ? "" : i18n.global.t(`${c._brandId}.${c._model}`);
  }

  getFullname() {
    if (this.getModelName())
      return `${this.getBrandName()} (${this.getModelName()})`;
    else return this.getBrandName();
  }

  getLoginUrl() {
    return this.constructor._loginUrl;
  }

  getUserAgent() {
    return this.constructor._userAgent;
  }

  isLoggedIn() {
    return this.constructor._isLoggedIn;
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: response, callbackParam, isDone
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    onUpdateResponse(i18n.global.t("Bot.notImplemented"), callbackParam, true);
  }

  async checkLoginStatus() {
    throw new Error("Method 'checkLoginStatus()' must be implemented.");
  }
}
