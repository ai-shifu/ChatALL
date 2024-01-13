<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setGemini"
    :watcher="watcher"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/GeminiBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import i18n from "@/i18n";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: i18n.global.t("openaiApi.apiKey"),
    description: i18n.global.t("settings.secretPrompt"),
    placeholder: "...",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: i18n.global.t("openaiApi.temperature"),
    description: i18n.global.t("openaiApi.temperaturePrompt"),
    min: 0,
    max: 1,
    step: 0.1,
    ticks: {
      0: i18n.global.t("openaiApi.temperature0"),
      2: i18n.global.t("openaiApi.temperature2"),
    },
  },
  {
    type: Type.Slider,
    name: "topK",
    title: i18n.global.t("gemini.topK"),
    description: i18n.global.t("gemini.topKPrompt"),
    min: 1,
    max: 100,
    step: 1,
  },
  {
    type: Type.Slider,
    name: "topP",
    title: i18n.global.t("gemini.topP"),
    description: i18n.global.t("gemini.topPPrompt"),
    min: 0.1,
    max: 1,
    step: 0.01,
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
  methods: {
    watcher() {
      Bot.getInstance().setupModel();
    },
  },
};
</script>
