<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
import Bot from "@/bots/CharacterAIBot";
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
    // Listen for the CHARACTER-AI-TOKENS message from background.js
    ipcRenderer.on("CHARACTER-AI-TOKENS", (event, token) => {
      try {
        const tokenInfo = JSON.parse(token);
        this.setCharacterAI({ token: tokenInfo.value, ttl: tokenInfo.ttl });
      } catch (error) {
        console.error("CHARACTER-AI-TOKENS", error);
      }
    });
  },
  methods: {
    ...mapMutations(["setCharacterAI"]),
  },
};
</script>
