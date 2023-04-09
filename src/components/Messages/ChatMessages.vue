<template>
    <div class="messages">
        <bubble v-for="(message, index) in messages" :key="index" :type="message.type" :text="message.text"
            :bot="message.bot" :columns="columns"></bubble>
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
            default: 1
        }
    },
    data() {
        return {
            messages: [
                {
                    type: "prompt",
                    text: "你好，我想知道今天的天气。"
                },
                {
                    type: "response",
                    text: "今天是晴天，气温适中。",
                    bot: {
                        icon: "path/to/icon.png",
                        name: "ChatGPT"
                    }
                }
                // 更多消息...
            ]
        };
    }
};
</script>

<style scoped>
.messages {
    margin: 16px 32px;
}
</style>