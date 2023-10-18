import Chats from "@/store/chats";
import Messages from "@/store/messages";
import Threads from "@/store/threads";
import { v4 as uuidv4 } from "uuid";

const migrateChatsMessagesThreads = async () => {
  const chatIndexMap = {};
  let messageIndexMap = {};
  let threadIndexMap = {};
  const chatsMigrateData = [];
  const messagesMigrateData = [];
  const threadsMigrateData = [];
  try {
    if (localStorage.getItem("isMigratedChatsMessagesThreads") === "true") {
      return;
    }
    const data = JSON.parse(localStorage.getItem("chatall-messages"));
    if (data === null) {
      localStorage.setItem("isMigratedChatsMessagesThreads", true);
      return;
    }
    const chats = data.chats;
    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      chat.index = getAndGenerateUuidIfNotExist(chatIndexMap, chat.index);
      chat.modifiedTime = chat.createdTime;
      let createdTime = chat.createdTime || 0;
      for (let j = 0; j < chat.messages.length; j++) {
        const message = chat.messages[j];
        message.index = getAndGenerateUuidIfNotExist(
          messageIndexMap,
          message.index,
        );
        message.chatIndex = chat.index;
        message.createdTime = createdTime + j;
        messagesMigrateData.push(message);
      }
      for (let q = 0; q < chat.threads.length; q++) {
        const thread = chat.threads[q];
        const messageIndex = getAndGenerateUuidIfNotExist(
          messageIndexMap,
          thread.responseIndex,
        );
        let createdTime = chat.createdTime || 0;
        for (let p = 0; p < thread.messages.length; p++) {
          const threadMessage = thread.messages[p];
          threadMessage.index = getAndGenerateUuidIfNotExist(
            threadIndexMap,
            threadMessage.index,
          );
          threadMessage.messageIndex = messageIndex;
          threadMessage.chatIndex = chat.index;
          threadMessage.createdTime = createdTime + p;
          if (threadMessage.type === "response") {
            threadMessage.promptIndex = getAndGenerateUuidIfNotExist(
              threadIndexMap,
              threadMessage.promptIndex,
            );
          }
          threadsMigrateData.push(threadMessage);
        }
      }
      messageIndexMap = {};
      threadIndexMap = {};
      delete chat.messages;
      chatsMigrateData.push(chat);
    }
    console.log(chatsMigrateData);
    console.log(messagesMigrateData);
    console.log(threadsMigrateData);
    try {
      await Chats.table.bulkAdd(chatsMigrateData);
    } catch (error) {
      console.error("Chats Migration error:", error);
    }
    try {
      await Messages.table.bulkAdd(messagesMigrateData);
    } catch (error) {
      console.error("Messages Migration error:", error);
    }
    try {
      await Threads.table.bulkAdd(threadsMigrateData);
    } catch (error) {
      console.error("Threads Migration error:", error);
    }
    localStorage.setItem("isMigratedChatsMessagesThreads", true);
    console.log("Migration done");
  } catch (error) {
    console.error("Migration error:", error);
  }
};

function getAndGenerateUuidIfNotExist(map, key) {
  if (map[key] === undefined) {
    map[key] = uuidv4();
  }
  return map[key];
}

export { migrateChatsMessagesThreads };
