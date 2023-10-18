import db from "@/store/db";
import { v4 as uuidv4 } from "uuid";

class Messages {
  static get table() {
    return db.table("messages");
  }

  static async add(chatIndex, payload) {
    const newKey = await Messages.table.add({
      chatIndex,
      index: uuidv4(),
      createdTime: new Date().getTime(),
      ...payload,
    });
    return newKey;
  }

  static async update(index, payload) {
    return await Messages.table.update(index, {
      modifiedTime: new Date().getTime(),
      ...payload,
    });
  }

  static async getMessages(index) {
    return await Messages.table
      .where({ chatIndex: index })
      .sortBy("createdTime");
  }

  static async getMessagesCount(index) {
    return await Messages.table.where({ chatIndex: index }).count();
  }
}

export default Messages;
