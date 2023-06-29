<template>
  <v-list-item>
    <v-list-item-title>{{
      $t("azureOpenaiApi.azureOpenAIApiKey")
    }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("settings.secretPrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="azureOpenaiApi.azureApiKey"
      outlined
      dense
      placeholder="b40..."
      @update:model-value="setAzureOpenaiApi({ azureApiKey: $event })"
    ></v-text-field>
    <v-list-item-title>{{
      $t("azureOpenaiApi.azureApiInstanceName")
    }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("azureOpenaiApi.azureApiInstanceNamePrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="azureOpenaiApi.azureApiInstanceName"
      outlined
      dense
      @update:model-value="setAzureOpenaiApi({ azureApiInstanceName: $event })"
    ></v-text-field>
    <v-list-item-title>{{
      $t("azureOpenaiApi.azureOpenAIApiDeploymentName")
    }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("azureOpenaiApi.azureOpenAIApiDeploymentNamePrompt")
    }}</v-list-item-subtitle>
    <v-text-field
      v-model="azureOpenaiApi.azureOpenAIApiDeploymentName"
      outlined
      dense
      @update:model-value="
        setAzureOpenaiApi({ azureOpenAIApiDeploymentName: $event })
      "
    ></v-text-field>
    <v-list-item-title>{{
      $t("azureOpenaiApi.azureOpenAIApiVersion")
    }}</v-list-item-title>
    <v-text-field
      v-model="azureOpenaiApi.azureOpenAIApiVersion"
      outlined
      dense
      placeholder="2023-03-15-preview"
      @update:model-value="setAzureOpenaiApi({ azureOpenAIApiVersion: $event })"
    ></v-text-field>

    <v-list-item-title>{{
      $t("azureOpenaiApi.temperature")
    }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("azureOpenaiApi.temperaturePrompt")
    }}</v-list-item-subtitle>
    <v-slider
      v-model="azureOpenaiApi.temperature"
      color="primary"
      :min="0"
      :max="2"
      :step="0.1"
      thumb-label
      show-ticks="always"
      :ticks="temperatureLabels"
      @update:model-value="setAzureOpenaiApi({ temperature: $event })"
    ></v-slider>

    <v-list-item-title>{{ $t("bot.pastRounds") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("bot.pastRoundsPrompt")
    }}</v-list-item-subtitle>
    <v-slider
      v-model="azureOpenaiApi.pastRounds"
      color="primary"
      :min="0"
      :max="10"
      :step="1"
      thumb-label
      show-ticks
      @update:model-value="setAzureOpenaiApi({ pastRounds: $event })"
    ></v-slider>
  </v-list-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Bot from "@/bots/microsoft/AzureOpenAIAPIBot";
import i18n from "@/i18n";
export default {
  data() {
    return {
      bot: Bot.getInstance(),
      temperatureLabels: {
        0: i18n.global.t("azureOpenaiApi.temperature0"),
        2: i18n.global.t("azureOpenaiApi.temperature2"),
      },
    };
  },
  methods: {
    ...mapMutations(["setAzureOpenaiApi"]),
  },
  computed: {
    ...mapState(["azureOpenaiApi"]),
  },
};
</script>
