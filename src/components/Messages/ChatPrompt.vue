<template>
  <v-card
    ref="root"
    class="message prompt"
    :class="props.isThread ? 'thread-prompt' : ''"
  >
    <span>{{ props.message.content }} </span>
    <v-btn flat size="x-small" icon @click="copyToClipboard" class="copy_btn_bg">
      <v-icon>mdi-content-copy</v-icon>
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const root = ref();
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
  isThread: {
    type: Boolean,
    default: false,
  },
});

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
  let content = props.message.content
  navigator.clipboard.writeText(content);
}
</script>

<style scoped>
.message {
  border-radius: 8px;
  padding: 16px;
  word-wrap: break-word;
  text-align: left;
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

.thread-prompt {
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.copy_btn_bg {
  background-color: inherit;
}
</style>
