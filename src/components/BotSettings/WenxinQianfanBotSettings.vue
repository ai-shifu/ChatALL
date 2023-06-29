<template>
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
      @update:model-value="setWenxinQianfan({ apiKey: $event })"
    ></v-text-field>
    <v-text-field
      v-model="wenxinQianfan.secretKey"
      outlined
      dense
      label="Secret Key"
      :placeholder="'IWf2pyYm26fz8GgNAHdkPkznHgazlffQ'"
      @update:model-value="setWenxinQianfan({ secretKey: $event })"
    ></v-text-field>

    <v-list-item-title>{{ $t("bot.pastRounds") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("bot.pastRoundsPrompt")
    }}</v-list-item-subtitle>
    <v-slider
      v-model="wenxinQianfan.pastRounds"
      color="primary"
      :min="0"
      :max="10"
      :step="1"
      thumb-label
      show-ticks
      hide-details
      @update:model-value="setWenxinQianfan({ pastRounds: $event })"
    ></v-slider>
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
  },
  computed: {
    ...mapState(["wenxinQianfan"]),
  },
};
</script>
