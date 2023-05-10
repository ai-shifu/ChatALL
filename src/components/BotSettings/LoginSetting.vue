<template>
  <v-list-item>
    <v-list-item-title>{{ $t("settings.loginOrOut") }}</v-list-item-title>
    <v-list-item-subtitle>{{
      $t("settings.loginOrOutPrompt")
    }}</v-list-item-subtitle>
    <a :href="bot.getLoginUrl()" target="_blank" @click="createWindow">
      {{ bot.getLoginUrl() }}
    </a>
  </v-list-item>
</template>

<script>
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default {
  props: {
    bot: {
      type: Object,
      default: null,
    },
  },
  methods: {
    createWindow(event) {
      ipcRenderer.invoke(
        "create-new-window",
        this.bot.getLoginUrl(),
        this.bot.getUserAgent(),
      );
      event.preventDefault();
    },
  },
};
</script>
