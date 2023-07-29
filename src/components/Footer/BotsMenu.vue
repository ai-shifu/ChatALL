<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="top"
      scroll-strategy="block"
      offset="12"
      width="100vw"
      height="100vh"
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
            <!-- <v-select
              v-model="value"
              :items="items"
              item-title="name"
              item-value="tag"
              chips
              multiple
              :label="$t('tag')"
              @update:model-value="filterBots($event)"
            ></v-select> -->
            <v-btn-toggle
              v-model="selected"
              rounded="0"
              color="deep-purple-accent-3"
              group
              multiple
              @update:model-value="filterBots($event)"
            >
              <v-btn
                v-for="(item, index) in items"
                :key="index"
                :value="item.tag"
              >
                {{ item.name }}
              </v-btn>
            </v-btn-toggle>
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
            v-for="(bot, index) in currentBots"
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
import { useI18n } from "vue-i18n";
import i18n from "@/i18n";

import bots from "@/bots";
import { tags } from "@/bots";
import BotLogo from "./BotLogo.vue";
import store from "@/store";

const { t: $t } = useI18n();
const items = Object.keys(tags).map((tag) => ({
  name: i18n.global.t(tag),
  tag,
}));
const selected = ref([]);
const props = defineProps(["favBots"]);
const currentBots = ref(bots.all);
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
function filterBots(values) {
  let filtered;
  if (values.length) {
    filtered = values.map((value) => tags[value]).flat();
  } else {
    filtered = bots.all;
  }
  currentBots.value = filtered;
}

defineExpose({
  toggleMenu,
});
</script>

<style>
.bots-list {
  column-count: 3;
}
</style>
