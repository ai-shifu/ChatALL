<template>
  <v-card
    ref="root"
    :class="[
      'message',
      message.type,
      message.highlight ? 'highlight-border' : '',
    ]"
    :loading="message.done ? false : 'primary'"
  >
    <v-card-title v-if="message.type === 'response'" class="title">
      <img :src="message.logo" alt="Bot Icon" />
      {{ message.name }}
      <v-spacer></v-spacer>
      <v-btn
        flat
        size="x-small"
        icon
        @click="toggleHighlight"
        :color="message.highlight ? 'primary' : ''"
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
      class="markdown-body"
      :breaks="true"
      :html="true"
      :source="message.content"
      @click="handleClick"
    />
  </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import i18n from "@/i18n";
import Markdown from "vue3-markdown-it";
import { useMatomo } from '@/composables/matomo';

import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(["update-message"]);

const matomo = useMatomo();

const root = ref();

watch(() => props.columns, () => {
  root.value.$el.style.setProperty("--columns", props.columns);
})

onMounted(() => {
  root.value.$el.style.setProperty("--columns", props.columns);
}) 

function copyToClipboard() {
  navigator.clipboard.writeText(props.message.content);
  matomo.value.trackEvent("vote", "copy", props.message.className, 1);
}

function toggleHighlight() {
  emits("update-message", props.message.index, {
    highlight: !props.message.highlight,
  });
  matomo.value.trackEvent(
    "vote",
    "highlight",
    props.message.className,
    props.message.highlight ? -1 : 1,
  );
}

function hide() {
  if (window.confirm(i18n.global.t("modal.confirmHide"))) {
    emits("update-message", props.message.index, { hide: true });
    matomo.value.trackEvent("vote", "hide", props.message.className, 1);
  }
}

function handleClick(event) {
  const target = event.target;
  if (target.tagName !== "A" && target.tagName !== "SUP") {
    return;
  }
  // Open in external browser
  event.preventDefault();
  const electron = window.require("electron");
  const url =
    target.tagName === "SUP" ? target.parentElement.href : target.href;
  electron.shell.openExternal(url);
}
</script>

<style scoped>
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
    background-color: #95EC69;
    width: fit-content;
    grid-column: 1 / span var(--columns);
}

.response {
    background-color: #FFF;
    width: 100%;
    grid-column: auto / span 1;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    padding: 0;
    margin-bottom: 8px;
}

.title img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
}

.markdown-body {
    background-color: inherit;
    font-family: inherit;
}
</style>
