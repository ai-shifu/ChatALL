<template>
    <div :class="['bubble', type]" :style="bubbleStyle">
        <div v-if="type === 'response'" class="title">
            <img :src="bot.icon" alt="Bot Icon" />
            <span>{{ bot.name }}</span>
        </div>
        <p>{{ text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "prompt"
        },
        text: {
            type: String,
            default: ""
        },
        bot: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Number,
            default: 1
        }
    },
    computed: {
        bubbleStyle() {
            return {
                width: this.type === 'response' ? `calc(100% / ${this.columns} - 16px)` : 'auto',
                backgroundColor: this.type === "prompt" ? "#95EC69" : "#FFFFFF"
            };
        }
    }
};
</script>

<style scoped>
.bubble {
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 8px;
    word-wrap: break-word;
    max-width: 100%;
}

.prompt {
    text-align: left;
}

.response {
    text-align: left;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.title img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
}</style>