<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setGemini"
    :watcher="watcher"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/google/GeminiAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "common.apiKey",
    description: "settings.secretPrompt",
    placeholder: "...",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: "openaiApi.temperature",
    description: "openaiApi.temperaturePrompt",
    min: 0,
    max: 1,
    step: 0.1,
    ticks: {
      0: "openaiApi.temperature0",
      1: "openaiApi.temperature2",
    },
  },
  {
    type: Type.Slider,
    name: "topK",
    title: "geminiApi.topK",
    description: "geminiApi.topKPrompt",
    min: 1,
    max: 100,
    step: 1,
  },
  {
    type: Type.Slider,
    name: "topP",
    title: "geminiApi.topP",
    description: "geminiApi.topPPrompt",
    min: 0.1,
    max: 1,
    step: 0.01,
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
