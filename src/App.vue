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

<script>
import "@mdi/font/css/materialdesignicons.css";
import { mapState, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";

import i18n from "./i18n";
import store from "./store";
import bots from "./bots";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from "@/components/SettingsModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  name: "App",
  components: {
    ChatMessages,
    MakeAvailableModal,
    SettingsModal,
    ConfirmModal,
  },
  data() {
    return {
      prompt: "",
      bots: bots.all,
      activeBots: {},

      clickedBot: null,
      isMakeAvailableOpen: false,

      isSettingsOpen: false,
    };
  },
  methods: {
    async sendPromptToBots() {
      if (this.prompt.trim() === "") return;
      if (Object.values(this.activeBots).every((bot) => !bot)) return;

      const toBots = bots.all.filter(
        (bot) => this.activeBots[bot.getClassname()],
      );

      this.$store.dispatch("sendPrompt", {
        prompt: this.prompt,
        bots: toBots,
      });

      this.$matomo.trackEvent(
        "prompt",
        "send",
        "Active bots count",
        toBots.length,
      );
      // Clear the textarea after sending the prompt
      this.prompt = "";
    },
    ...mapMutations(["changeColumns"]),
    ...mapMutations(["setUuid"]),
    ...mapMutations(["SET_BOT_SELECTED"]),
    toggleSelected(bot) {
      const botId = bot.getClassname();
      var selected = false;
      if (!bot.isAvailable()) {
        this.clickedBot = bot;
        // Open the bot's settings dialog
        this.isMakeAvailableOpen = true;
        selected = true;
      } else {
        selected = !this.selectedBots[botId];
      }
      this.SET_BOT_SELECTED({ botId, selected });
      this.updateActiveBots();
    },
    updateActiveBots() {
      for (const bot of bots.all) {
        this.activeBots[bot.getClassname()] =
          bot.isAvailable() && this.selectedBots[bot.getClassname()];
      }
    },
    async checkAllBotsAvailability(specifiedBot = null) {
      try {
        let botsToCheck = bots.all;
        if (specifiedBot) {
          // If a bot is specified, only check bots of the same brand
          botsToCheck = bots.all.filter(
            (bot) =>
              bot.constructor._brandId === specifiedBot.constructor._brandId,
          );
        }

        const checkAvailabilityPromises = botsToCheck.map((bot) =>
          bot
            .checkAvailability()
            .then(() => this.updateActiveBots())
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
    },
    openSettingsModal() {
      this.isSettingsOpen = true;
    },
    // Send the prompt when the user presses enter and prevent the default behavior
    // But if the shift, ctrl, alt, or meta keys are pressed, do as default
    filterEnterKey(event) {
      if (
        event.keyCode == 13 &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        this.sendPromptToBots();
      }
    },
    async clearMessages() {
      const result = await this.$refs.confirmModal.showModal(
        i18n.global.t("header.clearMessages"),
      );
      if (result) {
        this.$store.commit("clearMessages");
      }
    },
  },
  computed: {
    ...mapState(["columns"]),
    ...mapState(["selectedBots"]),
  },
  created() {
    this.checkAllBotsAvailability();
  },
  mounted() {
    !store.state.uuid && this.setUuid(uuidv4());
    window._paq.push(["setUserId", store.state.uuid]);
    window._paq.push(["trackPageView"]);

    const ver = require("../package.json").version;
    document.title = `ChatALL v${ver}`;
  },
};
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
