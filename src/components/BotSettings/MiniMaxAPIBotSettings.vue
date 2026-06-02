<template>
   <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setMiniMaxApi"
    :watcher="watcher"
  ></CommonBotSettings
  >
</template>

<script>
import _bots from "@/bots";
import Bot from "@/bots/minimax/MiniMaxAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "common.apiKey",
    description: "settings.secretPrompt",
    placeholder: "eyJh...",
  },
  {
    type: Type.Text,
    name: "alterUrl",
    title: "minimaxApi.alterUrl",
    description: "minimaxApi.alterUrlPrompt",
    placeholder: "https://api.minimax.io/v1",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: "minimaxApi.temperature",
    description: "minimaxApi.temperaturePrompt",
    min: 0.1,
    max: 1,
    step: 0.1,
    ticks: {
      0.1: "minimaxApi.temperature01",
      1: "minimaxApi.temperature1",
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
      _bots.all
        .filter((bot) => bot instanceof Bot)
        .map((bot) => bot.setupModel());
    },
  },
};
</script>
