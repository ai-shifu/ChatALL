<template>
  <div class="messages">
    <div
      class="message-grid"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
    >
      <template v-for="(message, index) in messages" :key="index">
        <!-- Check if the current message is a prompt
          If true, render <chat-prompt> component and set responses array empty -->
        <chat-prompt
          v-if="checkIsMessagePromptTypeAndEmptyResponsesIfTrue(message)"
          :columns="columns"
          :message="message"
        ></chat-prompt>
        <template v-else>
          <!-- If current message is response, push current message to responses array.
            Then check if next message.type === 'prompt', if true, render <chat-responses> -->
          <chat-responses
            v-if="pushResponseAndCheckIsNextMessagePromptType(index, message)"
            :columns="columns"
            :responses="responses"
            :update-message="updateMessage"
          ></chat-responses>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import ChatPrompt from "./ChatPrompt.vue";
import ChatResponses from "./ChatResponses.vue";

const store = useStore();

const props = defineProps({
  columns: {
    type: Number,
    default: 3,
  },
  chatIndex: {
    type: Number,
    default: 0,
  },
});

const autoScroll = ref(true);
const gridTemplateColumns = computed(() => `repeat(${props.columns}, 1fr)`);
const messages = computed(() => store.state.chats[props.chatIndex].messages);

const updateMessage = (index, values) => {
  store.dispatch("updateMessage", {
    indexes: { chatIndex: store.state.currentChatIndex, messageIndex: index },
    message: values,
  });
};

const scrollToBottom = ({ immediately = false }) => {
  nextTick(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: immediately ? "instant" : "smooth",
    });
  });
};

const autoScrollToBottom = () => {
  if (autoScroll.value) {
    scrollToBottom({ immediately: true });
  }
};

watch(() => store.getters.currentChat.messages.length, autoScrollToBottom);
watch(() => store.state.updateCounter, autoScrollToBottom);

const onScroll = () => {
  const scrollPosition = window.pageYOffset + window.innerHeight;
  autoScroll.value =
    scrollPosition >= document.documentElement.scrollHeight - 10;
};

onMounted(() => {
  store.getters.currentChat.messages.forEach((message) => {
    message.done = true;
  });
  window.addEventListener("scroll", onScroll);
  scrollToBottom({ immediately: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

let responses = []; // this array store a prompt responses
function checkIsMessagePromptTypeAndEmptyResponsesIfTrue(message) {
  if (message.type === "prompt") {
    responses = []; // clear responses for next prompt's responses
    return true;
  }
  return false;
}

function pushResponseAndCheckIsNextMessagePromptType(index, response) {
  const nextIndex = index + 1;
  if (!response.hide) responses.push(response);
  if (nextIndex >= messages.value.length) {
    return true; // allow last element
  }
  return messages.value[nextIndex].type === "prompt";
}
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
