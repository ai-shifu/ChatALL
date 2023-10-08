import db from "@/store/db";
import { v4 as uuidv4 } from "uuid";

class Threads {
  static get table() {
    return db.table("threads");
  }

  static async add(chatIndex, messageIndex, payload) {
    const newKey = await Threads.table.add({
      chatIndex,
      messageIndex,
      index: uuidv4(),
      createdTime: new Date().getTime(),
      ...payload,
    });
    return newKey;
  }

  static async update(index, payload) {
    return await Threads.table.update(index, {
      modifiedTime: new Date().getTime(),
      ...payload,
    });
  }
}

export default Threads;
