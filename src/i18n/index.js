import { createI18n } from "vue-i18n";

// Import translation files here
import enMessages from "./locales/en.json";
import zhMessages from "./locales/zh.json";

const messages = {
  en: enMessages,
  zh: zhMessages,
};

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
