<template>
  <v-list-item
    density="comfortable"
    v-if="!isEditMode"
    :key="`chat-${props.chat.index}`"
    :active="store.getters.currentChat.index === props.chat.index"
    :title="props.chat.title"
    :value="props.chat.index"
    class="pa-3 pr-0"
    :style="{ cursor: isCursorWait ? 'wait' : 'pointer' }"
    @click="onSelectChat"
  >
    <template v-slot:prepend>
      <v-icon color="primary" class="mr-4"> mdi-message-outline </v-icon>
    </template>
    <template
      #append
      v-if="store.getters.currentChat.index === props.chat.index"
    >
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
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["confirmHideChat", "focusTextarea"]);
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
watch(() => store.state.currentChatIndex, unsetCursorWait);

const isEditMode = ref(false);
const isCursorWait = ref(false);
const chatTitleEditModel = ref("");

async function onSelectChat() {
  if (props.chat.index === store.state.currentChatIndex) return;
  setCursorWait();
  await new Promise((r) => setTimeout(r, 25));
  store.commit("selectChat", props.chat.index);
  emit("focusTextarea");
}

function setCursorWait() {
  document.body.style.cursor = "wait";
  isCursorWait.value = true;
}

function unsetCursorWait() {
  document.body.style.cursor = "";
  isCursorWait.value = false;
}

async function confirmHideChat() {
  emit("confirmHideChat");
}

function editChat() {
  isEditMode.value = true;
  chatTitleEditModel.value = props.chat.title;
}

function confirmEdit() {
  store.commit("editChatTitle", {
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
</style>
