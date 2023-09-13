<template>
  <v-list>
    <v-list-item>
      <v-list-item-title>{{ $t("proxy.enableProxy") }}</v-list-item-title>
      <v-checkbox
        :label="$t('settings.enable')"
        v-model="proxySettings.enableProxy"
        hide-details
      ></v-checkbox>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>{{ $t("proxy.proxyMode") }} </v-list-item-title>
      <v-radio-group inline hide-details v-model="proxySettings.proxyMode">
        <v-radio :label="$t('proxy.globalMode')" value="normal"></v-radio>
        <v-radio :label="$t('proxy.pacFileMode')" value="pacFile"></v-radio>
        <v-radio :label="$t('proxy.pacUrlMode')" value="pacUrl"></v-radio>
      </v-radio-group>
    </v-list-item>

    <v-list-item v-if="proxySettings.proxyMode == 'normal'">
      <v-list-item-title>{{ $t("proxy.address") }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.proxyServer"
        :hint="
          $t('settings.forExample', { example: $t('proxy.addressExample') })
        "
        persistent-hint
      ></v-text-field>
      <v-list-item-title>{{ $t("proxy.byPass") }}</v-list-item-title>
      <v-tabs fixed-tabs v-model="bypassSetMode">
        <v-tab value="quickSet">
          {{ $t("proxy.quickSet") }}
        </v-tab>
        <v-tab value="fullSet">
          {{ $t("proxy.fullSet") }}
        </v-tab>
      </v-tabs>
      <v-card>
        <v-row
          class="align-content-start"
          v-if="bypassSetMode == 'quickSet'"
          dense
        >
          <template v-for="(bot, index) in bots" :key="index">
            <v-col cols="auto" class="pt-2">
              <v-checkbox
                v-model="botsProxy"
                :label="bot.name"
                :value="bot.name"
                hide-details
              ></v-checkbox>
            </v-col>
          </template>
        </v-row>
      </v-card>
      <v-card v-if="bypassSetMode == 'fullSet'">
        <v-textarea
          v-model="proxySettings.proxyBypassList"
          :hint="$t('proxy.byPassHint')"
          persistent-hint
        ></v-textarea>
      </v-card>
    </v-list-item>

    <v-list-item v-if="proxySettings.proxyMode == 'pacFile'">
      <v-list-item-title>{{ $t("proxy.pacFile") }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.pacFile"
        :label="$t('proxy.pacFileUsing')"
        disabled
      ></v-text-field>
      <v-file-input
        :label="$t('proxy.pacFileNew')"
        @change="onFileChange"
      ></v-file-input>
    </v-list-item>

    <v-list-item v-if="proxySettings.proxyMode == 'pacUrl'">
      <v-list-item-title>{{ $t("proxy.pacUrl") }}</v-list-item-title>
      <v-text-field
        v-model="proxySettings.pacUrl"
        :label="$t('proxy.pacUrl')"
      ></v-text-field>
    </v-list-item>

    <v-list-item>
      <v-btn color="primary" @click="saveAndActive" class="ma-2 pa-2">
        {{ $t("proxy.saveAndApply") }}
      </v-btn>
      <v-btn variant="outlined" color="primary" @click="onlySave">
        {{ $t("proxy.onlySave") }}
      </v-btn>
      <v-btn
        variant="outlined"
        color="primary"
        @click="reload"
        class="ma-2 pa-2"
      >
        {{ $t("proxy.reload") }}
      </v-btn>
      <v-btn variant="outlined" color="primary" @click="resetAll">
        {{ $t("proxy.reset") }}
      </v-btn>
    </v-list-item>

    <v-list-item>
      <v-divider></v-divider>
    </v-list-item>
    <v-list-item>
      <v-list-item-title>{{ $t("proxy.proxyFilePath") }}</v-list-item-title>
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

  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import ConfirmModal from "@/components/ConfirmModal.vue";
import i18n from "@/i18n";
import { onMounted, reactive, ref, watch } from "vue";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
const confirmModal = ref(null);

const proxySettings = ref({});
const userDataPath = ref("");
const snackbar = reactive({
  show: false,
  text: "",
  timeout: 1500,
  color: "success",
});

const bots = ref([
  {
    name: i18n.global.t("bard.name"),
    bypassList: "*.google.com",
  },
  {
    name: i18n.global.t("bingChat.name"),
    bypassList: "*.bing.com",
  },
  {
    name: i18n.global.t("chatGpt.name"),
    bypassList: "*.openai.com",
  },
  {
    name: i18n.global.t("ernie.name"),
    bypassList: "yiyan.baidu.com",
  },
  {
    name: i18n.global.t("huggingChat.name"),
    bypassList: "*.huggingface.co",
  },
  {
    name: i18n.global.t("gradio.name"),
    bypassList: "*.gradio.app",
  },
  {
    name: i18n.global.t("lmsys.name"),
    bypassList: "*.lmsys.org",
  },
  {
    name: i18n.global.t("moss.name"),
    bypassList: "*.moss.fastnlp.top",
  },
  {
    name: i18n.global.t("openaiApi.name"),
    bypassList: "*.openai.com",
  },
  {
    name: i18n.global.t("azureOpenaiApi.name"),
    bypassList: "*.azure.com",
  },
  {
    name: i18n.global.t("poe.name"),
    bypassList: "*.poe.com",
  },
  {
    name: i18n.global.t("qianWen.name"),
    bypassList: "*.aliyun.com",
  },
  {
    name: i18n.global.t("skyWork.name"),
    bypassList: "*.tiangong.cn",
  },
  {
    name: i18n.global.t("spark.name"),
    bypassList: "*.xfyun.cn;*.mudu.tv;geetest.com",
  },
  {
    name: i18n.global.t("wenxinQianfan.name"),
    bypassList: "*.aip.baidubce.com",
  },
  {
    name: i18n.global.t("proxy.googleService"),
    bypassList: "*.google.com",
  },
]);
const botsProxy = ref([]);
const newInputfile = ref("");
const bypassSetMode = ref("");

onMounted(async () => {
  userDataPath.value = await ipcRenderer.invoke("get-proxy-setting-path");
  proxySettings.value = await ipcRenderer.invoke("get-proxy-setting-content");
  botsProxy.value = JSON.parse(proxySettings.value.bypassBotsProxy);
});

async function resetAll() {
  const result = await confirmModal.value.showModal(
    "",
    i18n.global.t("proxy.resetAllMessage"),
  );
  if (result) {
    await ipcRenderer.invoke("reset-proxy-default-setting");
    proxySettings.value = await ipcRenderer.invoke("get-proxy-setting-content");
  }
}

async function reload() {
  const result = await confirmModal.value.showModal(
    "",
    i18n.global.t("proxy.reloadMessage"),
  );
  if (result) {
    proxySettings.value = await ipcRenderer.invoke("get-proxy-setting-content");
  }
}

async function onlySave() {
  console.log(proxySettings.value);
  const oldPacFile = proxySettings.value.pacFile;
  if (newInputfile.value) {
    proxySettings.value.pacFile = newInputfile.value;
  }
  const data = JSON.parse(JSON.stringify(proxySettings.value));
  const reply = await ipcRenderer.invoke("save-proxy-setting", { data });
  console.log(reply);
  if (reply.success) {
    snackbar.text = i18n.global.t("proxy.saveSuccess");
    snackbar.color = "success";
    snackbar.timeout = 1000;
  } else {
    proxySettings.value.pacFile = oldPacFile;
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
  const result = await confirmModal.value.showModal(
    "",
    i18n.global.t("proxy.saveAndActiveMessage"),
  );
  if (result) {
    await onlySave();
    await ipcRenderer.invoke("save-proxy-and-restart");
  }
}

watch(botsProxy, (newVal) => {
  let bypassListSet = new Set(proxySettings.value.proxyBypassList.split(";"));
  console.log(bypassListSet);
  console.log(newVal);
  newVal.forEach((botName) => {
    const bot = bots.value.find((bot) => bot.name === botName);
    if (bot) {
      bot.bypassList.split(";").forEach((item) => bypassListSet.add(item));
    }
  });
  const bypassList = Array.from(bypassListSet).join(";");
  console.log(bypassList); // 输出合并后的bypassList
  proxySettings.value.proxyBypassList = bypassList;
  proxySettings.value.bypassBotsProxy = JSON.stringify(botsProxy.value);
});

defineExpose({
  proxySettings,
  userDataPath,
  snackbar,
  onlySave,
  saveAndActive,
  reload,
  resetAll,
  onFileChange,
});
</script>
