<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setAzureOpenaiApi"
    :watcher="watcher"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/microsoft/AzureOpenAIAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "azureApiKey",
    title: "azureOpenaiApi.azureOpenAIApiKey",
    description: "settings.secretPrompt",
    placeholder: "b40...",
  },
  {
    type: Type.Text,
    name: "azureApiInstanceName",
    title: "azureOpenaiApi.azureApiInstanceName",
    description: "azureOpenaiApi.azureApiInstanceNamePrompt",
  },
  {
    type: Type.Text,
    name: "azureOpenAIApiDeploymentName",
    title: "azureOpenaiApi.azureOpenAIApiDeploymentName",
    description: "azureOpenaiApi.azureOpenAIApiDeploymentNamePrompt",
  },
  {
    type: Type.Text,
    name: "azureOpenAIApiVersion",
    title: "azureOpenaiApi.azureOpenAIApiVersion",
    description: "azureOpenaiApi.azureOpenAIApiVersionPrompt",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: "azureOpenaiApi.temperature",
    description: "azureOpenaiApi.temperaturePrompt",
    min: 0,
    max: 2,
    step: 0.1,
    ticks: {
      0: "azureOpenaiApi.temperature0",
      2: "azureOpenaiApi.temperature2",
    },
  },
  {
    type: Type.Slider,
    name: "pastRounds",
    title: "bot.pastRounds",
    description: "bot.pastRoundsPrompt",
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
  methods: {
    watcher() {
      Bot.getInstance().setupModel();
    },
  },
};
</script>
