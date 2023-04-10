import { createI18n } from "vue-i18n";

const messages = {
  en: {
    header: {
      singleColumn: "Single Column",
      doubleColumn: "Double Column",
      tripleColumn: "Triple Column",
    },
    footer: {
      sendPrompt: "Send",
    },
    bot: {
      nullBot: "Null Bot",
      ChatGPT: "ChatGPT",
      BingChat: "Bing Chat",
      Bard: "Bard",
      ERNIE: "ERNIE",
    },
  },
  zh: {
    header: {
      singleColumn: "单列",
      doubleColumn: "双列",
      tripleColumn: "三列",
    },
    footer: {
      sendPrompt: "发送",
    },
    bot: {
      nullBot: "虚无",
      ERNIE: "文心一言",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
