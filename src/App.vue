<template>
  <div id="app">
    <v-layout>

      <header>
        <div class="header-content">
          <div />
          <div class="column-icons">
            <img
              src="@/assets/column-1.svg"
              @click="changeColumns(1)"
              :class="{ selected: columns === 1 }"
            />
            <img
              src="@/assets/column-2.svg"
              @click="changeColumns(2)"
              :class="{ selected: columns === 2 }"
            />
            <img
              src="@/assets/column-3.svg"
              @click="changeColumns(3)"
              :class="{ selected: columns === 3 }"
            />
          </div>
          <div>
            <v-icon
              class="cursor-pointer"
              color="primary"
              icon="mdi-broom"
              size="x-large"
              @click="clearMessages()"
            ></v-icon>
            <v-icon
              class="cursor-pointer"
              color="primary"
              icon="mdi-cog"
              size="x-large"
              @click="isSettingsOpen = true"
            ></v-icon>
          </div>
        </div>
      </header>

      <ChatsMenuDrawer 
        @create:chat="checkAllBotsAvailability"
      />

      <main class="content pl-10">
        <div id="content">
          <ChatMessages :columns="columns"></ChatMessages>
        </div>
      </main>

      <footer class="ml-14">
        <v-textarea
          v-model="prompt"
          auto-grow
          max-rows="8.5"
          rows="1"
          density="comfortable"
          hide-details
          variant="solo"
          :placeholder="$t('footer.promptPlaceholder')"
          autofocus
          @keydown="filterEnterKey"
          style="min-width: 390px"
        ></v-textarea>
        <v-btn
          color="primary"
          elevation="2"
          class="margin-bottom"
          :disabled="prompt.trim() === '' || !currentChatActiveBotNames.length"
          @click="sendPromptToBots"
        >
          {{ $t("footer.sendPrompt") }}
        </v-btn>
        <div class="bot-logos margin-bottom">
          <template 
            v-for="botData in availableBotsData"
            :key="`bot-logo-${botData.name}`"
          >
            <img
              :class="{ selected: currentChatActiveBotNames.indexOf(botData.name) > -1 }"
              :src="botData.logo"
              :alt="botData.fullName"
              :title="botData.fullName"
              @click="onClickBot(botData.name)"
            />
          </template>
        </div>
      </footer>

      <MakeAvailableModal
        v-model:open="isMakeAvailableOpen"
        :bot="clickedBotInstance"
        @done="checkAllBotsAvailability(clickedBotInstance)"
      />
      <SettingsModal
        v-model:open="isSettingsOpen"
        @done="checkAllBotsAvailability()"
      />
    
    </v-layout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

import i18n from "./i18n";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import ChatsMenuDrawer from "@/components/ChatsMenuDrawer.vue"

// Composables
import { useMatomo } from '@/composables/matomo';
import { useChatBots } from "@/composables/chat-bots";

// Styles
import "@mdi/font/css/materialdesignicons.css";

const store = useStore();
const matomo = useMatomo();
const { 
  currentChatId, 
  availableBotsData, 
  currentChatActiveBotNames,
  currentChatActiveBotInstances,
  isMakeAvailableOpen,
  clickedBotInstance,
  checkAllBotsAvailability,
} = useChatBots();

const prompt = ref("");
const isSettingsOpen = ref(false);

const columns = computed(() => store.getters["appModule/getColumns"]);
const uuid = computed(() => store.getters["appModule/getUuid"]);

const changeColumns = (columns) => store.commit("appModule/CHANGE_COLUMNS", columns);
const setUuid = (uuid) => store.commit("appModule/SET_UUID", uuid);

function sendPromptToBots() {
  if (prompt.value.trim() === "") return;
  if (currentChatActiveBotInstances.value.length === 0) return;

  store.dispatch("chatsModule/sendPrompt", {
    prompt: prompt.value,
    botInstances: currentChatActiveBotInstances.value,
  });

  matomo.value.trackEvent(
    "prompt",
    "send",
    "Active bots count",
    currentChatActiveBotNames.value.length,
  );

  prompt.value = "";
}

function onClickBot(botName) {
  if ( currentChatActiveBotNames.value.indexOf(botName) === -1 ) {
    currentChatActiveBotNames.value = [...currentChatActiveBotNames.value, botName]
  } else {
    currentChatActiveBotNames.value = currentChatActiveBotNames.value.filter((bot) => bot !== botName)
  }  
}

// Send the prompt when the user presses enter and prevent the default behavior
// But if the shift, ctrl, alt, or meta keys are pressed, do as default
function filterEnterKey(event) {
  if (
    event.keyCode == 13 &&
    !event.shiftKey &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    event.preventDefault();
    sendPromptToBots();
  }
}

function clearMessages() {
  if (window.confirm(i18n.global.t("header.clearMessages"))) {
    store.dispatch("chatsModule/clearChatMessages");
  }
}

function initChat() {
  if (currentChatId.value) {
    return;
  }
  store.dispatch('chatsModule/createChat')
}

onBeforeMount(() => {
  initChat();
  checkAllBotsAvailability();  
})

onMounted(() => {
  uuid.value && setUuid(uuidv4());
  window._paq.push(["setUserId", uuid.value]);
  window._paq.push(["trackPageView"]);
})

</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Arial", sans-serif;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 16px;
    z-index: 999;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
  height: 40px;
}

.column-icons img {
    opacity: 0.5;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin: 4px;
}

.bot-logos {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

.bot-logos img {
    opacity: 0.3;
    width: 36px;
    height: 36px;
    cursor: pointer;
}

img.selected {
    opacity: 1;
}

.content {
    flex: 1;
    background-color: #f3f3f3;
    padding: 16px;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;
    box-sizing: border-box;
}

.margin-bottom {
    margin-bottom: 5px;
}

.cursor-pointer {
    cursor: pointer;
}

/* Override default style of vuetify v-textarea */
.v-textarea--auto-grow textarea{
    overflow: auto !important;
}
</style>
