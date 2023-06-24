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
        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-black">
              {{ $t("footer.chooseFavorite") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          class="bots-list"
          density="compact"
          :selected="favorited"
          select-strategy="classic"
          nav
        >
          <v-list-item
            v-for="(bot, index) in bots.all"
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
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import bots from "@/bots";
import BotLogo from "./BotLogo.vue";
import store from "@/store";

const props = defineProps(["favBots"]);

let menu = ref(false);
const favorited = computed(() => {
  return props.favBots.map((bot) => bot.classname);
});

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

defineExpose({
  toggleMenu,
});
</script>

<style>
.bots-list {
  column-count: 3
}
</style>
