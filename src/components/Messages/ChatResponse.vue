<template>
  <v-card
    ref="root"
    :class="['message', 'response', isHighlighted ? 'highlight-border' : '']"
    :loading="isAllDone ? false : 'primary'"
  >
    <v-card-title class="title">
      <img :src="botLogo" alt="Bot Icon" />
      {{ botFullname }}
      <v-spacer></v-spacer>
      <v-btn
        flat
        icon
        size="x-small"
        v-if="isShowPagingButton"
        @click="carouselModel = Math.max(carouselModel - 1, 0)"
        :disabled="carouselModel === 0"
      >
        <v-icon>mdi-menu-left</v-icon>
      </v-btn>
      <v-btn
        flat
        icon
        size="x-small"
        v-if="isShowPagingButton"
        @click="carouselModel = Math.min(carouselModel + 1, maxPage)"
        :disabled="carouselModel === maxPage"
      >
        <v-icon>mdi-menu-right</v-icon>
      </v-btn>
      <v-btn
        flat
        icon
        size="x-small"
        v-if="isShowResendButton"
        @click="resendPrompt(messages[0])"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn
        flat
        size="x-small"
        icon
        @click="toggleHighlight"
        :color="isHighlighted ? 'primary' : ''"
      >
        <v-icon>mdi-lightbulb-on-outline</v-icon>
      </v-btn>
      <v-btn flat size="x-small" icon @click="copyToClipboard">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn flat size="x-small" icon @click="hide">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-title>
    <Markdown
      v-if="props.messages.length === 1"
      class="markdown-body"
      :breaks="true"
      :html="messages[0].format === 'html'"
      :source="messages[0].content"
      @click="handleClick"
    />
    <v-carousel
      v-else
      hide-delimiter-background
      :hide-delimiters="true"
      height="auto"
      :show-arrows="false"
      v-model="carouselModel"
    >
      <v-carousel-item v-for="(message, i) in messages" :key="i">
        <Markdown
          class="markdown-body"
          :breaks="true"
          :html="message.format === 'html'"
          :source="message.content"
          @click="handleClick"
        />
      </v-carousel-item>
    </v-carousel>
  </v-card>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
import Markdown from "vue3-markdown-it";
import { useMatomo } from "@/composables/matomo";
import ConfirmModal from "@/components/ConfirmModal.vue";
import bots from "@/bots";

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update-message"]);

const matomo = useMatomo();
const store = useStore();

const root = ref();
const maxPage = computed(() => props.messages.length - 1);
const carouselModel = ref(maxPage.value);
const confirmModal = ref(null);

const botLogo = computed(() => {
  const bot = bots.getBotByClassName(props.messages[0].className);
  return bot ? bot.getLogo() : "";
});

const botFullname = computed(() => {
  const bot = bots.getBotByClassName(props.messages[0].className);
  return bot ? bot.getFullname() : "";
});

const isHighlighted = computed(() => props.messages.some((m) => m.highlight));
const isAllDone = computed(() => {
  return !props.messages.some((m) => !m.done);
});
const isShowResendButton = computed(() => {
  return (
    isAllDone.value &&
    messageBotIsSelected() &&
    props.messages[0].promptId &&
    store.getters.currentChat.latestPromptId &&
    store.getters.currentChat.latestPromptId === props.messages[0].promptId
  );
});
const isShowPagingButton = computed(() => props.messages.length > 1);

watch(
  () => props.columns,
  () => {
    root.value.$el.style.setProperty("--columns", props.columns);
  },
);

onMounted(() => {
  root.value.$el.style.setProperty("--columns", props.columns);
});

function copyToClipboard() {
  let content = props.messages[carouselModel.value].content;
  if (props.messages[carouselModel.value].format === "html") {
    content = content.replace(/<[^>]*>?/gm, "");
  }
  navigator.clipboard.writeText(content);
  matomo.value?.trackEvent("vote", "copy", props.messages[0].className, 1);
}

function toggleHighlight() {
  emits("update-message", props.messages[carouselModel.value].index, {
    highlight: !props.messages[carouselModel.value].highlight,
  });
  matomo.value?.trackEvent(
    "vote",
    "highlight",
    props.messages[carouselModel.value].className,
    props.messages[carouselModel.value].highlight ? -1 : 1,
  );
}

async function hide() {
  const result = await confirmModal.value.showModal(
    i18n.global.t("modal.confirmHide"),
  );
  if (result) {
    emits("update-message", props.messages[0].index, { hide: true });
    matomo.value?.trackEvent("vote", "hide", props.messages[0].className, 1);
  }
}

function handleClick(event) {
  const target = event.target;
  if (target.tagName !== "A" && target.parentElement.tagName !== "A") {
    return;
  }
  if (target.target === "innerWindow") {
    // Open in Electron inner window
    return;
  }
  // Open in external browser
  event.preventDefault();
  const electron = window.require("electron");
  const url = target.href || target.parentElement.href;
  electron.shell.openExternal(url);
}

function resendPrompt(responseMessage) {
  if (!responseMessage.promptId) {
    return;
  }
  const promptMessage = store.getters.currentChat.messages.find(
    (m) => m.id === responseMessage.promptId && m.type === "prompt",
  );
  if (promptMessage) {
    const botInstance = bots.getBotByClassName(responseMessage.className);
    store.dispatch("sendPrompt", {
      prompt: promptMessage.content,
      bots: [botInstance],
      promptId: responseMessage.promptId,
    });
  } else {
    // show not found
  }
}

function messageBotIsSelected() {
  var favBot = store.getters.currentChat.favBots.find(
    (b) => b.classname === props.messages[0].className,
  );
  return favBot?.selected;
}
</script>

<style scoped>
.markdown-body{
    background-color: rgb(var(--v-theme-response));
    font-family: inherit;
  }
  
  .message {
      border-radius: 8px;
      padding: 16px;
      word-wrap: break-word;
      text-align: left;
  }
  
  .highlight-border {
      box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 1);
  }
  
  .prompt {
      background-color: rgb(var(--v-theme-prompt));
      width: fit-content;
      grid-column: 1 / span var(--columns);
  }
  
  .prompt pre {
    white-space: pre-wrap; 
    font-family: inherit;
  }
  
  .response {
      background-color: rgb(var(--v-theme-response));
      width: 100%;
      grid-column: auto / span 1;
  }
  
  .title {
      display: flex;
      align-items: center;
      font-size: 1rem;
      padding: 0;
      margin-bottom: 8px;
  }
  
  .title img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
  }
</style>
