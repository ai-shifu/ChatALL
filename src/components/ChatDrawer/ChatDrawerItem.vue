<template>
  <v-list-item
    density="comfortable"
    v-if="!isEditMode"
    :key="`chat-${props.chat.index}`"
    :active="store.getters.currentChat.index === props.chat.index"
    :title="chat.title"
    :value="index"
    style="padding: 0.8rem; padding-right: 0"
    @click="onSelectChat(props.chat.index)"
  >
    <template v-slot:prepend>
      <v-icon color="primary"> mdi-message-outline </v-icon>
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
    style="padding-top: 0.8rem; padding-bottom: 0.8rem"
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
// import { nextTick } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isEditMode = ref(false);
const emit = defineEmits(["confirmHideChat"]);

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

const chatTitleEditModel = ref("");

function onSelectChat(index) {
  store.commit("selectChat", index);
}

async function confirmHideChat() {
  emit("confirmHideChat");
}

function editChat() {
  isEditMode.value = true;
  chatTitleEditModel.value = props.chat.title;
}

function confirmEdit() {
  store.commit("editChatTitle", chatTitleEditModel.value);
  isEditMode.value = false;
}

function onPressEnter(event) {
  if (event.keyCode == 13) {
    confirmEdit();
  }
}
</script>

<style scoped>
:deep() .v-input__prepend{
    margin-left: 0.8rem;
    margin-right: 0.25rem!important;
}
:deep() .v-input__append{
    margin-left: 0!important;
}

:deep() .v-list-item__prepend > i {
    margin-right: 0.5rem!important;
}

:deep() .v-field__field > input {
    padding-left: 0.25rem;
    padding-right: 0.5rem;
}
</style>
