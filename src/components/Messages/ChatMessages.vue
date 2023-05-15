<template>
  <div class="messages">
    <div
      class="message-grid"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
    >
      <chat-message
        v-for="(message, index) in filteredMessages"
        :key="index"
        :columns="columns"
        :message="message"
        @update-message="updateMessage"
      ></chat-message>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import ChatMessage from "./ChatMessage.vue";

const store = useStore();

const props = defineProps({
  columns: {
    type: Number,
    default: 3,
  },
});

const autoScroll = ref(true);
const gridTemplateColumns = computed(() => `repeat(${props.columns}, 1fr)`);
const filteredMessages = computed(() =>
  store.state.messages.filter((message) => !message.hide),
);

const updateMessage = (index, values) => {
  store.dispatch("updateMessage", {
    index,
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

watch(() => store.state.messages.length, autoScrollToBottom);
watch(() => store.state.updateCounter, autoScrollToBottom);

const onScroll = () => {
  const scrollPosition = window.pageYOffset + window.innerHeight;
  autoScroll.value =
    scrollPosition >= document.documentElement.scrollHeight - 10;
};

onMounted(() => {
  store.state.messages.forEach((message) => {
    message.done = true;
  });
  window.addEventListener("scroll", onScroll);
  scrollToBottom({ immediately: true });
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
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
    margin: 52px 16px;
}

.message-grid {
    display: grid;
    grid-gap: 16px;
    width: 100%;
    padding: 16px;
}
</style>
