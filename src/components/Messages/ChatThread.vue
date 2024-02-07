<template>
  <template v-for="(message, index) in currentChatMessages" :key="index">
    <chat-prompt
      v-if="message.type === 'prompt'"
      :message="message"
      :columns="1"
      :isThread="true"
    ></chat-prompt>
    <chat-response
      v-else
      :chat="chat"
      :columns="1"
      :messages="message"
      :messagePromptIndex="messagePromptIndex"
      :isThread="true"
    ></chat-response>
  </template>
</template>

<script setup>
import ChatPrompt from "@/components/Messages/ChatPrompt.vue";
import ChatResponse from "@/components/Messages/ChatResponse.vue";
import Threads from "@/store/threads";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { nextTick } from "vue";
import { autoScrollToBottom } from "@/helpers/scroll-helper";

const props = defineProps({
  chat: {
    type: Object,
  },
  messageIndex: {
    type: String,
    required: true,
  },
  messagePromptIndex: {
    type: String,
    required: true,
  },
});

const currentChatMessages = useObservable(
  liveQuery(async () => {
    const keys = await Threads.table
      .where("messageIndex")
      .equals(props.messageIndex)
      .primaryKeys();
    console.log("thread key count: ", keys.length);
    const messages = await Threads.table.bulkGet(keys);
    messages.sort((a, b) => a.createdTime - b.createdTime);

    const groupedMessage = [];
    let responses = Object.create(null);
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.type === "prompt") {
        if (Object.keys(responses).length !== 0) {
          groupedMessage.push.apply(groupedMessage, Object.values(responses));
        }
        groupedMessage.push(message);
        responses = Object.create(null);
        continue;
      }

      if (message.hide !== true) {
        if (!responses[message.className]) {
          responses[message.className] = [];
        }
        responses[message.className].push(message);
      }
    }
    if (Object.keys(responses).length !== 0) {
      groupedMessage.push.apply(groupedMessage, Object.values(responses));
    }

    currentChatMessages.value = groupedMessage;
    nextTick(() => autoScrollToBottom());
    console.log("groupedMessage threads: ", groupedMessage);
    return groupedMessage;
  }),
);
</script>
