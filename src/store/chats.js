import db from "@/store/db";
import store from "@/store/index";
import i18n from "@/i18n";
import { v4 as uuidv4 } from "uuid";

class Chats {
  static get table() {
    return db.table("chats");
  }

  static async addFirstChatIfEmpty() {
    const count = await Chats.table.count();
    if (count === 0) {
      store.commit(
        "selectChat",
        await Chats.add({
          favBots: [
            // default bots
            { classname: "AzureOpenAIAPIBot", selected: false },
            { classname: "ClaudeAPIHaikuBot", selected: false },
            { classname: "ClaudeAPISonnetBot", selected: false },
            { classname: "ClaudeAPI37SonnetBot", selected: false },
            { classname: "Gemini20FlashAPIBot", selected: false },
            { classname: "Gemini20FlashLiteAPIBot", selected: false },
            { classname: "Gemma29bGroqAPIBot", selected: false },
            { classname: "Grok3APIBot", selected: false },
            { classname: "Grok3MiniAPIBot", selected: false },
            { classname: "Llama4ScoutGroqAPIBot", selected: false },
            { classname: "Llama4MaverickGroqAPIBot", selected: false },
            { classname: "OpenAIAPI41Bot", selected: false },
            { classname: "OpenAIAPI41MiniBot", selected: false },
            { classname: "OpenAIAPI41NanoBot", selected: false },
            { classname: "OpenAIAPIo4MiniBot", selected: false },
          ],
        }),
      );
    }
  }

  static async getCurrentChat() {
    return await Chats.table.get(store.state.currentChatIndex);
  }

  static async add(payload) {
    const currentChat = await Chats.getCurrentChat();
    const count = await Chats.table.count();
    const newKey = await Chats.table.add({
      index: uuidv4(),
      contexts: {},
      favBots: currentChat ? currentChat.favBots : [],
      createdTime: new Date().getTime(),
      modifiedTime: new Date().getTime(),
      title: `${i18n.global.t("chat.newChat")} ${count + 1}`,
      ...payload,
    });
    return newKey;
  }

  static async update(index, payload) {
    return await Chats.table.update(index, {
      modifiedTime: new Date().getTime(),
      ...payload,
    });
  }
}

export default Chats;
