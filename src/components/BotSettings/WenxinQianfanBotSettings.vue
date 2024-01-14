<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setWenxinQianfan"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/baidu/WenxinQianfanBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "API Key & Secret Key",
    description: "settings.secretPrompt",
    label: "API Key",
    placeholder: "2125NA8mQy7gC52Pq9BK3tvk",
    hideDetails: true,
  },
  {
    type: Type.Text,
    name: "secretKey",
    label: "Secret Key",
    placeholder: "IWf2pyYm26fz8GgNAHdkPkznHgazlffQ",
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
};
</script>
