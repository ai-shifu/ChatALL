<template>
    <v-list
        lines="two"
        subheader
    >
        <v-list-subheader>{{ bot.getDisplayName() }}</v-list-subheader>
        <v-list-item>
            <v-list-item-title>{{ $t('settings.loginOrOut') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t("settings.loginOrOutPrompt") }}</v-list-item-subtitle>
            <a :href="bot.getLoginUrl()" target="_blank">
                {{ bot.getLoginUrl() }}
            </a>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>{{ $t('chatGpt.chooseModel') }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t("chatGpt.chooseModelPrompt") }}</v-list-item-subtitle>
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
import { mapState, mapMutations } from "vuex";
import ChatGPTBot from "@/bots/ChatGPTBot";

export default {
    data() {
        return {
            bot: ChatGPTBot.getInstance(),
            models: [
                { name: this.$t("chatGpt.default35"), slug: "text-davinci-002-render-sha" },
                { name: this.$t("chatGpt.legacy35"), slug: "text-davinci-002-render-paid" },
                { name: this.$t("chatGpt.gpt4"), slug: "gpt-4" },
            ],
        };
    },
    methods: {
        ...mapMutations(["setChatGPTModel"]),
    },
    computed: {
        ...mapState(["chatgptModel"]),
    },
};
</script>
