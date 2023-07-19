<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    max-width="80%"
    @click:outside="close(false)"
  >
    <v-card :title="_title">
      <v-card-text>
        <div v-html="_text"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" @click="close(false)">{{
          $t("header.no")
        }}</v-btn>
        <v-btn
          ref="defaultButton"
          variant="flat"
          color="primary"
          class="bg-primary"
          @click="close(true)"
          >{{ $t("header.yes") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

let dialog = ref(false);
let _title = ref("");
let _text = ref("");
const defaultButton = ref(null);

let close;

const showModal = (title, text = "") => {
  _title.value = title;
  _text.value = text.replace(/\n/g, "<br />");
  return new Promise((resolve) => {
    dialog.value = true;
    close = (result) => {
      resolve(result);
      dialog.value = false;
    };
  });
};

watch(
  dialog,
  () => {
    if (dialog.value) {
      nextTick(() => {
        defaultButton.value.$el.focus();
      });
    }
  },
  { immediate: true },
);

// Using defineExpose to expose showModal and close methods to be accessible from outside and template
defineExpose({
  showModal,
  close,
});
</script>
