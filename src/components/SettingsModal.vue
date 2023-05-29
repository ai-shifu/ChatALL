<template>
  <v-dialog
    :model-value="props.open"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list lines="two" subheader>
        <div class="section">
          <v-list-subheader>{{ $t("settings.general") }}</v-list-subheader>
          <v-list-item>
            <v-list-item-title>{{ $t("settings.language") }}</v-list-item-title>
            <v-select
              :items="languages"
              item-title="name"
              item-value="code"
              hide-details
              :model-value="lang"
              @update:model-value="setCurrentLanguage($event)"
            ></v-select>
          </v-list-item>
        </div>

        <template v-for="(setting, index) in settings" :key="index">
          <v-divider></v-divider>
          <div class="section">
            <component :is="setting"></component>
          </div>
        </template>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import ChatGPTBotSettings from "@/components/BotSettings/ChatGPTBotSettings.vue";
import OpenAIAPIBotSettings from "@/components/BotSettings/OpenAIAPIBotSettings.vue";
import BingChatBotSettings from "@/components/BotSettings/BingChatBotSettings.vue";
import SparkBotSettings from "./BotSettings/SparkBotSettings.vue";
import BardBotSettings from "@/components/BotSettings/BardBotSettings.vue";
import MOSSBotSettings from "@/components/BotSettings/MOSSBotSettings.vue";
import WenxinQianfanBotSettings from "@/components/BotSettings/WenxinQianfanBotSettings.vue";
import GradioAppBotSettings from "@/components/BotSettings/GradioAppBotSettings.vue";
import LMSYSBotSettings from "@/components/BotSettings/LMSYSBotSettings.vue";
import HuggingChatBotSettings from "@/components/BotSettings/HuggingChatBotSettings.vue";

const { t: $t, locale } = useI18n();
const store = useStore();

const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "done"]);

const settings = [
  ChatGPTBotSettings,
  OpenAIAPIBotSettings,
  WenxinQianfanBotSettings,
  GradioAppBotSettings,
  BardBotSettings,
  BingChatBotSettings,
  HuggingChatBotSettings,
  LMSYSBotSettings,
  MOSSBotSettings,
  SparkBotSettings,
];

const languages = computed(() => [
  { name: $t("settings.auto"), code: "auto" },
  { name: "Deutsch", code: "de" },
  { name: "English", code: "en" },
  { name: "Italiano", code: "it" },
  { name: "Русский", code: "ru" },
  { name: "简体中文", code: "zh" },
  { name: "Tiếng Việt", code: "vi" },
  { name: "Français", code: "fr" },
]);

const lang = computed(() => store.state.lang);

const setCurrentLanguage = (lang) => {
  locale.value = lang;
  store.commit("setCurrentLanguage", lang);
};
const closeDialog = () => {
  emit("update:open", false);
  emit("done");
};
</script>

<style scoped>
.section {
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 0 16px;
}
</style>
