<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setPhind"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/PhindBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Select,
    name: "model",
    title: "Model",
    items: ["Phind Model", "GPT-3.5-Turbo", "GPT-4"],
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
