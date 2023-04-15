<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal">
            <p>{{ $t("modal.loginPrompt", {botName: bot.getDisplayName()}) }}</p>
            <a :href="bot.getLoginUrl()" target="_blank">{{ bot.getLoginUrl() }}</a>
            <div class="buttons">
                <button @click="onSuccess">登录成功</button>
                <button @click="onFailure">登录失败</button>
            </div>
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
        onSuccess() {
            this.$emit('close', 'success');
        },
        onFailure() {
            this.$emit('close', 'failure');
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
    }

    .buttons {
        display: flex;
        gap: 24px;
        justify-content: center; 
        margin-top: 12px;
    }

    button {
        background-color: #062AAA;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #3559D9;
    }
</style>
