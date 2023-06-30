<template>
  <v-card
    ref="root"
    :class="[
      'message',
      isHighlighted ? 'highlight-border' : '',
      props.isThread ? 'response-thread' : 'response',
    ]"
    :loading="isAllDone ? false : 'primary'"
    :flat="props.isThread"
  >
    <v-card-title class="title">
      <img :src="botLogo" alt="Bot Icon" />
      {{ botFullname }}
      <v-spacer></v-spacer>
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
    <template v-if="props.messages.length === 1">
      <Markdown
        class="markdown-body"
        :breaks="true"
        :html="messages[0].format === 'html'"
        :source="messages[0].content"
        @click="handleClick"
      />
      <template v-if="!props.isThread && messages[0].threadIndex !== undefined">
        <!-- if the repsonse is not a thread and there is value in message.threadIndex, means thread existed for this response
            we pass in threadIndex into <chat-thread> to render based on the threadIndex -->
        <chat-thread
          :threadIndex="messages[0].threadIndex"
          :updateThreadMessage="updateThreadMessage"
        ></chat-thread>
      </template>
    </template>
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
        <template v-if="!props.isThread && message.threadIndex !== undefined">
          <!-- if the repsonse is not a thread and there is value in message.threadIndex, means thread existed for this response
          we pass in threadIndex into <chat-thread> to render based on the threadIndex -->
          <chat-thread
            :threadIndex="message.threadIndex"
            :updateThreadMessage="updateThreadMessage"
          ></chat-thread>
        </template>
      </v-carousel-item>
    </v-carousel>
    <v-card class="response" style="padding: 0">
      <v-card-title style="display: flex; padding: 0">
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
          icon
          size="x-small"
          v-if="isShowReplyButton"
          :color="isShowReplyTextField ? 'primary' : ''"
          @click="toggleReplyButton"
        >
          <v-icon>mdi-reply</v-icon>
        </v-btn>
      </v-card-title>
      <div
        v-show="isShowReplyTextField && isShowReplyButton"
        style="display: flex; align-items: flex-end; margin-top: 1rem"
      >
        <v-textarea
          style="padding-right: 0.5rem"
          ref="replyRef"
          v-model="replyModel"
          auto-grow
          max-rows="8.5"
          rows="1"
          density="compact"
          hide-details
          variant="solo"
          :placeholder="`${$t('footer.sendPrompt')} ${botFullname}`"
          @keydown="filterEnterKey"
        ></v-textarea>
        <v-btn
          :disabled="replyModel.trim() === ''"
          color="primary"
          size="small"
          @click="sendPromptToBot"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-card>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import { onMounted, ref, watch, computed, nextTick } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
import Markdown from "vue3-markdown-it";
import { useMatomo } from "@/composables/matomo";
import ConfirmModal from "@/components/ConfirmModal.vue";
import ChatThread from "./ChatThread.vue";
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
  threadIndex: {
    type: Number,
    required: false,
  },
  isThread: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update-message", "update-thread-message"]);

const matomo = useMatomo();
const store = useStore();

const root = ref();
const replyModel = ref("");
const replyRef = ref();
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

const isHighlighted = computed(() => props.messages.some((m) => m.highlight)); // if any message is hightlighted, return true
const isAllDone = computed(() => !props.messages.some((m) => !m.done)); // if any message is not done, return false
const isLatestPrompt = computed(
  // if the current message response to user latest prompt, return true
  // this flag is used to determine whether to hide Resend button, hide it when is not latest prompt
  // to ensure the prompt and response in messages array is in correct order
  () =>
    props.messages[0].promptIndex !== undefined &&
    store.getters.currentChat.latestPromptIndex !== undefined &&
    store.getters.currentChat.latestPromptIndex ===
      props.messages[0].promptIndex,
);

const isLatestPromptForThread = computed(() => {
  if (props.isThread) {
    // if the current thread is response latest prompt, return true
    // this flag is used to determine whether to hide Resend button in thread, hide it when is not latest prompt
    // to ensure the prompt and response in messages array is in correct order
    const responseIndex =
      store.getters.currentChat.threads[props.threadIndex].responseIndex; // get responseIndex, from current thread
    const threadPromptIndex =
      store.getters.currentChat.messages[responseIndex].promptIndex; // using responseIndex to get response from messages, and in the repsonse we can retrieve promptIndex
    return (
      threadPromptIndex !== undefined &&
      store.getters.currentChat.latestPromptIndex !== undefined &&
      store.getters.currentChat.latestPromptIndex === threadPromptIndex
    );
  }
  return false;
});
const isShowReplyTextField = ref(false);
const isShowReplyButton = computed(() => {
  return (
    // show the thread text field when all conditions met
    !props.isThread && // if current response is not a thread,
    isAllDone.value && // if all response done,
    messageBotIsSelected() && // if responding bot selected,
    isLatestPrompt.value && // if current response is a response to latest prompt,
    carouselModel.value === maxPage.value // if current response is on last page,
  );
});
const isSomeResponsesHasThread = computed(() =>
  // if some responses contain threadIndex, return true
  props.messages.some((m) => m.threadIndex !== undefined),
);

const isShowResendButton = computed(() => {
  // show the resend button when all conditions met
  if (props.isThread) {
    return (
      isAllDone.value && // if all response done
      messageBotIsSelected() && // if responding bot selected
      props.messages[0].promptIndex !== undefined && // if current threads is a response to latest prompt
      store.getters.currentChat.threads[props.threadIndex].latestPromptIndex !==
        undefined &&
      store.getters.currentChat.threads[props.threadIndex].latestPromptIndex ===
        props.messages[0].promptIndex &&
      isLatestPromptForThread.value
    );
  } else {
    return (
      !isSomeResponsesHasThread.value && // if all responses don't have thread
      isAllDone.value && // if all response done
      messageBotIsSelected() && // if responding bot selected
      isLatestPrompt.value // if current response is a response to latest prompt
    );
  }
});
const isShowPagingButton = computed(() => props.messages.length > 1);

// Send the prompt when the user presses enter and prevent the default behavior
// But if the shift, ctrl, alt, or meta keys are pressed, do as default
function filterEnterKey(event) {
  if (
    event.keyCode == 13 &&
    !event.shiftKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    event.preventDefault();
    sendPromptToBot();
  }
}

function sendPromptToBot() {
  if (replyModel.value.trim() === "") return;

  const botInstance = bots.getBotByClassName(props.messages[0].className);

  store.dispatch("sendPromptInThread", {
    responseIndex: props.messages[carouselModel.value].index,
    threadIndex: props.messages[carouselModel.value].threadIndex,
    prompt: replyModel.value,
    bot: botInstance,
  });

  // Clear the textarea after sending the prompt
  replyModel.value = "";

  matomo.value?.trackEvent("prompt", "send", "Active bots count", 1);
}

watch(
  () => props.columns,
  () => {
    root.value.$el.style.setProperty("--columns", props.columns);
  },
);

const updateThreadMessage = (threadIndex, messageIndex, values) => {
  store.dispatch("updateThreadMessage", {
    indexes: {
      chatIndex: store.state.currentChatIndex,
      messageIndex,
      threadIndex,
    },
    message: values,
  });
};

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
  if (props.isThread) {
    emits(
      "update-thread-message",
      props.threadIndex,
      props.messages[carouselModel.value].index,
      {
        highlight: !props.messages[carouselModel.value].highlight,
      },
    );
  } else {
    emits("update-message", props.messages[carouselModel.value].index, {
      highlight: !props.messages[carouselModel.value].highlight,
    });
  }
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
    if (props.isThread) {
      emits(
        "update-thread-message",
        props.threadIndex,
        props.messages[carouselModel.value].index,
        { hide: true },
      );
    } else {
      emits("update-message", props.messages[carouselModel.value].index, {
        hide: true,
      });
    }
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
  if (responseMessage.promptIndex === undefined) {
    return;
  }
  if (props.isThread) {
    const promptMessage =
      store.getters.currentChat.threads[props.threadIndex].messages[
        responseMessage.promptIndex
      ];
    if (promptMessage) {
      const botInstance = bots.getBotByClassName(responseMessage.className);
      store.dispatch("sendPromptInThread", {
        prompt: promptMessage.content,
        bot: botInstance,
        promptIndex: responseMessage.promptIndex,
        responseIndex: responseMessage.index,
        threadIndex: props.threadIndex,
      });
    } else {
      // show not found
    }
  } else {
    const promptMessage =
      store.getters.currentChat.messages[responseMessage.promptIndex];
    if (promptMessage) {
      const botInstance = bots.getBotByClassName(responseMessage.className);
      store.dispatch("sendPrompt", {
        prompt: promptMessage.content,
        bots: [botInstance],
        promptIndex: responseMessage.promptIndex,
      });
    } else {
      // show not found
    }
  }
}

function messageBotIsSelected() {
  var favBot = store.getters.currentChat.favBots.find(
    (b) => b.classname === props.messages[0].className,
  );
  return favBot?.selected;
}

function toggleReplyButton() {
  isShowReplyTextField.value = !isShowReplyTextField.value;
  if (isShowReplyTextField.value) {
    nextTick().then(replyRef.value.focus);
  }
}
</script>

<style scoped>
:deep() .v-responsive__content {
  overflow: auto;
}

.markdown-body {
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

.response-thread {
  background-color: rgb(var(--v-theme-response));
  width: 98%;
  grid-column: auto / span 1;
  margin-left: .2rem;
  margin-bottom: .2rem;
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
