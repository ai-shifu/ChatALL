<template>
  <div class="footer"
    v-shortkey.once="['ctrl', 'k']" 
    @shortkey="focusPromptTextarea"
  >
  <v-autocomplete
      v-model="prompt"
      ref="promptTextArea"
      :items="autocompleteItems"
      item-title="name"
      item-value="ind"
      :menu-props="{ closeOnContentClick: true }"
      :hide-no-data="true"
      :label="$t('footer.promptPlaceholder')"
      auto-grow
      max-rows="8.5"
      rows="1"
      density="comfortable"
      hide-details
      variant="solo"
      autofocus
      @keydown="filterEnterKey"
      @input="changePrompt"
      style="min-width: 390px"
    ></v-autocomplete>
    <v-btn
      color="primary"
      elevation="2"
      class="margin-bottom"
      :disabled="
        prompt && (prompt.trim() === '' ||
        favBots.filter((favBot) => activeBots[favBot.classname]).length === 0)
      "
      @click="sendPromptToBots"
    >
      {{ $t("footer.sendPrompt") }}
    </v-btn>
    <div class="bot-logos margin-bottom">
      <BotLogo
        v-for="(bot, index) in favBots"
        :key="index"
        :bot="bot.instance"
        :active="activeBots[bot.classname]"
        size="36"
        @click="toggleSelected(bot.instance)"
        v-shortkey.once="['ctrl', `${index + 1}`]"
        @shortkey="toggleSelected(bot.instance)" 
      />
      <BotsMenu :favBots="favBots" />
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
const { ipcRenderer } = window.require("electron");


const store = useStore();
const matomo = useMatomo();

const confirmModal = ref(null);
const promptTextArea = ref(null);

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
const autocompleteItems = computed(() => {
  const messages = store.getters.currentChat.messages.filter(
    (message) => !message.hide,
  );
  const items = messages
    .filter((d) => d.type == "prompt")
    .map((d) => ({ name: d.content, ind: d.content }));
  const set = new Set(items);
  const its = Array.from(set);
  return its;
});
function changePrompt(evt) {
  const value = evt.target.value;
  if (
    value
  ) {
    prompt.value = value;
  }
}
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
  promptTextArea.value.$el.querySelector('textarea').focus()
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
    promptTextArea.value.menu = false; // close menu popup
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
