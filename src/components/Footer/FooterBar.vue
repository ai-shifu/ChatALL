<template>
  <div class="footer">
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
    <MakeAvailableModal v-model:open="isMakeAvailableOpen" :bot="clickedBot" />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";

// Composables
import { useMatomo } from "@/composables/matomo";

import _bots from "@/bots";

const { ipcRenderer } = window.require("electron");

const store = useStore();
const matomo = useMatomo();

const activeBots = reactive({});
const bots = ref(_bots.all);
const prompt = ref("");
const selectedBots = computed(() => store.state.selectedBots);
const clickedBot = ref(null);
const isMakeAvailableOpen = ref(false);
const setBotSelected = (uuid) => store.commit("SET_BOT_SELECTED", uuid);

function updateActiveBots() {
  for (const bot of bots.value) {
    activeBots[bot.getClassname()] =
      bot.isAvailable() && selectedBots.value[bot.getClassname()];
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
  if (Object.values(activeBots).every((bot) => !bot)) return;

  const toBots = bots.value.filter((bot) => activeBots[bot.getClassname()]);

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
  const botId = bot.getClassname();
  let selected = false;
  if (activeBots[botId]) {
    selected = false;
  } else {
    selected = true;
    if (!bot.isAvailable()) {
      const availability = await bot.checkAvailability();
      if (!availability) {
        clickedBot.value = bot;
        // Open the bot's settings dialog
        isMakeAvailableOpen.value = true;
      }
    }
  }
  setBotSelected({ botId, selected });
  updateActiveBots();
}

onBeforeMount(async () => {
  bots.value.forEach(async (bot) => {
    await bot.checkAvailability();
    updateActiveBots();
  });

  // Listen message trigged by main process
  ipcRenderer.on("CHECK-AVAILABILITY", async (event, url) => {
    const bot = bots.value.find((bot) => bot.getLoginUrl() === url);
    if (bot) {
      await bot.checkAvailability();
      updateActiveBots();
    }
  });
});
</script>

<style>
.footer {
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

.bot-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.bot-logos img {
  opacity: 0.5;
  filter: grayscale(100%);
  width: 36px;
  height: 36px;
  cursor: pointer;
}

img.selected {
  opacity: 1;
  filter: grayscale(0%);
}

.margin-bottom {
  margin-bottom: 5px;
}

/* Override default style of vuetify v-textarea */
.v-textarea--auto-grow textarea {
  overflow: auto !important;
}
</style>
