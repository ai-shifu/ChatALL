<template>
  <v-list-item>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.deleteAllChatHistory')"
      @click="deleteChats"
    ></v-btn>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.downloadAllChatHistory')"
      @click="downloadJson"
      style="margin-left: 10px"
    ></v-btn>
  </v-list-item>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
import ConfirmModal from "@/components/ConfirmModal.vue";
import bots from "@/bots";
const emit = defineEmits(["close-dialog"]);
const confirmModal = ref();
const store = useStore();

// This function downloads the chat history as a JSON file.
const downloadJson = () => {
  // Get the chat history from localStorage.
  const chatallMessages = localStorage.getItem("chatall-messages");
  if (!chatallMessages) {
    console.error("chatall-messages not found in localStorage");
    return;
  }

  const chats = JSON.parse(chatallMessages)?.chats ?? [];

  // Create an array of messages from the chat history.
  const messages = chats
    .filter((d) => !d.hide)
    .map((chat) => ({
      // The title of the chat.
      title: chat.title,
      // The messages in the chat.
      messages: chat.messages
        .filter((d) => !d.hide)
        .reduce((arr, message) => {
          const t = message.type;
          const content = message.content;
          if (t == "prompt") {
            arr.push({
              prompt: content,
              responses: [],
            });
          } else {
            const bot = bots.getBotByClassName(message.className);
            const botName = bot.getFullname();
            arr.at(-1).responses.push({
              content,
              botName,
              botModel: message.model,
              highlight: message.highlight
            });
          }
          return arr;
        }, []),
    }));

  // Create a blob that contains the JSON data.
  // The space parameter specifies the indentation of nested objects in the string representation.
  const blob = new Blob([JSON.stringify(messages, null, 2)], {
    // The type of the blob.
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  // Create a file name for the JSON file.
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, "0");
  const fileName = `chatall-history-${year}${month}${day}`;

  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.json`;
  document.body.appendChild(a);

  // Click the anchor element to download the file.
  a.click();

  // Remove the anchor element from the document body.
  document.body.removeChild(a);

  // Revoke the URL for the blob.
  URL.revokeObjectURL(url);
};
async function deleteChats() {
  const confirm = await confirmModal.value.showModal(
    "",
    i18n.global.t("chat.confirmDeleteAllChatHistory"),
  );
  if (confirm) {
    store.commit("deleteChats");
    emit("close-dialog");
  }
}
</script>
