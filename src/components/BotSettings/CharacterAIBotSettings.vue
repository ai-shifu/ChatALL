<template>
  <login-setting :bot="bot"></login-setting>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setCharacterAI"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/CharacterAIBot";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Combobox,
    name: "characterId",
    title: "Character ID",
    itemProps: true,
    items: ["YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8", "edit-me"],
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
