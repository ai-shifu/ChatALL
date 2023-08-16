<template>
  <v-app>
    <v-container fluid style="padding: 0">
      <ChatDrawer
        ref="chatDrawerRef"
        v-model:open="isChatDrawerOpen"
        @focus-textarea="focusPromptTextarea"
      ></ChatDrawer>
      <v-main class="content">
        <v-app-bar class="header-content pa-0">
          <!-- Start Header  -->
          <div class="header-content" v-show="isSelectedResponsesEmpty">
            <v-app-bar-nav-icon
              :id="SHORTCUT_CHAT_DRAWER.elementId"
              variant="text"
              @click.stop="isChatDrawerOpen = !isChatDrawerOpen"
              @shortkey="isChatDrawerOpen = !isChatDrawerOpen"
              v-shortkey="SHORTCUT_CHAT_DRAWER.key"
            >
            </v-app-bar-nav-icon>
            <img
              :class="{ 'dark-png': store.state.theme === Theme.DARK }"
              class="logo"
              src="@/assets/logo-banner.png"
              alt="ChatALL"
            />
          </div>
          <div
            class="column-icons header-content"
            v-show="isSelectedResponsesEmpty"
          >
            <img
              v-for="columnCount in 3"
              :id="`column-${columnCount}`"
              :key="columnCount"
              :src="getColumnImage(columnCount)"
              @click="changeColumns(columnCount)"
              @shortkey="changeColumns(columnCount)"
              v-shortkey="[`f${columnCount}`]"
              :class="{
                selected: columns === columnCount,
                'dark-png': store.state.theme === Theme.DARK,
              }"
            />
          </div>
          <div
            class="header-content"
            style="padding-right: 16px"
            v-show="isSelectedResponsesEmpty"
          >
            <v-icon
              :id="SHORTCUT_FIND.elementId"
              class="cursor-pointer"
              color="primary"
              icon="mdi-magnify"
              size="x-large"
              @click="openFind()"
            ></v-icon>
            <v-icon
              v-shortkey="SHORTCUT_CLEAR_MESSAGES.key"
              @shortkey="clearMessages"
              :id="SHORTCUT_CLEAR_MESSAGES.elementId"
              class="cursor-pointer"
              color="primary"
              icon="mdi-broom"
              size="x-large"
              @click="clearMessages()"
            ></v-icon>
            <v-icon
              v-shortkey="SHORTCUT_SETTINGS.key"
              @shortkey="openSettingsModal"
              :id="SHORTCUT_SETTINGS.elementId"
              class="cursor-pointer"
              color="primary"
              icon="mdi-cog"
              size="x-large"
              @click="openSettingsModal()"
            ></v-icon>
            <v-icon
              v-shortkey="SHORTCUT_SHORTCUT_GUIDE.key"
              @shortkey="toggleShortcutGuide"
              :id="SHORTCUT_SHORTCUT_GUIDE.elementId"
              class="cursor-pointer"
              color="primary"
              icon="mdi-help"
              size="x-large"
              @click="toggleShortcutGuide()"
            ></v-icon>
          </div>
          <!-- End Header  -->
          <!-- Start Selected Responses  -->
          <div
            class="header-content pr-3"
            style="text-wrap: nowrap"
            v-show="!isSelectedResponsesEmpty"
          >
            <v-btn icon color="primary" @click="deselectAll">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            {{
              $t("header.selectedResponsesCount", {
                selectedCount: store.state.selectedResponses.length,
              })
            }}
          </div>
          <div
            class="header-content overflow-auto"
            v-show="!isSelectedResponsesEmpty"
          >
            <v-btn
              v-for="action in userActions"
              color="primary"
              class="no-text-transform"
              :text="action.name"
              :key="action.index"
              @click="callAction(action)"
            ></v-btn>
          </div>
          <!-- End Selected Responses  -->
        </v-app-bar>
        <FindModal ref="findRef"></FindModal>

        <ChatMessages
          :chat-index="store.state.currentChatIndex"
          :columns="columns"
        ></ChatMessages>
        <FooterBar
          ref="footerBarRef"
          @update-active-bots="(bots) => (activeBots = bots)"
        ></FooterBar>
      </v-main>
      <SettingsModal v-model:open="isSettingsOpen" />
      <ConfirmModal ref="confirmModal" />
      <UpdateNotification></UpdateNotification>
      <ShortcutGuide
        ref="shortcutGuideRef"
        v-model:open="isShortcutGuideOpen"
      ></ShortcutGuide>
      <ChatAction
        v-model:open="isChatActionOpen"
        :action="action"
        :responses="store.state.selectedResponses"
        :activeBots="activeBots"
      ></ChatAction>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";

import { useTheme } from "vuetify";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { applyTheme, resolveTheme, Theme } from "./theme";
import {
  SHORTCUT_FIND,
  SHORTCUT_SETTINGS,
  SHORTCUT_SHORTCUT_GUIDE,
  SHORTCUT_CLEAR_MESSAGES,
  SHORTCUT_CHAT_DRAWER,
} from "./components/ShortcutGuide/shortcut.const";

import i18n from "./i18n";

// Components
import ChatDrawer from "@/components/ChatDrawer/ChatDrawer.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import FooterBar from "@/components/Footer/FooterBar.vue";
import UpdateNotification from "@/components/Notification/UpdateNotificationModal.vue";
import FindModal from "@/components/FindModal.vue";
import ShortcutGuide from "@/components/ShortcutGuide/ShortcutGuide.vue";
import ChatAction from "@/components/ChatAction.vue";

// Styles
import "@mdi/font/css/materialdesignicons.css";

const { ipcRenderer } = window.require("electron");

const store = useStore();
const vuetifyTheme = useTheme();
const onUpdatedSystemTheme = async () => {
  const resolvedTheme = await resolveTheme(store.state.mode, ipcRenderer);
  store.commit("setTheme", resolvedTheme);
  applyTheme(resolvedTheme, vuetifyTheme);
};

ipcRenderer.on("on-updated-system-theme", onUpdatedSystemTheme);

const confirmModal = ref(null);
const findRef = ref(null);
const footerBarRef = ref(null);
const shortcutGuideRef = ref(null);
const isShortcutGuideOpen = ref(false);
const isSettingsOpen = ref(false);
const isChatDrawerOpen = ref(store.state.isChatDrawerOpen);
const chatDrawerRef = ref();
const isSelectedResponsesEmpty = ref(true);
const isChatActionOpen = ref(false);

const columns = computed(() => store.state.columns);
const userActions = computed(() => {
  return store.state.actions.filter((p) => !p.hide);
});

const changeColumns = (columns) => store.commit("changeColumns", columns);
const setUuid = (uuid) => store.commit("setUuid", uuid);
let action;
let activeBots;

async function openSettingsModal() {
  if (isSettingsOpen.value) {
    // click too fast
    isSettingsOpen.value = false;
    await nextTick();
  }
  isSettingsOpen.value = true;
}

function openFind() {
  findRef.value.showFindTextField();
}

function toggleShortcutGuide() {
  if (!isChatDrawerOpen.value) {
    // open chat drawer to show new chat shortcut
    isChatDrawerOpen.value = true;
    setTimeout(() => {
      shortcutGuideRef.value.toggleShortcutGuide();
    }, 200);
  } else {
    shortcutGuideRef.value.toggleShortcutGuide();
  }
}

async function clearMessages() {
  const result = await confirmModal.value.showModal(
    i18n.global.t("header.clearMessages"),
  );
  if (result) {
    store.commit("clearMessages");
  }
}

function focusPromptTextarea() {
  footerBarRef.value.focusPromptTextarea();
}

onMounted(() => {
  !store.state.uuid && setUuid(uuidv4());
  window._paq.push(["setUserId", store.state.uuid]);
  window._paq.push(["trackPageView"]);

  const ver = require("../package.json").version;
  document.title = `ChatALL.ai - v${ver}`;
});

watch(
  () => store.state.selectedResponses.length,
  () => {
    isSelectedResponsesEmpty.value = store.state.selectedResponses.length === 0;
  },
);

function getColumnImage(columnCount) {
  return require(`@/assets/column-${columnCount}.svg`);
}

function deselectAll() {
  store.commit("deleteAllSelectedResponses");
}

function callAction(value) {
  action = value;
  isChatActionOpen.value = true;
}
</script>

<style>
@import "katex/dist/katex.min.css";

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
  background-color: rgb(var(--v-theme-background));
}

.cursor-pointer {
  cursor: pointer;
}

.dark-png {
  filter: grayscale(1) brightness(5);
}

.v-toolbar__content {
  justify-content: space-between;
}

.vuepress-markdown-body {
  color: var(--v-theme-font) !important;
}
.vuepress-markdown-body:not(.custom) {
  padding: 0 !important;
  background-color: transparent !important;
}
.vuepress-markdown-body .arrow {
  display: inline !important;
}
.vuepress-markdown-body .arrow.up,
.arrow.down,
.arrow.left,
.arrow.right {
  display: inline-block !important;
}
.vuepress-markdown-body tr:nth-child(2n) {
  background-color: rgb(var(--v-theme-table-tr-2n)) !important;
}
.vuepress-markdown-body code {
  color: rgb(var(--v-theme-code-font)) !important;
  background-color: rgb(var(--v-theme-code-background)) !important;
}
.vuepress-markdown-body pre[class*="v-md-prism-"] code,
.vuepress-markdown-body pre code {
  color: #fff !important;
  background-color: initial !important;
}
.no-text-transform {
  text-transform: none !important;
}
</style>
