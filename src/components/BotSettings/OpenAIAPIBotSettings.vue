<template>
  <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
  <v-list-item>
    <v-list-item-title>{{ $t("openaiApi.apiKey") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("settings.secretPrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="openaiApi.apiKey"
      outlined
      dense
      placeholder="sk-..."
      @update:model-value="setOpenaiApi({ apiKey: $event })"
    ></v-text-field>
    <v-list-item-title>{{ $t("openaiApi.temperature") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("openaiApi.temperaturePrompt")
    }}</v-list-item-subtitle>
    <v-slider
      v-model="openaiApi.temperature"
      color="primary"
      :min="0"
      :max="2"
      :step="0.1"
      thumb-label
      show-ticks="always"
      :ticks="temperatureLabels"
      @update:model-value="setOpenaiApi({ temperature: $event })"
    ></v-slider>
    <v-list-item-title>{{ $t("openaiApi.alterUrl") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("openaiApi.alterUrlPrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="openaiApi.alterUrl"
      outlined
      dense
      placeholder="https://your.proxy.com/v1/chat/completions"
      @update:model-value="setOpenaiApi({ alterUrl: $event })"
    ></v-text-field>
  </v-list-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bot from "@/bots/openai/OpenAIAPIBot";
import i18n from "@/i18n";
export default {
  data() {
    return {
      bot: Bot.getInstance(),
      temperatureLabels: {
        0: i18n.global.t("openaiApi.temperature0"),
        2: i18n.global.t("openaiApi.temperature2"),
      },
    };
  },
  methods: {
    ...mapMutations(["setOpenaiApi"]),
  },
  computed: {
    ...mapState(["openaiApi"]),
  },
};
</script>
