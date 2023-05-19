<template>
  <v-card
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

<script>
import Markdown from "vue3-markdown-it";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css";
import i18n from "@/i18n";

export default {
  components: {
    Markdown,
  },
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    this.$el.style.setProperty("--columns", this.columns);
  },
  watch: {
    columns() {
      this.$el.style.setProperty("--columns", this.columns);
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.message.content);
      this.$matomo.trackEvent("vote", "copy", this.message.className, 1);
    },
    toggleHighlight() {
      this.$emit("update-message", this.message.index, {
        highlight: !this.message.highlight,
      });
      this.$matomo.trackEvent(
        "vote",
        "highlight",
        this.message.className,
        this.message.highlight ? -1 : 1,
      );
    },
    hide() {
      if (window.confirm(i18n.global.t("modal.confirmHide"))) {
        this.$emit("update-message", this.message.index, { hide: true });
        this.$matomo.trackEvent("vote", "hide", this.message.className, 1);
      }
    },
    handleClick(event) {
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
    },
  },
};
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
