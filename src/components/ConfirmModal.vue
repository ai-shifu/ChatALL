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
let _title = ref("");
let _text = ref("");

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

// Using defineExpose to expose showModal and close methods to be accessible from outside and template
defineExpose({
  showModal,
  close,
});
</script>
