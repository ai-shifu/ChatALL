<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setAzureOpenaiApi"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/microsoft/AzureOpenAIAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import i18n from "@/i18n";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "azureApiKey",
    title: i18n.global.t("azureOpenaiApi.azureOpenAIApiKey"),
    description: i18n.global.t("settings.secretPrompt"),
    placeholder: "b40...",
  },
  {
    type: Type.Text,
    name: "azureApiInstanceName",
    title: i18n.global.t("azureOpenaiApi.azureApiInstanceName"),
    description: i18n.global.t("azureOpenaiApi.azureApiInstanceNamePrompt"),
  },
  {
    type: Type.Text,
    name: "azureOpenAIApiDeploymentName",
    title: i18n.global.t("azureOpenaiApi.azureOpenAIApiDeploymentName"),
    description: i18n.global.t(
      "azureOpenaiApi.azureOpenAIApiDeploymentNamePrompt",
    ),
  },
  {
    type: Type.Text,
    name: "azureOpenAIApiVersion",
    title: i18n.global.t("azureOpenaiApi.azureOpenAIApiVersion"),
    description: i18n.global.t("azureOpenaiApi.azureOpenAIApiVersionPrompt"),
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: i18n.global.t("azureOpenaiApi.temperature"),
    description: i18n.global.t("azureOpenaiApi.temperaturePrompt"),
    min: 0,
    max: 2,
    step: 0.1,
    ticks: {
      0: i18n.global.t("azureOpenaiApi.temperature0"),
      2: i18n.global.t("azureOpenaiApi.temperature2"),
    },
  },
  {
    type: Type.Slider,
    name: "pastRounds",
    title: i18n.global.t("bot.pastRounds"),
    description: i18n.global.t("bot.pastRoundsPrompt"),
    min: 0,
    max: 10,
    step: 1,
  },
];
export default {
  components: {
    CommonBotSettings,
  },
  data() {
    return {
      settings: settings,
      brandId: Bot._brandId,
    };
  },
};
</script>
