<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setOpenaiApi"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/openai/OpenAIAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import i18n from "@/i18n";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: i18n.global.t("openaiApi.apiKey"),
    description: i18n.global.t("settings.secretPrompt"),
    placeholder: "sk-...",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: i18n.global.t("openaiApi.temperature"),
    description: i18n.global.t("openaiApi.temperaturePrompt"),
    min: 0,
    max: 2,
    step: 0.1,
    ticks: {
      0: i18n.global.t("openaiApi.temperature0"),
      2: i18n.global.t("openaiApi.temperature2"),
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
  {
    type: Type.Text,
    name: "alterUrl",
    title: i18n.global.t("openaiApi.alterUrl"),
    description: i18n.global.t("openaiApi.alterUrlPrompt"),
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
};
</script>
