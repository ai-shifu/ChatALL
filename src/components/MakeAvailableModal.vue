<template>
  <v-dialog :model-value="open" persistent width="auto">
    <v-list v-if="botSettings !== null">
      <component :is="botSettings" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onDone">{{ $t("modal.done") }}</v-btn>
      </v-card-actions>
    </v-list>
  </v-dialog>
</template>

<script setup>
import { markRaw, ref, watch } from "vue";

const props = defineProps(["open", "bot"]);
const emit = defineEmits(["update:open", "done"]);

const botSettings = ref(null);
watch(
  () => props.bot,
  async (newBot) => {
    if (newBot) {
      botSettings.value = markRaw(await newBot.getSettingsComponent());
    } else {
      botSettings.value = null;
    }
  },
);

const onDone = () => {
  emit("update:open", false);
  emit("done");
};
</script>

<style scoped></style>
