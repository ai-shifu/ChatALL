<template>
  <v-avatar
    rounded="rounded"
    :class="{ active: active, invert: isLogoInverted }"
    :image="bot.getLogo()"
    :alt="bot.getFullname()"
    :title="bot.getFullname()"
  ></v-avatar>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { Theme } from "@/theme";

const store = useStore();
const props = defineProps(["bot", "active"]);
const isLogoInverted = computed(() => {
  return store.state.theme === Theme.DARK && props.bot?.isDarkLogo();
});
</script>

<style>
.v-avatar {
  opacity: 0.5;
  filter: grayscale(100%);
  cursor: pointer;
}

.active {
  opacity: 1;
  filter: grayscale(0%);
}

.invert {
  filter: invert(100%);
}
</style>
