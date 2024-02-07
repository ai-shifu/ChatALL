<template>
  <v-container v-if="loading" class="ma-0 position-fixed" style="z-index: 1">
    <v-label class="bg-background" style="opacity: 1">{{
      $t("chat.loading")
    }}</v-label>
  </v-container>
  <div class="messages">
    <div
      class="message-grid"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
    >
      <template v-for="(message, index) in currentChatMessages" :key="index">
        <chat-prompt
          v-if="message.type === 'prompt'"
          :columns="columns"
          :message="message"
        ></chat-prompt>
        <chat-response
          v-else
          :chat="chat"
          :columns="columns"
          :messages="message"
        ></chat-response>
      </template>
    </div>
  </div>
</template>

<script setup>
import Messages from "@/store/messages";
import { liveQuery } from "dexie";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import ChatPrompt from "./ChatPrompt.vue";
import ChatResponse from "./ChatResponse.vue";
import { autoScrollToBottom, scrollToBottom } from "@/helpers/scroll-helper";

const store = useStore();

const props = defineProps({
  columns: {
    type: Number,
    default: 3,
  },
  chat: {
    type: Object,
  },
});

const loading = ref(false);
const gridTemplateColumns = computed(() => `repeat(${props.columns}, 1fr)`);
const currentChatMessages = ref([]);
let createChatMessageLiveQuery = (index) => {
  return liveQuery(async () => {
    const keys = await Messages.table
      .where("chatIndex")
      .equals(index)
      .primaryKeys();
    const messages = await Messages.table.bulkGet(keys);
    messages.sort((a, b) => a.createdTime - b.createdTime);
    const groupedMessage = [];
    let responses = Object.create(null);
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.type === "prompt") {
        if (Object.keys(responses).length !== 0) {
          groupedMessage.push.apply(groupedMessage, Object.values(responses));
        }
        groupedMessage.push(message);
        responses = Object.create(null);
        continue;
      }
      if (message.hide !== true) {
        if (!responses[message.className]) {
          // group responses with same bot for carousel
          responses[message.className] = [];
        }
        responses[message.className].push(message);
      }
    }
    if (Object.keys(responses).length !== 0) {
      groupedMessage.push.apply(groupedMessage, Object.values(responses));
    }
    currentChatMessages.value = groupedMessage;
    nextTick(() => autoScrollToBottom());
  });
};

const currentChatIndex = computed(() => store.state.currentChatIndex);
let currentMessageSub;
let scrollToBottomFirst;
watch(
  currentChatIndex,
  (newChat, oldChat) => {
    if (newChat !== oldChat) {
      loading.value = true;
      scrollToBottomFirst = true;
      if (currentMessageSub) {
        currentMessageSub.unsubscribe();
      }
      currentMessageSub = createChatMessageLiveQuery(
        store.state.currentChatIndex,
      ).subscribe(() => {
        loading.value = false;
        if (scrollToBottomFirst) {
          scrollToBottomFirst = false;
          nextTick(() => scrollToBottom({ immediately: true }));
        }
      });
    }
  },
  { immediate: true },
);

onMounted(async () => {
  await Messages.table
    .filter((message) => message.done !== true)
    .modify({ done: true });
});
</script>

<style scoped>
.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  overflow-y: auto;
  gap: 16px;
  padding: 0;
}

.message-grid {
  display: grid;
  grid-gap: 16px;
  width: 100%;
  padding: 2rem;
}
</style>
