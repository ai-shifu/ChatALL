<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
import Bot from "@/bots/ClaudeAIBot";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";
import { mapMutations } from "vuex";
const { ipcRenderer } = window.require("electron");

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
