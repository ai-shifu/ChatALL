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
                @change="setApiKey($event)"
            ></v-text-field>
              <!--APIURL-->
              <v-text-field
                v-model="apiUrl"
                label="APIURL"
                outlined
                dense
                @change="setApiUrlPath($event)"></v-text-field>
            <!--模型选择-->
            <v-select
                v-model="model"
                :items="models"
                item-title="name"
                label="选择一个模型"
                item-value="slug"
                hide-details
                @update:model-value="setModel($event)"></v-select>
        </v-list-item>

    </v-list>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import OpenAIAPIBots from "@/bots/OpenAIAPIBots";
export default {
    data(){
        return {
            bot: OpenAIAPIBots.getInstance(),
            models: [
                { name: this.$t("chatGpt.default35"), slug: "text-davinci-002-render-sha" },
                { name: this.$t("chatGpt.legacy35"), slug: "text-davinci-002-render-paid" },
                { name: this.$t("chatGpt.gpt4"), slug: "gpt-4" },
            ],
            apiKey: "",
            apiUrl: "",
            model: "",
        }
    },
    methods: {
        ...mapMutations(["setChatGPTModel"]),
        setModel(model) {
            this.bot.setModel(model);
        },
        setApiKey(apiKey) {
            this.bot.setApiKey(apiKey);
        },
        setApiUrlPath(apiUrlPath) {
            this.bot.setApiUrlPath(apiUrlPath);
        },
    },
    computed: {
        ...mapState(["chatgptModel"]),
    },

}
</script>

<style>

</style>