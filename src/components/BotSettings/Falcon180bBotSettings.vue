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
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Slider,
    name: "temperature",
    title: "falcon.temperature",
    description: "falcon.temperaturePrompt",
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    type: Type.Slider,
    name: "maxNewTokens",
    title: "falcon.maxNewTokens",
    description: "falcon.maxNewTokensPrompt",
    min: 0,
    max: 8192,
    step: 64,
  },
  {
    type: Type.Slider,
    name: "topP",
    title: "falcon.topP",
    description: "falcon.topPPrompt",
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    type: Type.Slider,
    name: "repetitionPenalty",
    title: "falcon.repetitionPenalty",
    description: "falcon.repetitionPenaltyPrompt",
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
