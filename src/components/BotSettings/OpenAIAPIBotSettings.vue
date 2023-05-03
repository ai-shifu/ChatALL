<template>
    <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
    <v-list-item>
        <v-list-item-title>{{ $t("openaiApi.apiKey") }}</v-list-item-title>
        <v-list-item-subtitle>{{ $t("settings.secretPrompt") }}</v-list-item-subtitle>
        <v-text-field
            v-model="openaiApiKey"
            outlined
            dense
            placeholder="sk-..."
            @change="setOpenaiApiKey($event.target.value)"
        ></v-text-field>
    </v-list-item>
</template>

<script>
import { mapState , mapMutations} from "vuex";
import Bot from "@/bots/OpenAIAPIBot";
export default {
    data(){
        return {
            bot: Bot.getInstance()
        }
    },
    methods: {
        ...mapMutations(["setOpenaiApiKey"])
    },
    computed: {
        ...mapState(["openaiApiKey"])
    }
}
</script>