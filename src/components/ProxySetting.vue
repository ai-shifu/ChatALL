<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>{{ $t("proxy.address") }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.proxyServer"
        :hint="$t('proxy.addressHint')"
      ></v-text-field>
      <v-radio-group
        inline
        v-model="proxySettings.enableProxy"
        :label="$t('proxy.enableProxy')"
      >
        <v-radio
          :label="$t('proxy.enable')"
          value="Yes"
        ></v-radio>
        <v-radio
          :label="$t('proxy.disable')"
          value="No"
        ></v-radio>
      </v-radio-group>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>{{ $t("proxy.proxyMode") }}</v-list-item-title>
      <v-radio-group
        inline
        v-model="proxySettings.proxyMode"
        label=""
      >
        <v-radio
          :label="$t('proxy.globalMode')"
          value="All"
        ></v-radio>
        <v-radio
          :label="$t('proxy.pacMode')"
          value="PAC"
        ></v-radio>
      </v-radio-group>
    </v-list-item>
    <v-list-item v-if="proxySettings.proxyMode != 'PAC'">
      <v-list-item-title>{{ $t("proxy.byPass") }}</v-list-item-title>
      <v-textarea
        v-model="proxySettings.proxyBypassList"
        :hint="$t('proxy.byPassHint')"
        persistent-hint
      ></v-textarea>
    </v-list-item>
    <v-list-item v-if="proxySettings.proxyMode == 'PAC'">
      <v-list-item-title>{{ $t("proxy.pacMode") }}</v-list-item-title>
      <v-radio-group
        inline
        v-model="proxySettings.PACMode"
      >
        <v-radio
          :label="$t('proxy.fromFile')"
          value="File"
        ></v-radio>
        <v-radio
          :label="$t('proxy.fromURL')"
          value="URL"
        ></v-radio>
      </v-radio-group>
    </v-list-item>
    <v-list-item v-if="proxySettings.proxyMode == 'PAC'">
      <v-list-item-title>{{ $t("proxy.pacFile") }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.PACfile"
        :label="$t('proxy.pacFileUsing')"
        disabled
      ></v-text-field>
      <v-file-input
      :label="$t('proxy.pacFileNew')"
        @change="onFileChange"
      ></v-file-input>
    </v-list-item>
    <v-list-item v-if="proxySettings.proxyMode == 'PAC'">
      <v-list-item-title>{{ $t('proxy.pacUrl') }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.PACUrl"
        :label="$t('proxy.pacUrl')"
      ></v-text-field>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>{{ $t('proxy.action') }}</v-list-item-title>
      <v-btn
        color="#5865f2"
        @click="onlySave"
      >
        {{ $t('proxy.onlySave') }}
      </v-btn>
      <v-btn
        color="#5865f2"
        @click="saveAndActive"
        class="ma-2 pa-2"
      >
        {{ $t('proxy.saveAndApply') }}
      </v-btn>
      <v-btn
        color="#5865f2"
        @click="reload"
        class="ma-2 pa-2"
      >
        {{ $t('proxy.reload') }}
      </v-btn>
      <v-btn
        color="#5865f2"
        @click="resetAll"
        class="ma-2 pa-2"
      >
        {{ $t('proxy.reset') }}
      </v-btn>
    </v-list-item>
    <v-list-item>
        <v-alert
    type="info"
    variant="outlined"
    :text="$t('proxy.saveHint')"
  ></v-alert>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>{{ $t('proxy.proxyFilePath') }}</v-list-item-title>
      <v-text-field
        v-model="userDataPath"
        disabled
        :hint="$t('proxy.proxyFilePathHint')"
        persistent-hint
      ></v-text-field>
    </v-list-item>
  </v-list>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>
  
  <script>
import i18n from "@/i18n";
import { onMounted, reactive, ref } from "vue";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default {
  setup() {
    const proxySettings = ref({});
    const userDataPath = ref("");
    const snackbar = reactive({
      show: false,
      text: "",
      timeout: 1500,
      color: "success",
    });
    const newInputfile = ref("");

    onMounted(async () => {
      userDataPath.value = await ipcRenderer.invoke("get-proxy-setting-path");
      proxySettings.value = await ipcRenderer.invoke(
        "get-proxy-setting-content",
      );
    });

    async function resetAll() {
      console.log("reset all");
      await ipcRenderer.invoke("reset-proxy-default-setting");
      proxySettings.value = await ipcRenderer.invoke(
        "get-proxy-setting-content",
      );
    }

    async function reload() {
      proxySettings.value = await ipcRenderer.invoke(
        "get-proxy-setting-content",
      );
    }

    async function onlySave() {
      console.log(proxySettings.value);
      const oldPacFile = proxySettings.value.PACfile;
      if (newInputfile.value) {
        proxySettings.value.PACfile = newInputfile.value;
      }
      const data = JSON.parse(JSON.stringify(proxySettings.value));
      const reply = await ipcRenderer.invoke("save-proxy-setting", { data });
      console.log(reply);
      if (reply.success) {
        snackbar.text = i18n.global.t("proxy.saveSuccess");
        snackbar.color = "success";
        snackbar.timeout = 1000;
      } else {
        proxySettings.value.PACfile = oldPacFile;
        // snackbar.text = `Save failed: ${reply.error}`;
        snackbar.text = `${i18n.global.t("proxy.saveFailed")}: ${reply.error}`;
        snackbar.color = "error";
        snackbar.timeout = 3000;
      }
      snackbar.show = true;
    }

    function onFileChange(file) {
      console.log(file);
      console.log(file.target.files[0].path);
      newInputfile.value = file.target.files[0].path;
    }

    async function saveAndActive() {
      console.log(proxySettings.value);
      await onlySave();
      await ipcRenderer.invoke("save-proxy-and-restart");
    }

    return {
      proxySettings,
      userDataPath,
      snackbar,
      onlySave,
      saveAndActive,
      reload,
      resetAll,
      onFileChange,
    };
  },
};
</script>