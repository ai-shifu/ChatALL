<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal">
            <p>{{ $t("modal.loginPrompt", {botName: bot.getBrandName()}) }}</p>
            <a :href="bot.getLoginUrl()" target="_blank">{{ bot.getLoginUrl() }}</a>
            <button @click="onDone">{{ $t("modal.done") }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        bot: {
            type: Object,
            default: null,
        },
    },
    methods: {
        onDone() {
            this.$emit('done');
        },
    },
};
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: #fff;
        padding: 20px;
        border-radius: 4px;
        text-align: center;
        align-items: center;
    }

    button {
        background-color: #062AAA;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        width: fit-content;
        cursor: pointer;
    }

    button:hover {
        background-color: #3559D9;
    }
</style>
