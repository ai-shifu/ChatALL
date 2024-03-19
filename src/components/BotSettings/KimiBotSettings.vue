<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
import { mapMutations } from "vuex";

import Bot from "@/bots/moonshot/KimiBot";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";

export default {
  components: {
    LoginSetting,
  },
  data() {
    return {
      bot: Bot.getInstance(),
    };
  },
  mounted() {
    // Listen for the KIMI-TOKENS message from background.js
    ipcRenderer.on("KIMI-TOKENS", (event, tokens) => {
      this.setKimi(tokens);
    });
  },
  methods: {
    ...mapMutations(["setKimi"]),
  },
};
</script>
