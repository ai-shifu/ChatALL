<template>
    <div class="messages">
        <div class="message-grid" :style="{ gridTemplateColumns: gridTemplateColumns }" >
            <chat-message v-for="(message, index) in messages" 
                :key="index"
                :columns="columns"
                :message="message"
            ></chat-message>
        </div>
    </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";

export default {
    components: {
        ChatMessage
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
            autoScroll: true,
        };
    },
    computed: {
        gridTemplateColumns() {
            return `repeat(${this.columns}, 1fr)`;
        },
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    watch: {
        'messages.length'() {
            this.$nextTick(() => {
                if (this.autoScroll) {
                    this.scrollToBottom();
                }
            });
        },
    },
    methods: {
        // Update the chat-message with the new message
        updateMessage(response, index, done) {
            const message = this.messages[index];
            if (response !== null)
                message.content = response;
            message.done = done;

            if (done) {
                this.$matomo.trackEvent("prompt", "received", message.className, message.content.length);
            }

            this.$nextTick(() => {
                if (this.autoScroll) {
                    this.scrollToBottom();
                }
            });
        },
        onScroll() {
            const scrollPosition = window.pageYOffset + window.innerHeight;
            this.autoScroll = scrollPosition >= document.documentElement.scrollHeight;
        },
        scrollToBottom() {
            window.scrollTo(0, document.documentElement.scrollHeight);
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

.message-grid {
    display: grid;
    grid-gap: 16px;
    width: 100%;
}
</style>