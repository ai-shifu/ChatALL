<template>
   <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setAtlasCloudApi"
    :watcher="watcher"
  />
</template>

<script>
import _bots from "@/bots";
import Bot from "@/bots/atlascloud/AtlasCloudAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "common.apiKey",
    description: "settings.secretPrompt",
    placeholder: "ak-...",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: "openaiApi.temperature",
    description: "openaiApi.temperaturePrompt",
    min: 0,
    max: 2,
    step: 0.1,
    ticks: {
      0: "openaiApi.temperature0",
      2: "openaiApi.temperature2",
    },
  },
  {
    type: Type.Slider,
    name: "maxTokens",
    title: "claudeApi.maxTokens",
    description: "claudeApi.maxTokensPrompt",
    min: 512,
    max: 8192,
    step: 512,
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
      _bots.all
        .filter((bot) => bot instanceof Bot)
        .forEach((bot) => bot.setupModel());
    },
  },
};
</script>

