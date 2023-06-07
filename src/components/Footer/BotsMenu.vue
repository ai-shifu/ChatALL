<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="top">
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

      <v-card min-width="300">
        <v-list>
          <v-list-item v-for="(bot, index) in bots.all" :key="index">
            <v-switch
              v-model="favorited"
              color="primary"
              hide-details
              inline
              :value="bot.getClassname()"
              :label="bot.getFullname()"
            >
              <template v-slot:label>
                <BotLogo :bot="bot" active="true"></BotLogo> &nbsp;
                <span>{{ bot.getFullname() }}</span>
              </template>
            </v-switch>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import bots from "@/bots";
import BotLogo from "./BotLogo.vue";

defineProps(["favBots"]);

let menu = ref(false);
const favorited = reactive([]);
</script>
