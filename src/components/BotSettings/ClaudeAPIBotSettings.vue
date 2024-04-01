<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setClaudeApi"
    :watcher="watcher"
  ></CommonBotSettings>
</template>

<script>
import _bots from "@/bots";
import Bot from "@/bots/anthropic/ClaudeAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "claudeApi.apiKey",
    description: "settings.secretPrompt",
    placeholder: "sk-...",
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
    type: Type.Text,
    name: "alterUrl",
    title: "openaiApi.alterUrl",
    description: "openaiApi.alterUrlPrompt",
    placeholder: "https://your.proxy.com/v1",
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
        .map((bot) => bot.setupModel());
    },
  },
};
</script>
