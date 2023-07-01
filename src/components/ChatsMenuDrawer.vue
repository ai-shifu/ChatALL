<template>
  <v-navigation-drawer
    :model-value="props.open"
    @update:model-value="closeChatDrawer"
  >
    <v-list nav>
      <v-list-item
        density="comfortable"
        class="mb-1"
        border
        prepend-icon="mdi-plus"
        :title="$t('chat.newChat')"
        @click="onAddNewChat"
      ></v-list-item>
    </v-list>

    <v-list-item
      density="comfortable"
      v-for="(chat, index) in store.state.chats.slice().reverse()"
      :key="`chat-${index}`"
      :active="store.getters.currentChat.index === index"
      prepend-icon="mdi-message-outline"
      :title="chat.title"
      :value="index"
      style="padding: 0.8rem"
      @click="onSelectChat(index)"
    >
      <template #append v-if="store.getters.currentChat.index === index">
        <v-icon size="small" color="primary" @click.self="onRemoveChat(index)">
          mdi-delete-outline
        </v-icon>
      </template>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const props = defineProps(["open"]);
const emit = defineEmits(["update:open"]);

function onSelectChat() {}

function onRemoveChat() {}

function onAddNewChat() {
  store.commit("createChat");
}

const closeChatDrawer = () => {
  emit("update:open", false);
};
const openChatDrawer = () => {
  emit("update:open", true);
};

const toggleChatDrawer = () => {
  if (props.open) {
    closeChatDrawer();
  } else {
    openChatDrawer();
  }
};

defineExpose({
  toggleChatDrawer,
});
</script>
<style scoped>
:deep() .v-list-item-title {
  font-size: 1rem!important;
}
</style>
