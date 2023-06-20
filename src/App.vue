<template>
  <div id="app">
    <header>
      <div class="header-content">
        <img
          :class="{ 'dark-png': store.state.theme === 'dark' }"
          class="logo"
          src="@/assets/logo-banner.png"
          alt="ChatALL"
        />
        <div class="column-icons">
          <img
            src="@/assets/column-1.svg"
            @click="changeColumns(1)"
            :class="{ selected: columns === 1, 'dark-png': store.state.theme === 'dark' }"
          />
          <img
            src="@/assets/column-2.svg"
            @click="changeColumns(2)"
            :class="{ selected: columns === 2, 'dark-png': store.state.theme === 'dark' }"
          />
          <img
            src="@/assets/column-3.svg"
            @click="changeColumns(3)"
            :class="{ selected: columns === 3, 'dark-png': store.state.theme === 'dark' }"
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
            @click="openSettingsModal()"
          ></v-icon>
        </div>
      </div>
    </header>

    <main class="content">
      <div id="content">
        <ChatMessages :columns="columns"></ChatMessages>
      </div>
    </main>

    <FooterBar></FooterBar>
    <SettingsModal v-model:open="isSettingsOpen" />
    <ConfirmModal ref="confirmModal" />
    <UpdateNotification></UpdateNotification>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
const { ipcRenderer } = window.require("electron");

import i18n from "./i18n";

// Components
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import FooterBar from "@/components/Footer/FooterBar.vue";
import UpdateNotification from "@/components/Notification/UpdateNotificationModal.vue";

// Styles
import "@mdi/font/css/materialdesignicons.css";

const store = useStore();
const theme = useTheme();
const onUpdatedSystemTheme =  async () => {
  if (store.state.mode === 'system') {
    const nativeTheme = await ipcRenderer.invoke('get-native-theme');
    const newTheme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
    theme.global.name.value = newTheme;
    store.commit("setTheme", newTheme);
  }
};
ipcRenderer.on('on-updated-system-theme', onUpdatedSystemTheme);

const confirmModal = ref(null);
const isSettingsOpen = ref(false);

const columns = computed(() => store.state.columns);

const changeColumns = (columns) => store.commit("changeColumns", columns);
const setUuid = (uuid) => store.commit("setUuid", uuid);

function openSettingsModal() {
  isSettingsOpen.value = true;
}

async function clearMessages() {
  const result = await confirmModal.value.showModal(
    i18n.global.t("header.clearMessages"),
  );
  if (result) {
    store.commit("clearMessages");
  }
}

onMounted(() => {
  !store.state.uuid && setUuid(uuidv4());
  window._paq.push(["setUserId", store.state.uuid]);
  window._paq.push(["trackPageView"]);

  const ver = require("../package.json").version;
  document.title = `ChatALL.ai - v${ver}`;
});
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
    background-color: rgb(var(--v-theme-header));
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

img.selected {
  opacity: 1;
}

.content {
    flex: 1;
    background-color: rgb(var(--v-theme-background));
    padding: 16px;
}

.cursor-pointer {
    cursor: pointer;
}

.dark-png {
  filter: grayscale(1) brightness(5);
}
</style>
