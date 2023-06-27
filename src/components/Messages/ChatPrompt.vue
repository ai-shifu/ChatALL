<template>
  <v-card ref="root" class="message prompt">
    <pre>{{ props.message.content }}</pre>
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
</style>
