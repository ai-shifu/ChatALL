import en from "./prompts-en.json";
import zh from "./prompts-zh.json";
import es from "./prompts-es.json";

const prompts = {
  en,
  zh,
  es,
  languages: [
    { name: "English", code: "en" },
    { name: "简体中文", code: "zh" },
    { name: "Español", code: "es" },
  ],
};

export default prompts;
