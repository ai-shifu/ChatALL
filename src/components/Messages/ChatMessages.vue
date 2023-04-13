<template>
    <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="message.type">
            <bubble v-if="message.type === 'prompt'"
                :type="message.type"
                :text="message.content">
            </bubble>
            <div class="response-messages" v-else :style="{ gridTemplateColumns: gridTemplateColumns }" >
                <bubble v-for="(bot, index) in message.bots" 
                    :key="index"
                    :type="message.type"
                    :bot="bot"
                    :text="bot.content">
                </bubble>
            </div>
        </div>
    </div>
</template>

<script>
import Bubble from "./ChatBubble.vue";

export default {
    components: {
        Bubble
    },
    props: {
        columns: {
            type: Number,
            default: 3,
        },
    },
    data() {
        return {
            messages: [],
        };
    },
    computed: {
        gridTemplateColumns() {
            return `repeat(${this.columns}, 1fr)`;
        },
    },
    methods: {
        addMessage(message) {
            var index = -1;
            var botIndex = -1;

            if (message.type === "prompt") {
                index = this.messages.push(message) - 1;
            } else {
                // Check if the last element of messages is a response
                if (this.messages.length > 0 && this.messages[this.messages.length - 1].type === "response") {
                    // Add the new response to the bots array of the last element
                    botIndex = this.messages[this.messages.length - 1].bots.push(message) - 1;
                    index = this.messages.length - 1;
                } else {
                    // Create a new response message
                    index = this.messages.push({
                        type: "response",
                        bots: [message],
                    }) - 1;
                    botIndex = 0;
                }
            }
            return {index, botIndex};
        },
        // Update the bubble with the new message
        updateBubble(response, index) {
            this.messages[index.index].bots[index.botIndex].content = response;
        }
    },
};
</script>

<style scoped>
.messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
    overflow-y: auto;
    gap: 16px;
    margin: 68px 32px;
}

.response {
    width: 100%;
}
.response-messages {
    display: grid;
    grid-gap: 16px;
}
</style>