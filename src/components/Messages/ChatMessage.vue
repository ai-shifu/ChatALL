<template>
    <div :class="['message', message.type]">
        <div v-if="message.type === 'response'" class="title">
            <img :src="message.logo" alt="Bot Icon" />
            <span>{{ message.name }}</span>
        </div>
        <p >{{ message.content }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Number,
            default: 1
        }
    },
    mounted() {
        this.$el.style.setProperty('--columns', this.columns);
    },
    watch: {
        columns() {
            this.$el.style.setProperty('--columns', this.columns);
        }
    },
};
</script>

<style scoped>
.message {
    border-radius: 8px;
    padding: 16px;
    word-wrap: break-word;
    text-align: left;
}

.prompt {
    background-color: #95EC69;
    width: fit-content;
    grid-column: 1 / span var(--columns);
}

.response {
    background-color: #FFF;
    width: 100%;
    grid-column: auto / span 1;
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
}
</style>