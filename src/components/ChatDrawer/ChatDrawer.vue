<template>
  <v-navigation-drawer permanent :model-value="props.open">
    <v-list nav>
      <v-list-item
        :id="SHORTCUT_NEW_CHAT.elementId"
        density="comfortable"
        class="mb-1 border"
        :title="$t('chat.newChat')"
        @click="onAddChat"
        @shortkey="onAddChat"
        v-shortkey="SHORTCUT_NEW_CHAT.key"
      >
        <template v-slot:prepend>
          <v-icon color="primary"> mdi-plus </v-icon>
        </template>
      </v-list-item>
    </v-list>

    <template v-for="chat in drawerItems">
      <ChatDrawerItem
        v-if="!chat.hide"
        :key="chat.index"
        :chat="chat"
        :current-chat-index="store.state.currentChatIndex"
        @hide-chat="hideChat"
        @select-chat="selectChat"
        @edit-chat-title="editChatTitle"
        @focus-textarea="focusTextarea"
      ></ChatDrawerItem>
    </template>
  </v-navigation-drawer>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import ChatDrawerItem from "@/components/ChatDrawer/ChatDrawerItem.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { SHORTCUT_NEW_CHAT } from "@/components/ShortcutGuide/shortcut.const";
import i18n from "@/i18n";
import Chats from "@/store/chats";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { nextTick, onUpdated, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "focusTextarea"]);
onUpdated(setIsChatDrawerOpen);

const confirmModal = ref(null);
const drawerItems = useObservable(
  liveQuery(() => Chats.table.orderBy("modifiedTime").reverse().toArray()),
);

function setIsChatDrawerOpen() {
  store.commit("setIsChatDrawerOpen", props.open);
}

function selectChat(index) {
  store.commit("selectChat", index);
  focusTextarea();
}

async function onAddChat() {
  store.commit("selectChat", await Chats.add());
  focusTextarea();
}

async function hideChat() {
  const confirm = await confirmModal.value.showModal(
    i18n.global.t("modal.confirmHideChat"),
  );
  if (confirm) {
    await Chats.update(store.state.currentChatIndex, { hide: true });
    selectLatestVisibleChat();
  }
}

async function editChatTitle(payload) {
  store.commit("editChatTitle", {
    index: store.state.currentChatIndex,
    payload,
  });
}

async function selectLatestVisibleChat() {
  const latestChat = await Chats.table
    .orderBy("modifiedTime")
    .reverse()
    .filter((chat) => !chat.hide)
    .first();
  if (latestChat) {
    store.commit("selectChat", latestChat.index);
    focusTextarea();
  } else {
    // if there is no visible chat, create a new chat
    onAddChat();
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
