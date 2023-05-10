<template>
  <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
  <v-list-item>
    <v-list-item-title>API Key & Secret Key</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("settings.secretPrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="wenxinQianfan.apiKey"
      outlined
      dense
      hide-details
      label="API Key"
      :placeholder="'2125NA8mQy7gC52Pq9BK3tvk'"
      @change="setApiKey($event.target.value)"
    ></v-text-field>
    <v-text-field
      v-model="wenxinQianfan.secretKey"
      outlined
      dense
      hide-details
      label="Secret Key"
      :placeholder="'IWf2pyYm26fz8GgNAHdkPkznHgazlffQ'"
      @change="setSecretKey($event.target.value)"
    ></v-text-field>
  </v-list-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bot from "@/bots/baidu/WenxinQianfanBot";
export default {
  data() {
    return {
      bot: Bot.getInstance(),
    };
  },
  methods: {
    ...mapMutations(["setWenxinQianfan"]),
    setApiKey(value) {
      this.setWenxinQianfan({
        ...this.wenxinQianfan,
        apiKey: value,
      });
    },
    setSecretKey(value) {
      this.setWenxinQianfan({
        ...this.wenxinQianfan,
        secretKey: value,
      });
    },
  },
  computed: {
    ...mapState(["wenxinQianfan"]),
  },
};
</script>
