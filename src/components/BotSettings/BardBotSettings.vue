<template>
  <v-list-subheader>{{ bot.getBrandName() }}</v-list-subheader>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
import Bot from "@/bots/BardBot";
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
};
</script>
