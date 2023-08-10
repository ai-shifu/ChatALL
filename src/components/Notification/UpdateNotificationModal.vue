<template>
  <div id="snackbar" class="text-center">
    <v-snackbar :vertical="true" :timeout="-1" multi-line v-model="snackbar">
      <span class="text-center font-weight-bold">
        {{ $t("updates.updateAvailable") }}
      </span>
      <span class="text-center">
        {{ $t("updates.currentVersion") }}: {{ versions.current }}
      </span>
      <span class="text-center">
        {{ $t("updates.latestVersion") }}: {{ versions.latest }}
      </span>
      <v-btn
        prepend-icon="mdi-github"
        color="primary"
        variant="tonal"
        @click="openReleasePage"
      >
        {{ $t("updates.downloadFromGitHub") }}
      </v-btn>
      <template v-slot:actions>
        <v-btn color="primary" @click="skip">
          {{ $t("updates.skipThisVersion") }}
        </v-btn>
        <v-btn color="primary" @click="snackbar = false">
          {{ $t("updates.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { compare } from "compare-versions";
const { shell, ipcRenderer } = window.require("electron");

let versions = undefined;
const snackbar = ref(false);
ipcRenderer.on("version-saved", checkVersion);

function checkVersion() {
  versions = JSON.parse(localStorage.getItem("chatall-versions"));
  if (
    versions?.latest &&
    versions?.current &&
    compare(versions.latest, versions.current, ">")
  ) {
    if (!versions?.skip || compare(versions.latest, versions.skip, ">")) {
      snackbar.value = true;
    }
  }
  ipcRenderer.removeListener("version-saved", checkVersion);
}

function skip() {
  snackbar.value = false;
  versions.skip = versions.latest;
  localStorage.setItem("chatall-versions", JSON.stringify(versions));
}

function openReleasePage() {
  snackbar.value = false;
  shell.openExternal(`https://github.com/sunner/ChatALL/releases/latest`);
}
</script>
<style scoped>
:deep() .v-btn {
  text-transform: none;
  margin: 0.2rem;
}

:deep() .v-snackbar__actions {
  margin: 0 !important;
  justify-content: end;
  width: 100%;
}

:deep() .v-snackbar__content {
  padding: 0.5rem;
  padding-bottom: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}

span {
  color: rgb(var(--v-theme-font));
}
</style>
