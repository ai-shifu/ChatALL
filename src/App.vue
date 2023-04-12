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
            @close="showCreateWindowModal = false"
        ></CreateWindowModal>
    </div>
</template>

<script>
import CreateWindowModal from "@/components/CreateWindowModal.vue";
import ChatMessages from "@/components/Messages/ChatMessages.vue";
import ChatGPTBot from "./bots/ChatGPTBot";
import BingChatBot from "./bots/BingChatBot";
import BardBot from "./bots/BardBot";
import ERNIEBot from "./bots/ERNIEBot";
import { mapState, mapMutations } from "vuex";

export default {
    name: "App",
    components: {
        ChatMessages,
        CreateWindowModal,
    },
    data() {
        return {
            footerHeight: 60,
            showCreateWindowModal: false,
            clickedBot: {},
            bots: [
                ChatGPTBot.getInstance(),
                BingChatBot.getInstance(),
                BardBot.getInstance(),
                ERNIEBot.getInstance(),
            ],
            selectedBots: {},
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
        changeColumns(n) {
            this.columns = n;
        },
        async sendPromptToBots() {
            const prompt = this.$refs.textarea.value;

            // Add a new prompt message to the messages array
            this.$refs.chatMessages.addMessage({ type: "prompt", content: prompt });

            for (const bot of this.bots) {
                const response = await bot.sendPrompt(prompt);
                this.$refs.chatMessages.addMessage({
                    type: "response",
                    content: response,
                    logo: bot.getLogo(),
                    name: this.$t(bot.getDisplayName()),
                });
            }


            // Clear the textarea after sending the prompt
            this.$refs.textarea.value = "";
        },
        toggleSelected(bot) {
            if (!bot.isLoggedIn()) {
                // Open the login window
                this.clickedBot = bot;
                this.showCreateWindowModal = true;
                this.selectedBots[bot.getId()] = true;
            } else {
                this.selectedBots[bot.getId()] = !this.selectedBots[bot.getId()];
            }
        },
        ...mapMutations(["changeColumns"]),
    },
    computed: {
        ...mapState(["columns"]),
        activeBots() {
            // Return an object with the bot id as key and a boolean as value
            return this.bots.reduce((active, bot) => {
                active[bot.getId()] = bot.isLoggedIn() && this.selectedBots[bot.getId()];
                return active;
            }, {});
        },
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
</style>
