<template>
  <div id="app">
    <header>
      <div class="header-content">
        <img class="logo" src="@/assets/logo-banner.png" alt="ChatALL" />
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

    <footer>
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
        :disabled="
          prompt.trim() === '' || Object.values(activeBots).every((bot) => !bot)
        "
        @click="sendPromptToBots"
      >
        {{ $t("footer.sendPrompt") }}
      </v-btn>
      <div class="bot-logos margin-bottom">
        <img
          v-for="(bot, index) in bots"
          :class="{ selected: activeBots[bot.getClassname()] }"
          :key="index"
          :src="bot.getLogo()"
          :alt="bot.getFullname()"
          :title="bot.getFullname()"
          @click="toggleSelected(bot)"
        />
      </div>
    </footer>
    <MakeAvailableModal
      v-model:open="isMakeAvailableOpen"
      :bot="clickedBot"
      @done="checkAllBotsAvailability(clickedBot)"
    />
    <SettingsModal
      v-model:open="isSettingsOpen"
      @done="checkAllBotsAvailability()"
    />
    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount, reactive } from 'vue';
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

import i18n from "./i18n";
import _bots from "./bots";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

// Composables
import { useMatomo } from '@/composables/matomo';

// Styles
import "@mdi/font/css/materialdesignicons.css";

const store = useStore();
const matomo = useMatomo();

const confirmModal = ref(null);
const prompt = ref("");
const bots = ref(_bots.all);
const activeBots = reactive({});
const clickedBot = ref(null);
const isSettingsOpen = ref(false);
const isMakeAvailableOpen = ref(false);

const columns = computed(() => store.state.columns);
const selectedBots = computed(() => store.state.selectedBots);

const changeColumns = (columns) => store.commit("changeColumns", columns);
const setUuid = (uuid) => store.commit("setUuid", uuid);
const setBotSelected = (uuid) => store.commit("SET_BOT_SELECTED", uuid);

function sendPromptToBots() {
  if (prompt.value.trim() === "") return;
  if (Object.values(activeBots).every((bot) => !bot)) return;

  const toBots = bots.value.filter(
    (bot) => activeBots[bot.getClassname()],
  );

  store.dispatch("sendPrompt", {
    prompt: prompt.value,
    bots: toBots,
  });

  matomo.value.trackEvent(
    "prompt",
    "send",
    "Active bots count",
    toBots.length,
  );
  // Clear the textarea after sending the prompt
  prompt.value = "";
}

function toggleSelected(bot) {
  const botId = bot.getClassname();
  var selected = false;
  if (!bot.isAvailable()) {
    clickedBot.value = bot;
    // Open the bot's settings dialog
    isMakeAvailableOpen.value = true;
    selected = true;
  } else {
    selected = !selectedBots.value[botId];
  }
  setBotSelected({ botId, selected });
  updateActiveBots();
}

function updateActiveBots() {
  for (const bot of bots.value) {
    activeBots[bot.getClassname()] =
      bot.isAvailable() && selectedBots.value[bot.getClassname()];
  }
}

async function checkAllBotsAvailability(specifiedBot = null) {
  try {
    let botsToCheck = bots.value;
    if (specifiedBot) {
      // If a bot is specified, only check bots of the same brand
      botsToCheck = bots.value.filter(
        (bot) =>
          bot.constructor._brandId === specifiedBot.constructor._brandId,
      );
    }

    const checkAvailabilityPromises = botsToCheck.map((bot) =>
      bot
        .checkAvailability()
        .then(() => updateActiveBots())
        .catch((error) => {
          console.error(
            `Error checking login status for ${bot.getFullname()}:`,
            error,
          );
        }),
    );
    await Promise.allSettled(checkAvailabilityPromises);
  } catch (error) {
    console.error("Error checking login status for bots:", error);
  }
}

function openSettingsModal() {
  isSettingsOpen.value = true;
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
  document.title = `ChatALL.ai v${ver}`;
});

onBeforeMount(() => {
  checkAllBotsAvailability();
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
