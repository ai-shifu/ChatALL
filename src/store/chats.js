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
            { classname: "ClaudeAPISonnetBot", selected: false },
            { classname: "Gemini15ProAPIBot", selected: false },
            { classname: "Gemma29bGroqAPIBot", selected: false },
            { classname: "Grok2APIBot", selected: false },
            { classname: "Llama370bGroqAPIBot", selected: false },
            { classname: "Mixtral8x7bGroqAPIBot", selected: false },
            { classname: "OpenAIAPI4oBot", selected: false },
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
