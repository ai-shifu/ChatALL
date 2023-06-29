<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
import { mapMutations } from "vuex";

import Bot from "@/bots/SkyWorkBot";
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
    // Listen for the SKYWORK-TOKENS message from background.js
    ipcRenderer.on("SKYWORK-TOKENS", (event, tokens) => {
      this.setSkyWork(tokens);
    });
  },
  methods: {
    ...mapMutations(["setSkyWork"]),
  },
};
</script>
