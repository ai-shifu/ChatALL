<template>
  <div
    class="footer"
    v-shortkey.once="{
      focusPromptTextarea: SHORTCUT_PROMPT_TEXTAREA.key,
      toggleBotsMenu: SHORTCUT_BOTS_MENU.key,
    }"
    @shortkey="handleShortcut"
  >
    <v-textarea
      :id="SHORTCUT_PROMPT_TEXTAREA.elementId"
      v-model="prompt"
      ref="promptTextArea"
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
        prompt.trim() === '' ||
        favBots.filter((favBot) => activeBots[favBot.classname]).length === 0
      "
      @click="sendPromptToBots"
    >
      {{ $t("footer.sendPrompt") }}
    </v-btn>
    <div class="bot-logos margin-bottom">
      <BotLogo
        v-for="(bot, index) in favBots"
        :id="`fav-bot-${index + 1}`"
        :key="index"
        :bot="bot.instance"
        :active="activeBots[bot.classname]"
        size="36"
        @click="toggleSelected(bot.instance)"
        v-shortkey.once="['ctrl', `${index + 1}`]"
        @shortkey="toggleSelected(bot.instance)"
      />
      <BotsMenu
        :id="SHORTCUT_BOTS_MENU.elementId"
        ref="botsMenuRef"
        :favBots="favBots"
      />
    </div>
    <MakeAvailableModal v-model:open="isMakeAvailableOpen" :bot="clickedBot" />
    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive, watch } from "vue";
import { useStore } from "vuex";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import BotLogo from "./BotLogo.vue";
import BotsMenu from "./BotsMenu.vue";

// Composables
import { useMatomo } from "@/composables/matomo";

import _bots from "@/bots";
import {
  SHORTCUT_PROMPT_TEXTAREA,
  SHORTCUT_BOTS_MENU,
} from "./../ShortcutGuide/shortcut.const";

const { ipcRenderer } = window.require("electron");

const store = useStore();
const matomo = useMatomo();

const confirmModal = ref(null);
const promptTextArea = ref(null);
const botsMenuRef = ref(null);

const bots = ref(_bots.all);
const activeBots = reactive({});
const favBots = computed(() => {
  const _favBots = [];
  store.getters.currentChat.favBots.forEach((favBot) => {
    if (_bots.isBotDisabled(favBot.classname)) return;
    _favBots.push({
      ...favBot,
      instance: _bots.getBotByClassName(favBot.classname),
    });
  });
  return _favBots;
});

const prompt = ref("");
const clickedBot = ref(null);
const isMakeAvailableOpen = ref(false);

watch(favBots, async (newValue, oldValue) => {
  const botsToCheck = newValue.filter((newBot) => {
    return !oldValue.some((oldBot) => oldBot.classname === newBot.classname);
  });
  await botsToCheck.forEach(async (favBot) => {
    const bot = favBot.instance;
    if (!bot.isAvailable()) {
      await bot.checkAvailability();
      updateActiveBots();
    }
  });
  updateActiveBots();
});

async function updateActiveBots() {
  for (const favBot of favBots.value) {
    // Unselect the bot if user has not confirmed to use it
    if (favBot.selected) {
      const confirmed = await favBot.instance.confirmBeforeUsing(
        confirmModal.value,
      );
      if (!confirmed) {
        store.commit("setBotSelected", {
          botClassname: favBot.classname,
          selected: false,
        });
      }
    }
    activeBots[favBot.classname] =
      favBot.instance.isAvailable() && favBot.selected;
  }
}

function focusPromptTextarea() {
  promptTextArea.value.$el.querySelector("textarea").focus();
}

function toggleBotsMenu() {
  botsMenuRef.value.toggleMenu();
}

function handleShortcut(event) {
  if (event.srcKey === "focusPromptTextarea") {
    focusPromptTextarea();
  } else if (event.srcKey === "toggleBotsMenu") {
    toggleBotsMenu();
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

function sendPromptToBots() {
  if (prompt.value.trim() === "") return;

  const toBots = favBots.value
    .filter((favBot) => activeBots[favBot.classname])
    .map((favBot) => favBot.instance);

  if (toBots.length === 0) return;

  store.dispatch("sendPrompt", {
    prompt: prompt.value,
    bots: toBots,
  });

  // Clear the textarea after sending the prompt
  prompt.value = "";

  matomo.value?.trackEvent(
    "prompt",
    "send",
    "Active bots count",
    toBots.length,
  );
}

async function toggleSelected(bot) {
  const botClassname = bot.getClassname();
  let selected = false;
  if (activeBots[botClassname]) {
    selected = false;
  } else {
    selected = true;
    if (!bot.isAvailable()) {
      const availability = await bot.checkAvailability();
      if (!availability) {
        clickedBot.value = bot;
        // Open the bot's settings dialog
        isMakeAvailableOpen.value = true;
      } else {
        updateActiveBots();
      }
    }
  }
  store.commit("setBotSelected", { botClassname, selected });
}

onBeforeMount(async () => {
  favBots.value.forEach(async (favBot) => {
    await favBot.instance.checkAvailability();
    updateActiveBots();
  });

  // Listen message trigged by main process
  ipcRenderer.on("CHECK-AVAILABILITY", async (event, url) => {
    const botsToCheck = bots.value.filter((bot) => bot.getLoginUrl() === url);
    botsToCheck.forEach(async (bot) => {
      await bot.checkAvailability();
      updateActiveBots();
    });
  });
});
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;
  box-sizing: border-box;
}

.bot-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.margin-bottom {
  margin-bottom: 5px;
}

/* Override default style of vuetify v-textarea */
.v-textarea--auto-grow textarea {
  overflow: auto !important;
}

textarea::placeholder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
