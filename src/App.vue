<template>
    <div id="app">
        <header>
            <div class="header-content">
                <img class="logo" src="@/assets/logo-banner.png" alt="ChatALL" />
                <div class="column-icons">
                    <img
                        src="@/assets/column-1.svg"
                        @click="changeColumns(1)"
                        :class="{ 'selected': columns === 1 }"
                    />
                    <img
                        src="@/assets/column-2.svg"
                        @click="changeColumns(2)"
                        :class="{ 'selected': columns === 2 }"
                    />
                    <img
                        src="@/assets/column-3.svg"
                        @click="changeColumns(3)"
                        :class="{ 'selected': columns === 3 }"
                    />
                </div>
                <v-icon 
                    class="cursor-pointer" 
                    color="primary" 
                    icon="mdi-cog" 
                    size="x-large"
                    @click="openSettingsModal()"
                ></v-icon>
            </div>
        </header>
        <main class="content">
            <div id="content">
                <ChatMessages :columns="columns" ref="chatMessages"></ChatMessages>
            </div>
        </main>
        <footer>
            <v-textarea
                v-model="prompt"
                auto-grow
                max-rows=8.5
                rows=1
                density="comfortable"
                hide-details
                variant="solo"
                :placeholder="$t('footer.promptPlaceholder')"
                autofocus
                @keydown="filterEnterKey"
            ></v-textarea>
            <v-btn
                color="primary"
                elevation="2"
                class="margin-bottom"
                :disabled="prompt.trim() === '' || Object.values(activeBots).every(bot => !bot)"
                @click="sendPromptToBots"
            >
                {{ $t("footer.sendPrompt") }}
            </v-btn>
            <div class="bot-logos margin-bottom">
                <img
                    v-for="(bot, index) in bots"
                    :class="{ 'selected': activeBots[bot.constructor._className] }"
                    :key="index"
                    :src="bot.getLogo()"
                    :alt="bot.getFullname()"
                    :title="bot.getFullname()"
                    @click="toggleSelected(bot)"
                />
            </div>
        </footer>
        <MakeAvailableModal
            :bot="clickedBot"
            ref="makeAvailableModal"
            @done="checkAllBotsAvailability()"
        ></MakeAvailableModal>
        <SettingsModal
            ref="settingsModal"
        ></SettingsModal>
    </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import { mapState, mapMutations } from "vuex";

// Components
import MakeAvailableModal from "@/components/MakeAvailableModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from '@/components/SettingsModal.vue';

// Bots
import ChatGPT35Bot from "./bots/ChatGPT35Bot";
import ChatGPT4Bot from "./bots/ChatGPT4Bot";
import BingChatPreciseBot from "./bots/BingChatPreciseBot";
import BingChatBalancedBot from "./bots/BingChatBalancedBot";
import BingChatCreativeBot from "./bots/BingChatCreativeBot";
import SparkBot from "./bots/SparkBot";
import BardBot from "./bots/BardBot";
import OpenAIAPI35Bot from "./bots/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "./bots/OpenAIAPI4Bot";
import MOSSBot from "./bots/MOSSBot";
import WenxinQianfanBot from './bots/WenxinQianfanBot';

export default {
    name: "App",
    components: {
        ChatMessages,
        MakeAvailableModal,
        SettingsModal,
    },
    data() {
        return {
            prompt: "",
            clickedBot: {},
            bots: [
                ChatGPT35Bot.getInstance(),
                ChatGPT4Bot.getInstance(),
                OpenAIAPI35Bot.getInstance(),
                OpenAIAPI4Bot.getInstance(),
                BingChatCreativeBot.getInstance(),
                BingChatBalancedBot.getInstance(),
                BingChatPreciseBot.getInstance(),
                WenxinQianfanBot.getInstance(),
                SparkBot.getInstance(),
                MOSSBot.getInstance(),
                BardBot.getInstance(),
            ],
            activeBots: {},
        };
    },
    methods: {
        async sendPromptToBots() {
            if (this.prompt.trim() === "") return;
            if (Object.values(this.activeBots).every(bot => !bot)) return;

            // Add a new prompt message to the messages array
            this.$refs.chatMessages.messages.push({
                type: "prompt",
                content: this.prompt,
                done: true
            });

            let count = 0;
            // Send the prompt to all the bots and update the message with the response
            for (const bot of this.bots) {
                if (!this.activeBots[bot.constructor._className])
                    continue;

                count++;
                var message = {
                    type: "response",
                    content: "",
                    logo: bot.getLogo(),
                    name: bot.getFullname(),
                    done: false,
                };
                bot.sendPrompt(
                    this.prompt,
                    this.$refs.chatMessages.updateMessage,
                    this.$refs.chatMessages.messages.push(message) - 1 // The index of the message in the messages array
                );
                this.$matomo.trackEvent("prompt", "sendTo", bot.constructor._className);
            }
            this.$matomo.trackEvent("prompt", "send", "Active bots count", count);

            // Clear the textarea after sending the prompt
            this.prompt = "";
        },
        ...mapMutations(["changeColumns"]),
        ...mapMutations(["SET_BOT_SELECTED"]),
        toggleSelected(bot) {
            const botId = bot.constructor._className;
            var selected = false;
            if (!bot.isAvailable()) {
                this.clickedBot = bot;
                // Open the bot's settings dialog
                this.$refs.makeAvailableModal.open();
                selected = true;
            } else {
                selected = !this.selectedBots[bot.constructor._className];
            }
            this.SET_BOT_SELECTED({ botId, selected});
            this.updateActiveBots();
        },
        updateActiveBots() {
            for (const bot of this.bots) {
                this.activeBots[bot.constructor._className] = bot.isAvailable() && this.selectedBots[bot.constructor._className];
            }
        },
        async checkAllBotsAvailability(specifiedBot) {
            try {
                let botsToCheck = specifiedBot ? [specifiedBot] : this.bots;

                const checkAvailabilityPromises = botsToCheck.map(bot =>
                    bot
                        .checkAvailability()
                        .then(() => this.updateActiveBots())
                        .catch(error => {
                            console.error(`Error checking login status for ${ bot.getFullname() }:`, error);
                        })
                );
                await Promise.allSettled(checkAvailabilityPromises);
            } catch (error) {
                console.error("Error checking login status for bots:", error);
            }
        },
        openSettingsModal() {
            this.$refs.settingsModal.open();
        },
        // Send the prompt when the user presses enter and prevent the default behavior
        // But if the shift, ctrl, alt, or meta keys are pressed, do as default
        filterEnterKey(event) {
            if (event.keyCode == 13 && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
                event.preventDefault();
                this.sendPromptToBots();
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
        this.$matomo && this.$matomo.trackPageView();
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
    align-items: end;
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
