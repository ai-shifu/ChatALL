<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="top"
      scroll-strategy="block"
      offset="12"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          size="36"
          color="primary"
          flat
          icon="mdi-dots-horizontal"
        >
        </v-btn>
      </template>

      <v-card>
        <v-list
          class="bots-list"
          density="compact"
          :selected="favorited"
          select-strategy="classic"
          nav
        >
          <v-list-item
            v-for="(bot, index) in shownBots"
            :key="index"
            :value="bot.getClassname()"
            color="primary"
            @click="toggleFavorite(bot)"
          >
            <template v-slot:prepend="{ isActive }">
              <v-list-item-action start>
                <v-checkbox-btn
                  color="primary"
                  :model-value="isActive"
                ></v-checkbox-btn>
              </v-list-item-action>
            </template>
            <v-list-item-title>
              <BotLogo :bot="bot" active="true" size="24"></BotLogo>&nbsp;
              <span>{{ bot.getFullname() }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-black">
              {{ $t("footer.chooseFavorite") }}
            </v-list-item-title>
            <template v-slot:append>
              <v-btn-toggle
                v-model="selectedTags"
                divided
                color="primary"
                group
                multiple
                variant="outlined"
                rounded="xl"
                @update:model-value="filterBots($event)"
              >
                <v-btn v-for="(tag, index) in tags" :key="index" :value="tag">
                  {{ $t(`footer.${tag}`) }}
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import bots from "@/bots";
import { botTags } from "@/bots";
import BotLogo from "./BotLogo.vue";
import store from "@/store";

let menu = ref(false);

const props = defineProps(["favBots"]);
const favorited = computed(() => {
  return props.favBots.map((bot) => bot.classname);
});

const tags = Object.keys(botTags);
const selectedTags = ref([]);
const shownBots = ref(bots.all);

const toggleFavorite = (bot) => {
  const classname = bot.getClassname();
  if (favorited.value.includes(classname)) {
    store.commit("removeFavoriteBot", classname);
  } else {
    store.commit("addFavoriteBot", classname);
  }
};

function toggleMenu() {
  menu.value = !menu.value;
}

function filterBots(selectedTags) {
  let filteredIn = bots.all;

  if (selectedTags.length) {
    const tagBots = selectedTags.map((tag) => botTags[tag]);
    filteredIn = filteredIn.filter((bot) => {
      return tagBots.every((tagBot) => tagBot.includes(bot));
    });
  }
  shownBots.value = filteredIn;
}

defineExpose({
  toggleMenu,
});
</script>

<style>
.bots-list {
  column-count: 3;
}

/* Keep the orignal case of tab names */
.v-btn {
  text-transform: none !important;
}
</style>
