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
  const messages = chats.map((chat) => ({
    // The title of the chat.
    title: chat.title,
    // The names of the bots that the user has selected.
    bots: chat.favBots
      .filter((bot) => bot.selected)
      .map((bot) => bot.classname),
    // The messages in the chat.
    chat: chat.messages.map((message) => ({
      type: message.type,
      content: message.content,
    })),
  }));

  // Create a blob that contains the JSON data.
  // The space parameter specifies the indentation of nested objects in the string representation.
  const blob = new Blob([JSON.stringify(messages, null, 2)], {
    // The type of the blob.
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  // Create a file name for the JSON file.
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const fileName = `chatall-history-${formatter.format(new Date())}`;

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
