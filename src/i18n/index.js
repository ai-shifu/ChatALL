import { createI18n } from "vue-i18n";

// Import stored language
import store from "../store";
var lang = store.state.lang;
if (lang == "auto") {
  lang = navigator.language || navigator.userLanguage || "en";
  lang = lang.substr(0, 2); // Only use the first two characters (e.g. "en")
}

// Import translation files here
import enMessages from "./locales/en.json";
import zhMessages from "./locales/zh.json";

const messages = {
  en: enMessages,
  zh: zhMessages,
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: lang,
  fallbackLocale: "en",
  messages,
});

export default i18n;
