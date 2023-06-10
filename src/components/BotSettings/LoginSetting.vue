<template>
  <v-list-item>
    <v-list-item-title>{{ $t("settings.loginOrOut") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("settings.loginOrOutPrompt")
    }}</v-list-item-subtitle>
    <a :href="bot.getLoginUrl()" target="_blank" @click="openLoginWindow">
      {{ bot.getLoginUrl() }}
    </a>
  </v-list-item>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  props: {
    bot: {
      type: Object,
      default: null,
    },
  },
  methods: {
    openLoginWindow(event) {
      event.preventDefault();
      const loginUrl = this.bot.getLoginUrl();
      const userAgent = this.bot.getUserAgent();
      ipcRenderer.invoke("create-new-window", loginUrl, userAgent);
    },
  },
};
</script>
