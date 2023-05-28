<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()

const emits = defineEmits(['create:chat'])

const chats = computed(() => store.getters['chatsModule/getChats'])
const messages = computed(() => store.getters['chatsModule/getMessages'])
const currentChatId = computed(() => store.getters['chatsModule/getCurrentChatId']) 

async function onAddNewChat() {
  if (chats.value.length && !messages.value.length) {
    return
  }
  await store.dispatch('chatsModule/createChat')
  emits('create:chat')
}

async function onRemoveChat(chatId) {
  await store.dispatch('chatsModule/deleteChat', chatId)
}

function onSelectChat(chatId) {
  store.commit('chatsModule/UPDATE_ACTIVE_CHAT_ID', chatId)
}

</script>

<template>
  <v-navigation-drawer 
    permanent 
    rail 
    expand-on-hover
  >
    <v-list>
      <!-- App Logo -->
      <v-list-item>
        <img class="logo" src="@/assets/logo-banner.png" alt="ChatALL" />
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- Add button -->
      <v-list-item 
        class="mb-4" 
        border 
        prepend-icon="mdi-plus" 
        title="New chat" 
        @click="onAddNewChat"
      ></v-list-item>

      <!-- Chats list -->
      <v-list-item
        v-for="chat in chats" 
        :key="`chat-${chat.id}`"
        @click="onSelectChat(chat.id)"
        :active="currentChatId === chat.id"
        prepend-icon="mdi-message-outline" 
        :title="chat.title"
        :value="chat.id"
      >
        <template #append>
          <v-icon
            v-if="chat.id === currentChatId"
            size="small" 
            color="red" 
            @click.self="onRemoveChat(chat.id)"
          >
            mdi-delete-outline
          </v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>