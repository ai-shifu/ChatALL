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
                @update:model-value="setGPTAPIModel($event)"></v-select>
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
                { name: "gpt-3.5-turbo", slug: "gpt-3.5-turbo"},
                { name: "gpt-3.5-turbo-0301", slug: "gpt-3.5-turbo-0301" },
                { name: "gpt-4", slug: "gpt-4" },
                { name: "gpt-4-0314", slug: "gpt-4-0314" },
                { name: "gpt-4-32k", slug: "gpt-4-32k" },
                { name: "gpt-4-32k-0314", slug: "gpt-4-32k-0314" }
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