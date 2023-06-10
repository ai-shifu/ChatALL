<template>
  <v-avatar
    size="36"
    rounded="rounded"
    :class="{ active: active }"
    :image="bot.getLogo()"
    :alt="bot.getFullname()"
    :title="bot.getFullname()"
  ></v-avatar>
</template>

<script setup>
defineProps(["bot", "active"]);
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
</style>
