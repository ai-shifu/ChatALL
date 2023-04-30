<template>
    <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
    <v-list-item>
        <v-text-field v-model="openaiApiKey" :label="$t('OpenAIAPI.apiKey')" outlined dense
            @change="setOpenaiApiKey($event.target.value)"></v-text-field>
    </v-list-item>
</template>
<script>
import { mapState , mapMutations} from "vuex";
import OpenAIAPIBot from "@/bots/OpenAIAPIBot";
export default {
    data(){
        return {
            bot: OpenAIAPIBot.getInstance()
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

<style>

</style>