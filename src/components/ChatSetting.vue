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

const downloadJson = () => {
  const to_save = JSON.parse(localStorage["chatall-messages"]).chats.map((d) =>
    d.messages.map((t) => ({ type: t.type, content: t.content })),
  );
  const blob = new Blob([JSON.stringify(to_save)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const file_name = `chatall-history-${new Date()
    .toLocaleDateString()
    .replace(/\//g, "")}`;
  a.download = `${file_name}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
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
