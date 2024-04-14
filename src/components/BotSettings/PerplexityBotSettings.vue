<template>
  <login-setting :bot="bot"></login-setting>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setPerplexity"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/PerplexityBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";

const settings = [
  {
    type: Type.Combobox,
    name: "version",
    title: "Version",
    items: ["2.5"],
  },
];
export default {
  components: {
    LoginSetting,
    CommonBotSettings,
  },
  data() {
    return {
      bot: Bot.getInstance(),
      settings: settings,
      brandId: Bot._brandId,
    };
  },
};
</script>
