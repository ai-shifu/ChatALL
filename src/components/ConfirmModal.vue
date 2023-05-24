<template>
  <v-dialog v-model="dialog" max-width="290" @click:outside="close(false)">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click="close(false)">{{
          $t("header.no")
        }}</v-btn>
        <v-btn color="primary darken-1" @click="close(true)">{{
          $t("header.yes")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

let dialog = ref(false);
let title = ref("");

let close;

const showModal = (message) => {
  title.value = message;
  return new Promise((resolve) => {
    dialog.value = true;
    close = (result) => {
      resolve(result);
      dialog.value = false;
    };
  });
};

// Using defineExpose to expose showModal and close methods to be accessible from outside and template
defineExpose({
  showModal,
  close,
});
</script>
