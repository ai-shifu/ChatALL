<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
import { mapState, mapMutations } from "vuex";

import Bot from "@/bots/MOSSBot";
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
    // Listen for the moss-secret message from background.js
    ipcRenderer.on("moss-secret", (event, secret) => {
      const token = JSON.parse(JSON.parse(secret)); // Unwrap the secret
      this.setMoss(token);
    });
  },
  computed: {
    ...mapState(["moss"]),
  },
  methods: {
    ...mapMutations(["setMoss"]),
  },
};
</script>
