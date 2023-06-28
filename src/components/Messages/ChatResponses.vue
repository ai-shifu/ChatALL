<template>
  <template v-for="(grouped, index) in groupedResponses" :key="index">
    <chat-response
      :columns="columns"
      :messages="grouped"
      :isThread="props.isThread"
      :threadIndex="props.threadIndex"
      @update-message="props.updateMessage"
      @update-thread-message="props.updateThreadMessage"
    ></chat-response>
  </template>
</template>

<script setup>
import { computed } from "vue";
import ChatResponse from "./ChatResponse.vue";

const props = defineProps({
  responses: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    required: true,
  },
  updateMessage: {
    type: Function,
  },
  updateThreadMessage: {
    type: Function,
  },
  threadIndex: {
    type: Number,
    required: false,
  },
  isThread: {
    type: Boolean,
    default: false,
  },
});

const groupedResponses = computed(() => {
  // group by bot class name
  // group responses' from same bot in an array to populate to v-carousel
  return props.responses.reduce(function (r, a) {
    r[a.className] = r[a.className] || [];
    r[a.className].push(a);
    return r;
  }, Object.create(null));
});
</script>
