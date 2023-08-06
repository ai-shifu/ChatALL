<template>
  <template v-for="(message, index) in messages" :key="index">
    <chat-prompt
      v-if="checkIsMessagePromptTypeAndEmptyResponsesIfTrue(message)"
      :message="message"
      :columns="1"
      :isThread="true"
    ></chat-prompt>
    <template v-else>
      <chat-responses
        v-if="pushResponseAndCheckIsNextMessagePromptType(index, message)"
        :columns="1"
        :responses="responses"
        :threadIndex="props.threadIndex"
        :isThread="true"
        :updateThreadMessage="props.updateThreadMessage"
      ></chat-responses>
    </template>
  </template>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";
import ChatPrompt from "@/components/Messages/ChatPrompt.vue";
import ChatResponses from "@/components/Messages/ChatResponses.vue";

const store = useStore();

const props = defineProps({
  threadIndex: {
    type: Number,
    required: true,
  },
  updateThreadMessage: {
    type: Function,
  },
});

const { threadIndex } = toRefs(props);
const thread = ref(store.getters.currentChat.threads[threadIndex.value]);
const messages = computed(() => {
  return (thread.value ? thread.value.messages : []).filter(
    (message) => !message.hide,
  );
});

let responses = []; // this array store a prompt responses in a thread
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
