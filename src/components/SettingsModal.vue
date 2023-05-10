<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list lines="two" subheader>
        <v-list-subheader>{{ $t("settings.general") }}</v-list-subheader>
        <v-list-item>
          <v-list-item-title>{{ $t("settings.language") }}</v-list-item-title>
          <v-list-item-subtitle>{{
            $t("settings.languagePrompt")
          }}</v-list-item-subtitle>
          <v-select
            v-model="lang"
            :items="languages"
            item-title="name"
            item-value="code"
            hide-details
            @update:model-value="setCurrentLanguage($event)"
          ></v-select>
        </v-list-item>

        <v-divider></v-divider>
        <ChatGPTBotSettings></ChatGPTBotSettings>
        <v-divider></v-divider>
        <OpenAIAPIBotSettings></OpenAIAPIBotSettings>
        <v-divider></v-divider>
        <BingChatBotSettings></BingChatBotSettings>
        <v-divider></v-divider>
        <WenxinQianfanBotSettings></WenxinQianfanBotSettings>
        <v-divider></v-divider>
        <SparkBotSettings></SparkBotSettings>
        <v-divider></v-divider>
        <MOSSBotSettings></MOSSBotSettings>
        <v-divider></v-divider>
        <BardBotSettings></BardBotSettings>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import ChatGPTBotSettings from "@/components/BotSettings/ChatGPTBotSettings.vue";
import OpenAIAPIBotSettings from "@/components/BotSettings/OpenAIAPIBotSettings.vue";
import BingChatBotSettings from "@/components/BotSettings/BingChatBotSettings.vue";
import SparkBotSettings from "./BotSettings/SparkBotSettings.vue";
import BardBotSettings from "@/components/BotSettings/BardBotSettings.vue";
import MOSSBotSettings from "@/components/BotSettings/MOSSBotSettings.vue";
import WenxinQianfanBotSettings from "@/components/BotSettings/WenxinQianfanBotSettings.vue";

export default {
  components: {
    ChatGPTBotSettings,
    OpenAIAPIBotSettings,
    BingChatBotSettings,
    SparkBotSettings,
    MOSSBotSettings,
    BardBotSettings,
    WenxinQianfanBotSettings,
  },
  data() {
    return {
      dialog: false,
      languages: [
        { name: this.$t("settings.auto"), code: "auto" },
        { name: "English", code: "en" },
        { name: "中文", code: "zh" },
      ],
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    ...mapMutations(["setCurrentLanguage"]),
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>
