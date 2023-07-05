<template>
  <v-list-item>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.deleteAllChatHistory')"
      @click="deleteChats"
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
