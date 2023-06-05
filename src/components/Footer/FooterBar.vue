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
    <MakeAvailableModal
      v-model:open="isMakeAvailableOpen"
      :bot="clickedBot"
      @done="checkAllBotsAvailability(clickedBot)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

import _bots from "@/bots";
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
// Composables
import { useMatomo } from "@/composables/matomo";

const store = useStore();
const matomo = useMatomo();

const activeBots = reactive({});
const bots = ref(_bots.all);
const prompt = ref("");
const selectedBots = computed(() => store.state.selectedBots);
const clickedBot = ref(null);
const isMakeAvailableOpen = ref(false);
const setBotSelected = (uuid) => store.commit("SET_BOT_SELECTED", uuid);

async function checkAllBotsAvailability(specifiedBot = null) {
  try {
    let botsToCheck = bots.value;
    if (specifiedBot) {
      // If a bot is specified, only check bots of the same brand
      botsToCheck = bots.value.filter(
        (bot) => bot.constructor._brandId === specifiedBot.constructor._brandId,
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

onBeforeMount(() => {
  checkAllBotsAvailability();
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
    opacity: 0.3;
    width: 36px;
    height: 36px;
    cursor: pointer;
}

img.selected {
    opacity: 1;
}

.margin-bottom {
    margin-bottom: 5px;
}

/* Override default style of vuetify v-textarea */
.v-textarea--auto-grow textarea{
    overflow: auto !important;
}
</style>
