<template>
    <v-list
        lines="two"
        subheader
    >
        <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
        <v-list-item>
            <v-list-item-title>{{ $t('settings.loginOrOut') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t("settings.loginOrOutPrompt") }}</v-list-item-subtitle>
            <a :href="bot.getLoginUrl()" target="_blank" @click="createWindow">
                {{ bot.getLoginUrl() }}
            </a>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>{{ $t('ChatGPTBot.chooseModel') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t("ChatGPTBot.chooseModelPrompt") }}</v-list-item-subtitle>
                <v-select
                    v-model="chatgptModel"
                    :items="models"
                    item-title="name"
                    item-value="slug"
                    hide-details
                    @update:model-value="setChatGPTModel($event)"
                ></v-select>
        </v-list-item>
    </v-list>
</template>

<script>
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import { mapState, mapMutations } from "vuex";
import ChatGPTBot from "@/bots/ChatGPTBot";

export default {
    data() {
        return {
            bot: ChatGPTBot.getInstance(),
            models: [
                { name: this.$t("ChatGPTBot.text-davinci-002-render-sha"), slug: "text-davinci-002-render-sha" },
                { name: this.$t("ChatGPTBot.text-davinci-002-render-paid"), slug: "text-davinci-002-render-paid" },
                { name: this.$t("ChatGPTBot.gpt-4"), slug: "gpt-4" },
            ],
        };
    },
    methods: {
        ...mapMutations(["setChatGPTModel"]),
        createWindow(event) {
            ipcRenderer.invoke('create-new-window', this.bot.getLoginUrl(), this.bot.getUserAgent());
            event.preventDefault();
        },
    },
    computed: {
        ...mapState(["chatgptModel"]),
    },
};
</script>
