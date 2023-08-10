<template>
  <v-navigation-drawer permanent :model-value="props.open">
    <v-list nav>
      <v-list-item
        :id="SHORTCUT_NEW_CHAT.elementId"
        density="comfortable"
        class="mb-1 border"
        :title="$t('chat.newChat')"
        @click="onAddNewChat"
        @shortkey="onAddNewChat"
        v-shortkey="SHORTCUT_NEW_CHAT.key"
      >
        <template v-slot:prepend>
          <v-icon color="primary"> mdi-plus </v-icon>
        </template>
      </v-list-item>
    </v-list>

    <template v-for="chat in chatsReversed">
      <ChatDrawerItem
        v-if="!chat.hide"
        :chat="chat"
        @confirm-hide-chat="confirmHideChat"
        @focus-textarea="focusTextarea"
        :key="chat.index"
      ></ChatDrawerItem>
    </template>
  </v-navigation-drawer>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import { ref, computed, onUpdated, nextTick } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
import ConfirmModal from "@/components/ConfirmModal.vue";
import ChatDrawerItem from "@/components/ChatDrawer/ChatDrawerItem.vue";
import { SHORTCUT_NEW_CHAT } from "@/components/ShortcutGuide/shortcut.const";

const store = useStore();

const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "focusTextarea"]);
onUpdated(setIsChatDrawerOpen);

const confirmModal = ref(null);
const chatsReversed = computed(() => store.state.chats.slice().reverse());

function setIsChatDrawerOpen() {
  store.commit("setIsChatDrawerOpen", props.open);
}

function onAddNewChat() {
  store.commit("createChat");
  store.commit("selectChat", store.state.chats.length - 1);
  focusTextarea();
}

async function confirmHideChat() {
  const result = await confirmModal.value.showModal(
    i18n.global.t("modal.confirmHideChat"),
  );
  if (result) {
    store.commit("hideChat");
    selectLatestVisibleChat();
  }
}

function selectLatestVisibleChat() {
  let isAnyChatVisible = false;
  for (let i = 0; i < chatsReversed.value.length; i++) {
    const chat = chatsReversed.value[i];
    if (!chat.hide) {
      isAnyChatVisible = true;
      store.commit("selectChat", chat.index);
      focusTextarea();
      break;
    }
  }
  if (!isAnyChatVisible) {
    // if there is no visible chat, create a new chat
    store.commit("createChat");
    store.commit("selectChat", store.state.chats.length - 1);
    focusTextarea();
  }
}

function focusTextarea() {
  nextTick().then(() => {
    emit("focusTextarea");
  });
}
</script>
<style scoped>
:deep() .v-list-item-title {
  font-size: 1rem !important;
}
</style>
