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
    </v-list>
</template>

<script>
import BingChatPreciseBot from "@/bots/BingChatPreciseBot";

export default {
    data() {
        return {
            bot: BingChatPreciseBot.getInstance(),
        };
    },
};
</script>
