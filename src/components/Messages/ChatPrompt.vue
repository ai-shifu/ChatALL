<template>
  <v-card
    ref="root"
    class="message prompt"
    :class="props.isThread ? 'thread-prompt' : ''"
  >
    <v-btn-toggle
      borderless
      variant="text"
      color="primary"
      density="compact"
      v-model="isMarkdown"
      class="position-absolute h-auto hide-btn"
      style="background: inherit; right: 1rem"
      @update:model-value="onToggleIsMarkdown($event)"
    >
      <v-btn
        :value="true"
        style="padding-top: 1px; padding-right: 0.5px"
        flat
        color="primary"
        icon="mdi-language-markdown"
      ></v-btn>
    </v-btn-toggle>
    <v-md-preview v-if="isMarkdown" :text="props.message.content" />
    <pre v-if="!isMarkdown">{{ props.message.content }}</pre>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const root = ref();
const isMarkdown = computed(() => store.state.isMarkdown);
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

watch(() => props.columns, setColumns);
onMounted(setColumns);
function setColumns() {
  root.value.$el.style.setProperty("--columns", props.columns);
}

function onToggleIsMarkdown(value) {
  store.commit("setIsMarkdown", Boolean(value));
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

.hide-btn {
  transition: 0.3s;
  opacity: 0;
}

.prompt:hover .hide-btn {
  opacity: 1;
}
</style>
