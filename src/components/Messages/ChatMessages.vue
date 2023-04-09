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
    data() {
        return {
            columns: 3,
            messages: [
                {
                    type: "prompt",
                    content: "你好，我想知道今天的天气。"
                },
                {
                    type: "response",
                    bots: [
                        {
                            icon: "path/to/icon.png",
                            name: "ChatGPT",
                            content: "今天是晴天，气温适中",
                        },
                        {
                            icon: "path/to/icon.png",
                            name: "ChatGPT",
                            content: "今天是晴天，气温适中",
                        },
                        {
                            icon: "path/to/icon.png",
                            name: "ChatGPT",
                            content: "今天是晴天，气温适中",
                        },
                        {
                            icon: "path/to/icon.png",
                            name: "ChatGPT",
                            content: "暴风骤雨！",
                        }
                    ],
                }
                // 更多消息...
            ]
        };
    },
    computed: {
        gridTemplateColumns() {
            return `repeat(${this.columns}, 1fr)`;
        },
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