<template>
    <div :class="['bubble', type]">
        <div v-if="type === 'response'" class="title">
            <img :src="bot.logo" alt="Bot Icon" />
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
};
</script>

<style scoped>
.bubble {
    border-radius: 8px;
    padding: 16px;
    word-wrap: break-word;
    text-align: left;
}

.prompt {
    background-color: #95EC69;
    width: auto;
}

.response {
    background-color: #FFF;
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