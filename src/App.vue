<template>
    <div id="app">
        <header>
            <div class="header-content">
                <img class="logo" src="@/assets/logo.png" alt="ChatALL" />
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
        <footer :style="{ height: footerHeight + 'px' }">
            <textarea class="prompt-input"
                ref="textarea"
                placeholder="Type your message here..."
                @input="resizeFooter"
            ></textarea>
            <button class="send-button" @click="sendPromptToBots">{{ $t("footer.sendPrompt") }}</button>
            <div class="bot-logos">
                <img
                    v-for="(bot, index) in bots"
                    :class="{ 'selected': activeBots[bot.getId()] }"
                    :key="index"
                    :src="bot.getLogo()"
                    :alt="$t(bot.getDisplayName())"
                    :title="$t(bot.getDisplayName())"
                    @click="toggleSelected(bot)"
                />
            </div>
        </footer>
        <CreateWindowModal
            :show="showCreateWindowModal"
            :bot="clickedBot"
            @close="updateActiveBots(); showCreateWindowModal = false"
        ></CreateWindowModal>
        <SettingsModal
            ref="settingsModal"
        ></SettingsModal>
    </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import { mapState, mapMutations } from "vuex";

// Components
import CreateWindowModal from "@/components/CreateWindowModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import SettingsModal from '@/components/SettingsModal.vue';

// Bots
import ChatGPTBot from "./bots/ChatGPTBot";
import BingChatBot from "./bots/BingChatBot";
import BardBot from "./bots/BardBot";
import ERNIEBot from "./bots/ERNIEBot";

export default {
    name: "App",
    components: {
        ChatMessages,
        CreateWindowModal,
        SettingsModal,
    },
    data() {
        return {
            footerHeight: 60,
            showCreateWindowModal: false,
            showSettingsModal: false,
            clickedBot: {},
            bots: [
                ChatGPTBot.getInstance(),
                BingChatBot.getInstance(),
                BardBot.getInstance(),
                ERNIEBot.getInstance(),
            ],
            activeBots: {},
        };
    },
    methods: {
        resizeFooter() {
            const lineHeight = 20; // Adjust this value according to your desired line height
            const minRows = 1;
            const maxRows = 10;

            const textarea = this.$refs.textarea;
            textarea.style.height = "auto";
            const numRows = Math.min(
                Math.max(textarea.scrollHeight / lineHeight, minRows),
                maxRows
            );
            textarea.style.height = numRows * lineHeight + "px";

            this.footerHeight = numRows * lineHeight + 40; // Adjust this value based on your desired padding and button height
        },
        async sendPromptToBots() {
            const prompt = this.$refs.textarea.value;

            // Add a new prompt message to the messages array
            this.$refs.chatMessages.messages.push({ type: "prompt", content: prompt });

            // Send the prompt to all the bots and update the message with the response
            for (const bot of this.bots) {
                if (!this.activeBots[bot.getId()])
                    continue;

                var message = {
                    type: "response",
                    content: "",
                    logo: bot.getLogo(),
                    name: this.$t(bot.getDisplayName()),
                };
                bot.sendPrompt(
                    prompt,
                    this.$refs.chatMessages.updateMessage,
                    this.$refs.chatMessages.messages.push(message) - 1 // The index of the message in the messages array
                );
            }

            // Clear the textarea after sending the prompt
            this.$refs.textarea.value = "";
        },
        ...mapMutations(["changeColumns"]),
        ...mapMutations(["SET_BOT_SELECTED"]),
        toggleSelected(bot) {
            const botId = bot.getId();
            var selected = false;
            if (!bot.isLoggedIn()) {
                // Open the login window
                this.clickedBot = bot;
                this.showCreateWindowModal = true;
                selected = true;
            } else {
                selected = !this.selectedBots[bot.getId()];
            }
            this.SET_BOT_SELECTED({ botId, selected});
            this.updateActiveBots();
        },
        updateActiveBots() {
            for (const bot of this.bots) {
                this.activeBots[bot.getId()] = bot.isLoggedIn() && this.selectedBots[bot.getId()];
            }
        },
        async checkAllBotsLoginStatus() {
            try {
                const checkLoginPromises = this.bots.map(bot => bot.checkLoginStatus());
                await Promise.all(checkLoginPromises);
                this.updateActiveBots();
            } catch (error) {
                console.error("Error checking login status for all bots:", error);
            }
        },
        openSettingsModal() {
            this.$refs.settingsModal.open();
        },
    },
    computed: {
        ...mapState(["columns"]),
        ...mapState(["selectedBots"]),
    },
    created() {
        this.checkAllBotsLoginStatus();
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
    opacity: 0.5;
    width: 32px;
    height: 32px;
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
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;
    box-sizing: border-box;
}

.prompt-input {
    width: 100%;
    height: 40px;
    resize: none;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 4px;
    box-sizing: border-box;
    outline: none;
}

.send-button {
    padding: 8px 16px;
    background-color: #062AAA;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.send-button:hover {
    background-color: #3559D9;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
