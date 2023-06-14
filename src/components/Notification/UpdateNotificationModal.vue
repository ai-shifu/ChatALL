<template>
  <div id="snackbar" class="text-center">
    <v-snackbar color="#fff" :vertical="true" :timeout="-1" multi-line v-model="snackbar">
      <span class="text-black text-center font-weight-bold">
        {{ $t('updates.updateAvailable') }}
      </span>
      <span class="text-black text-center">
        {{ $t('updates.currentVersion') }}: {{ versions.current }}
      </span>
      <span class="text-black text-center">
        {{ $t('updates.latestVersion') }}: {{ versions.latest }}
      </span>
      <template v-slot:actions>
        <v-btn prepend-icon="mdi-github" color="#062aaa" variant="tonal" @click="install" class="update-notification-btn">
          {{ $t('updates.downloadFromGitHub') }}
        </v-btn>
        <v-btn  color="red" variant="outlined" @click="skip" class="update-notification-btn">
          {{ $t('updates.skipThisVersion') }}
        </v-btn>
        <v-btn flat class="text-black update-notification-btn" variant="text" @click="snackbar = false">
          {{ $t('updates.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import store from "@/store";
import { ref } from "vue";
import { compare } from 'compare-versions';
const { shell } = window.require("electron");

const versions = store.state.versions;
const text = ref('');
const snackbar = ref(false);
if (versions?.latest && versions?.current && compare(versions.latest, versions.current, '>')) {
  if (!versions?.skip || compare(versions.latest, versions.skip, '>')) {
    text.value = `Update Available!<br />Your Version: ${versions.current}, Latest Version: ${versions.latest}`
    snackbar.value = true;
  }
}

function skip() {
  snackbar.value = false;
  store.commit("setSkipVersion", versions.latest);
}

function install() {
  snackbar.value = false;
  shell.openExternal(`https://github.com/sunner/ChatALL/releases/tag/${versions.latest}`);
}
</script>
<style>
</style>

<style scoped>
:deep() span {
  /* font-size: 18px;
  line-height: 1.5; */
}

:deep() .v-btn {
  text-transform: none;
  margin: .2rem;
}

:deep() .v-snackbar__actions {
  margin: .3rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

:deep() .v-snackbar__content {
  padding: .5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}
</style>
