<template>
  <login-setting :bot="bot"></login-setting>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setMistral"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/MistralBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";

const settings = [
  {
    type: Type.Combobox,
    name: "model",
    title: "Model",
    items: ["mistral-large"],
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
