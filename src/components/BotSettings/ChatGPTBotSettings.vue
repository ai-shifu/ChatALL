<template>
  <v-list-item>
    <v-alert type="info" outlined>{{ $t("chatGpt.notice") }} </v-alert>
  </v-list-item>
  <login-setting :bot="bot"></login-setting>
  <v-list-item>
    <v-list-item-title>{{ $t("chatGpt.autoRefresh") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("chatGpt.autoRefreshPrompt")
    }}</v-list-item-subtitle>
    <v-checkbox
      v-model="autoRefresh"
      color="primary"
      hideDetails="auto"
      :label="$t('settings.enable')"
    ></v-checkbox>
  </v-list-item>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Bot from "@/bots/openai/ChatGPTBot";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";

const AUTO_REFRESH_CYCLE = 45; // seconds

export default {
  components: {
    LoginSetting,
  },
  data() {
    return {
      bot: Bot.getInstance(),
    };
  },
  methods: {
    ...mapMutations(["setChatgpt"]),
  },
  computed: {
    ...mapState(["chatgpt"]),
    autoRefresh: {
      get() {
        return this.chatgpt.refreshCycle > 0;
      },
      set(auto) {
        if (auto) {
          this.setChatgpt(AUTO_REFRESH_CYCLE);
          this.bot.setRefreshCycle(AUTO_REFRESH_CYCLE);
        } else {
          this.setChatgpt(0);
          this.bot.setRefreshCycle(0);
        }
      },
    },
  },
};
</script>
