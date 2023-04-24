<template>
    <v-list
        lines="two"
        subheader>
        <v-list-subheader>OpenAI API 配置</v-list-subheader>
        <v-list-item>
            <v-text-field
                v-model="apiKey"
                label="API Key"
                outlined
                dense
                @change="setGPTAPIKey($event.target.value)"
            ></v-text-field>
              <!--APIURL-->
              <v-text-field
                v-model="gptAPIUrl"
                label="APIURL"
                outlined
                dense
                @change="setGPTAPIUrl($event.target.value)"></v-text-field>
            <!--模型选择-->
            <v-select
                v-model="gptAPIModel"
                :items="models"
                item-title="name"
                label="选择一个模型"
                item-value="slug"
                hide-details
                @update:model-value="setGPTAPIModel($event.target.value)"></v-select>
        </v-list-item>

    </v-list>
</template>
<script>
import { mapState , mapMutations} from "vuex";
import OpenAIAPIBots from "@/bots/OpenAIAPIBots";
export default {
    data(){
        return {
            bot: OpenAIAPIBots.getInstance(),
            models: [
                { name: this.$t("chatGpt.default35"), slug: "davinci" }
            ]
        }
    },
    methods: {
        ...mapMutations(["setGPTAPIModel","setGPTAPIUrl","setGPTAPIKey"]),
    },
    computed: {
        ...mapState(["gptAPIModel","gptAPIUrl","apiKey"]),
    },

}
</script>

<style>

</style>