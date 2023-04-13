<template>
    <div class="messages">
        <div class="message-grid" :style="{ gridTemplateColumns: gridTemplateColumns }" >
            <bubble v-for="(message, index) in messages" 
                :key="index"
                :columns="columns"
                :message="message">
            </bubble>
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
        // Update the bubble with the new message
        updateBubble(response, index) {
            this.messages[index].content = response;
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

.message-grid {
    display: grid;
    grid-gap: 16px;
    width: 100%;
}
</style>