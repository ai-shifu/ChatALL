<template>
  <v-list>
    <v-list-item>
      <v-btn
        color="primary"
        variant="outlined"
        :text="$t('chat.deleteAllChatHistory')"
        @click="deleteChats"
      ></v-btn>
      <v-btn
        color="primary"
        variant="outlined"
        :text="$t('chat.exportData')"
        @click="exportData"
        style="margin-left: 10px"
      ></v-btn>
      <v-btn
        color="primary"
        variant="outlined"
        :text="$t('chat.importData')"
        @click="importData"
        style="margin-left: 10px"
      >
      </v-btn>
    </v-list-item>
    <v-list-item>
      <v-row>
        <v-col class="align-baseline d-flex" style="font-size: 1.5rem">
          <label class="pr-3">{{ $t("chat.actions") }}</label>
          <v-btn
            class="mt-1"
            color="primary"
            variant="outlined"
            prepend-icon="mdi-plus"
            :text="$t('chat.addAction')"
            @click="add"
          ></v-btn>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item
      v-for="action in userActions"
      density="comfortable"
      :key="action.index"
      :value="action.index"
      :ripple="false"
    >
      <div class="align-center d-flex">
        <v-list-item-title class="pr-5">{{ action.name }}</v-list-item-title>
        <v-btn
          flat
          size="x-small"
          icon="mdi-pencil-outline"
          @click="edit(action)"
          style="background-color: transparent"
        ></v-btn>
        <v-btn
          flat
          size="x-small"
          icon="mdi-delete-outline"
          @click="deleteAction(action)"
          style="margin: 0; background-color: transparent"
        ></v-btn>
      </div>
    </v-list-item>
  </v-list>
  <v-dialog
    persistent
    width="90%"
    height="90%"
    :model-value="isOpenAddEditAction"
    @update:model-value="isOpenAddEditAction = $event"
  >
    <v-card>
      <v-form ref="formRef" class="pa-3" @submit.prevent>
        <v-text-field
          required
          autofocus
          v-model="actionName"
          placeholder="Summarize"
          :label="$t('chat.actionName')"
          :rules="[required]"
        ></v-text-field>
        <v-textarea
          required
          rows="3"
          v-model="prefix"
          :placeholder="prefixPlaceholder"
          :label="$t('chat.prefix')"
          @input="onInputTemplate"
        >
        </v-textarea>
        <v-textarea
          required
          rows="4"
          v-model="template"
          :placeholder="templatePlaceholder"
          :label="$t('chat.actionTemplate')"
          :rules="[required]"
          @input="onInputTemplate"
        >
          <template v-slot:append-inner>
            <v-btn
              flat
              size="x-small"
              icon="mdi-help"
              style="background-color: inherit"
              @click="
                isShowTemplateParametersDialog = !isShowTemplateGuideTooltip
              "
            >
            </v-btn>
          </template>
        </v-textarea>
        <v-textarea
          required
          rows="3"
          v-model="suffix"
          :placeholder="suffixPlaceholder"
          :label="$t('chat.suffix')"
          @input="onInputTemplate"
        >
        </v-textarea>
        <label class="pl-4" style="font-size: 1.2rem">{{
          $t("chat.preview")
        }}</label>
        <chat-prompt
          class="w-100"
          :message="{ content: previewRef }"
          :isThread="false"
          :columns="3"
        ></chat-prompt>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          color="primary"
          @click="isOpenAddEditAction = false"
          >{{ $t("modal.cancel") }}</v-btn
        >
        <v-btn variant="flat" class="bg-primary" @click="addEditAction">{{
          $t("modal.done")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    width="auto"
    :model-value="isShowTemplateParametersDialog"
    v-on:after-leave="isShowTemplateParametersDialog = false"
  >
    <v-card>
      <v-md-preview class="pa-4" :text="templateParametersInfo" />
    </v-card>
  </v-dialog>
  <ConfirmModal ref="confirmModal" />
  <v-snackbar
    v-model="snackbarWithReloadButton.show"
    :timeout="snackbarWithReloadButton.timeout"
    :color="snackbarWithReloadButton.color"
  >
    {{ snackbarWithReloadButton.text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="reloadPage">
        {{ $t("chat.reloadPage") }}
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar
    v-model="snackbarWithCloseButton.show"
    :timeout="snackbarWithCloseButton.timeout"
    :color="snackbarWithCloseButton.color"
  >
    {{ snackbarWithCloseButton.text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbarWithCloseButton.show = false">
        {{ $t("updates.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import bots from "@/bots";
import ConfirmModal from "@/components/ConfirmModal.vue";
import ChatPrompt from "@/components/Messages/ChatPrompt.vue";
import i18n from "@/i18n";
import db from "@/store/db";
import Dexie from "dexie";
import { exportDB, importInto } from "dexie-export-import";
import localForage from "localforage";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  prefixPlaceholder,
  preview,
  suffixPlaceholder,
  templatePlaceholder,
} from "../helpers/template-helper";

const emit = defineEmits(["close-dialog"]);
const confirmModal = ref();
const formRef = ref(null);
const isOpenAddEditAction = ref(false);
const actionName = ref("");
const prefix = ref("");
const template = ref("");
const suffix = ref("");
const previewRef = ref("");
const snackbarWithReloadButton = reactive({
  show: false,
  text: "",
  timeout: -1,
  color: "",
});
const snackbarWithCloseButton = reactive({
  show: false,
  text: "",
  timeout: -1,
  color: "",
});
const templateParametersInfo = `
#### ${i18n.global.t("chat.templateParameters")}:
| ${i18n.global.t("chat.parameter")}|${i18n.global.t("chat.description")}|
|-|-|
|{botName}|${i18n.global.t("chat.botNameDesc")}|
|{botResponse}|${i18n.global.t("chat.botResponseDesc")}|`;
const isShowTemplateParametersDialog = ref(false);
const store = useStore();
const userActions = computed(() => {
  return store.state.actions.filter((p) => !p.hide);
});
const previewSampleData = [
  {
    botName: "Bing Chat (Creative)",
    botResponse: "Hello, this is Bing. How are you today? 😊",
  },
  {
    botName: "ChatGPT (GPT-3.5)",
    botResponse: "Hello! How can I assist you today?",
  },
  {
    botName: "Bard",
    botResponse: "Hi there! How can I help you today?",
  },
  {
    botName: "YouChat",
    botResponse: "Hi there! How can I assist you today?",
  },
];
let editIndex = undefined;
let isEdit = false;
const required = (value) =>
  value?.trim() ? true : i18n.global.t("prompt.required");

const SETTING_FILE_NAME = "localforage.json";
const CHAT_HISTORY_FILE_NAME = "ChatALL.json";
async function exportData() {
  try {
    const settingBlob = getSettingWithoutBotSetting();
    const chatHistoryBlob = await exportDB(db);

    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    zip.file(SETTING_FILE_NAME, settingBlob);
    zip.file(CHAT_HISTORY_FILE_NAME, chatHistoryBlob);

    // Create a file name for the ZIP file.
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based in JavaScript
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    const fileName = `chatall-history-${year}${month}${day}-${hour}${minute}${second}`;
    zip.generateAsync({ type: "blob" }).then(function (zipBlob) {
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.zip`;
      document.body.appendChild(a);

      // Click the anchor element to download the file.
      a.click();

      // Remove the anchor element from the document body.
      document.body.removeChild(a);

      // Revoke the URL for the blob.
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error(error);
    snackbarWithCloseButton.text = `${i18n.global.t("chat.exportFailed")}: ${
      error.message
    }`;
    snackbarWithReloadButton.color = "error";
    snackbarWithCloseButton.show = true;
  }
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/ZIP";
  input.addEventListener("change", importDataOnChangeFile);
  document.body.appendChild(input);

  // Click the input element to select the file.
  input.click();
}

async function importDataOnChangeFile(event) {
  try {
    const file = event.target.files[0];
    const { default: JSZip } = await import("jszip");
    const zip = await JSZip.loadAsync(file);

    let chatHistoryString;
    let settingFileString;
    await new Promise((resolve, reject) => {
      let fileCount = 0;
      zip.forEach(async (relativePath, zipEntry) => {
        try {
          const exportedString = await zipEntry.async("string");
          if (relativePath === CHAT_HISTORY_FILE_NAME) {
            chatHistoryString = exportedString;
          } else if (relativePath === SETTING_FILE_NAME) {
            settingFileString = exportedString;
          }
          fileCount++;
          if (fileCount === 2) {
            resolve();
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    // import ChatALL db
    const chatHistoryBlob = new Blob([chatHistoryString]);
    await importInto(db, chatHistoryBlob, {
      overwriteValues: true,
    });

    // import localforage keyvaluepairs
    const settingDbObject = JSON.parse(settingFileString);
    const rows = settingDbObject.data.data.find(
      (d) => d.tableName === "keyvaluepairs",
    )?.rows;
    if (rows.length && rows[0].$ && rows[0].$.length > 1) {
      const chatallKey = rows[0].$[1];
      for (const key in chatallKey) {
        if (Array.isArray(chatallKey[key])) {
          const storeIndexes = store.state[key].map((item) => item.index);
          for (const importItem of chatallKey[key]) {
            let index = storeIndexes.indexOf(importItem.index);
            if (index === -1) {
              store.commit("pushSettingArray", {
                key,
                value: importItem,
              });
            } else {
              store.commit("updateSettingArray", {
                key,
                index,
                value: importItem,
              });
            }
          }
        } else {
          store.commit("updateSetting", {
            key,
            value: chatallKey[key],
          });
        }
      }
    }
    snackbarWithReloadButton.text = i18n.global.t("chat.importSuccess");
    snackbarWithReloadButton.color = "success";
    snackbarWithReloadButton.show = true;
  } catch (error) {
    console.error(error);
    snackbarWithCloseButton.text = `${i18n.global.t("chat.importFailed")}: ${
      error.message
    }`;
    snackbarWithReloadButton.color = "error";
    snackbarWithCloseButton.show = true;
  } finally {
    // Remove the input element from the document body.
    document.body.removeChild(event.target);
  }
}

function reloadPage() {
  window.location.reload();
}

async function getSettingWithoutBotSetting() {
  await localForage._dbInfo.db.close();
  const settingDb = await new Dexie("localforage").open();
  const userSettingBlob = await exportDB(settingDb);
  const userSettingText = await userSettingBlob.text();
  const userSettingJson = JSON.parse(userSettingText);
  const allBotBrandId = bots.all.map((bot) => bot.constructor._brandId);
  for (const brandId of allBotBrandId) {
    // delete bot related setting
    delete userSettingJson.data.data[0].rows[0].$[1][brandId];
  }
  const str = JSON.stringify(userSettingJson);
  const bytes = new TextEncoder().encode(str);
  return new Blob([bytes], {
    type: "application/json;charset=utf-8",
  });
}

async function deleteChats() {
  const confirm = await confirmModal.value.showModal(
    "",
    i18n.global.t("chat.confirmDeleteAllChatHistory"),
  );
  if (confirm) {
    store.commit("deleteChats");
    emit("close-dialog");
  }
}

function add() {
  isEdit = false;
  actionName.value = "";
  prefix.value = prefixPlaceholder;
  template.value = templatePlaceholder;
  suffix.value = suffixPlaceholder;
  isOpenAddEditAction.value = true;
  onInputTemplate();
}

function edit(item) {
  isEdit = true;
  actionName.value = item.name;
  prefix.value = item.prefix;
  template.value = item.template;
  suffix.value = item.suffix;
  editIndex = item.index;
  isOpenAddEditAction.value = true;
  onInputTemplate();
}

async function onInputTemplate() {
  try {
    previewRef.value = await preview(
      prefix.value,
      template.value,
      suffix.value,
      previewSampleData,
    );
  } catch (error) {
    previewRef.value = `Error:\n${error.message}`;
  }
}

async function addEditAction() {
  if ((await formRef.value.validate()).valid) {
    if (isEdit) {
      store.commit("editAction", {
        name: actionName.value,
        prefix: prefix.value,
        template: template.value,
        suffix: suffix.value,
        index: editIndex,
      });
    } else {
      store.commit("addAction", {
        name: actionName.value,
        prefix: prefix.value,
        template: template.value,
        suffix: suffix.value,
      });
    }
    isOpenAddEditAction.value = false;
  }
}

async function deleteAction(item) {
  const result = await confirmModal.value.showModal(
    i18n.global.t("modal.confirmHideAction"),
  );
  if (result) {
    store.commit("deleteAction", { ...item });
  }
}
</script>
<style scoped>
.no-text-transform {
  text-transform: none !important;
}

:deep() i.v-icon {
  color: rgb(var(--v-theme-primary));
}

:deep() .v-textarea .v-field {
  padding: 0;
}
</style>
