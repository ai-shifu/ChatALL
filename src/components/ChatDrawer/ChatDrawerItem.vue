<template>
  <v-list-item
    density="comfortable"
    v-if="!isEditMode"
    :key="`chat-${props.chat.index}`"
    :active="props.currentChatIndex === props.chat.index"
    :title="props.chat.title"
    :value="props.chat.index"
    class="pa-3 pr-0"
    :style="{ cursor: isCursorWait ? 'wait' : 'pointer' }"
    @click="onSelectChat"
  >
    <template v-slot:prepend>
      <v-icon color="primary" class="mr-4"> mdi-message-outline </v-icon>
    </template>
    <template #append v-if="props.currentChatIndex === props.chat.index">
      <v-btn
        flat
        size="x-small"
        icon="mdi-pencil-outline"
        @click="editChat"
        style="background-color: transparent"
      ></v-btn>
      <v-btn
        flat
        size="x-small"
        icon="mdi-delete-outline"
        @click="confirmHideChat"
        style="margin: 0; background-color: transparent"
      ></v-btn>
    </template>
  </v-list-item>
  <v-text-field
    autofocus
    :key="`chat-${index}`"
    v-if="isEditMode"
    v-model="chatTitleEditModel"
    color="primary"
    density="compact"
    @keydown="onPressEnter"
    @focus="$event.target.select()"
    style="padding: 6px"
    class="pl-3 pr-0"
    hide-details
  >
    <template v-slot:prepend>
      <v-icon color="primary"> mdi-message-outline </v-icon>
    </template>
    <template v-slot:append>
      <v-btn flat size="x-small" icon="mdi-check" @click="confirmEdit"></v-btn>
      <v-btn
        flat
        size="x-small"
        icon="mdi-close"
        @click="isEditMode = false"
      ></v-btn>
    </template>
  </v-text-field>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits([
  "hideChat",
  "editChatTitle",
  "selectChat",
  "focusTextarea",
]);
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
  currentChatIndex: {
    type: String,
    required: true,
  },
});

const isEditMode = ref(false);
const isCursorWait = ref(false);
const chatTitleEditModel = ref("");

async function onSelectChat() {
  emit("selectChat", props.chat.index);
}

async function confirmHideChat() {
  emit("hideChat");
}

function editChat() {
  isEditMode.value = true;
  chatTitleEditModel.value = props.chat.title;
}

function confirmEdit() {
  emit("editChatTitle", {
    title: chatTitleEditModel.value,
    isEditedByUser: true,
  });
  isEditMode.value = false;
}

function onPressEnter(event) {
  if (event.keyCode == 13) {
    confirmEdit();
  }
}
</script>

<style scoped>
:deep() .v-input__append {
  margin-left: 0 !important;
}

:deep() .v-input__prepend {
  margin-right: 0.25rem !important;
}

:deep() .v-field__input {
  padding-left: 12px;
  padding-right: 0;
}

:deep() i.v-icon {
  color: rgb(var(--v-theme-primary));
}

:deep() div.v-list-item__prepend {
  display: block;
}
</style>
