import Dexie from "dexie";

const db = new Dexie("ChatALL");
db.version(1).stores({
  chats: "index, title, modifiedTime, selectedTime",
  messages: "index, chatIndex, createdTime, modifiedTime",
  threads: "index, chatIndex, messageIndex, createdTime, modifiedTime",
});

export default db;
