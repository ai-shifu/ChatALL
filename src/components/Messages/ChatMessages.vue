<template>
  <div class="messages">
    <div
      class="message-grid"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
    >
      <chat-message
        v-for="(message, index) in this.filteredMessages"
        :key="index"
        :columns="columns"
        :message="message"
        @update-message="updateMessage"
      ></chat-message>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ChatMessage from "./ChatMessage.vue";

export default {
  components: {
    ChatMessage,
  },
  props: {
    columns: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      autoScroll: true,
    };
  },
  computed: {
    gridTemplateColumns() {
      return `repeat(${this.columns}, 1fr)`;
    },
    filteredMessages() {
      return this.messages.filter((message) => !message.hide);
    },
    ...mapState(["messages"]),
  },
  created() {
    this.messages.forEach((message) => {
      message.done = true;
    });
    window.addEventListener("scroll", this.onScroll);
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  watch: {
    "messages.length"() {
      this.$nextTick(() => {
        if (this.autoScroll) {
          this.scrollToBottom();
        }
      });
    },
  },
  methods: {
    // Update the chat-message with the new message
    updateMessage(index, values) {
      const message = this.messages[index];
      this.messages[index] = {
        ...message,
        ...values,
      };

      if (values.done) {
        this.$matomo.trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
        this.setMessages(this.messages);
      }

      if (values.hide !== undefined) {
        this.$matomo.trackEvent(
          "vote",
          "hide",
          message.className,
          values.hide ? 1 : -1,
        );
        this.setMessages(this.messages);
      }

      if (values.highlight !== undefined) {
        this.$matomo.trackEvent(
          "vote",
          "highlight",
          message.className,
          values.highlight ? 1 : -1,
        );
        this.setMessages(this.messages);
      }

      this.$nextTick(() => {
        if (this.autoScroll) {
          this.scrollToBottom();
        }
      });
    },
    onScroll() {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      this.autoScroll =
        scrollPosition >= document.documentElement.scrollHeight - 10;
    },
    scrollToBottom() {
      window.scrollTo(0, document.documentElement.scrollHeight);
    },
    clearMessages() {
      this.setMessages([]);
    },
    ...mapMutations(["setMessages"]),
  },
};
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
    margin: 68px 32px;
}

.message-grid {
    display: grid;
    grid-gap: 16px;
    width: 100%;
}
</style>
