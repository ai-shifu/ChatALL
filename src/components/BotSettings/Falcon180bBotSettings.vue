<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setFalcon"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/huggingface/Falcon180bBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import i18n from "@/i18n";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Slider,
    name: "temperature",
    title: i18n.global.t("falcon.temperature"),
    description: i18n.global.t("falcon.temperaturePrompt"),
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    type: Type.Slider,
    name: "maxNewTokens",
    title: i18n.global.t("falcon.maxNewTokens"),
    description: i18n.global.t("falcon.maxNewTokensPrompt"),
    min: 0,
    max: 8192,
    step: 64,
  },
  {
    type: Type.Slider,
    name: "topP",
    title: i18n.global.t("falcon.topP"),
    description: i18n.global.t("falcon.topPPrompt"),
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    type: Type.Slider,
    name: "repetitionPenalty",
    title: i18n.global.t("falcon.repetitionPenalty"),
    description: i18n.global.t("falcon.repetitionPenaltyPrompt"),
    min: 1,
    max: 2,
    step: 0.05,
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
