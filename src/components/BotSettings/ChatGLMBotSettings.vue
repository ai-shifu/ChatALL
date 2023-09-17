<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
import Bot from "@/bots/ChatGLMBot";
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
    // Listen for the CHATGLM-TOKEN message from background.js
    ipcRenderer.on("CHATGLM-TOKENS", (event, token) => {
      this.setChatGLM(token);
    });
  },
  methods: {
    ...mapMutations(["setChatGLM"]),
  },
};
</script>
