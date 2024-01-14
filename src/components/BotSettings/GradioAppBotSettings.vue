<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setGradio"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/huggingface/GradioAppBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import i18n from "@/i18n";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "url",
    title: "gradio.url",
    description: "gradio.urlPrompt",
    placeholder: i18n.global.t("settings.forExample", {
      example: "https://*.hf.space, http://127.0.0.1:7861",
    }),
  },
  {
    type: Type.Text,
    name: "fnIndex",
    title: "gradio.fnIndex",
    description: "gradio.fnIndexPrompt",
    placeholder: "0",
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
