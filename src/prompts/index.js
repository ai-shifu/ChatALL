import en from "./prompts-en.json";
import zh from "./prompts-zh.json";

const prompts = {
  en,
  zh,
  languages: [
    { name: "English", code: "en" },
    { name: "简体中文", code: "zh" },
  ],
};

export default prompts;
