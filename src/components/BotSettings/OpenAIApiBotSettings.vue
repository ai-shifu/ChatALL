<template>
    <v-list-subheader>{{ $t(`${bot.getBrandName()}.settings.title`) }}</v-list-subheader>
    <v-list-item>
        <v-text-field v-model="openaiApiKey" :label="$t(`${bot.getBrandName()}.settings.openaiApiKey`)" outlined dense
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