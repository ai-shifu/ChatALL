<template>
  <login-setting :bot="bot"></login-setting>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setClaudeAi"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/ClaudeAIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";
import { mapMutations } from "vuex";
import { Type } from "./settings.const";
const { ipcRenderer } = window.require("electron");

const settings = [
  {
    type: Type.Combobox,
    name: "model",
    title: "Model",
    items: ["claude-2.0", "claude-2.1", "claude-<edit me>"],
  },
];

export default {
  components: {
    LoginSetting,
    CommonBotSettings,
  },
  data() {
    return {
      settings: settings,
      brandId: Bot._brandId,
      bot: Bot.getInstance(),
    };
  },
  mounted() {
    // Listen for the CLAUDE-2-ORG message from background.js
    ipcRenderer.on("CLAUDE-2-ORG", (event, org) => {
      this.setClaudeAi({ org });
    });
  },
  methods: {
    ...mapMutations(["setClaudeAi"]),
  },
};
</script>
