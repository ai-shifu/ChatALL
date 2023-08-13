<template>
  <v-list-item>
    <v-list-item-title>{{ $t("chat.name") }}</v-list-item-title>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.deleteAllChatHistory')"
      @click="deleteChats"
    ></v-btn>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.downloadAllChatHistory')"
      @click="downloadJson"
      style="margin: 10px"
    ></v-btn>
  </v-list-item>
  <v-list-item>
    <v-list-item-title>{{ $t("proxy.fullSet") }}</v-list-item-title>
    <v-btn
      color="primary"
      variant="outlined"
      :text="$t('chat.backupToLocal')"
      @click="downloadDataJson"
      style="margin: 10px; float: left"
    ></v-btn>
    <!-- <pre v-if="jsonData">{{ jsonData }}</pre> -->
    <v-file-input
      color="primary"
      variant="outlined"
      :label="$t('chat.restoreFromLocal')"
      @change="readJson"
      style="width: 400px"
    ></v-file-input>
  </v-list-item>
  <v-list-item>
    <v-list-item-title>{{ $t("chat.MongoDBAtlas") }}</v-list-item-title>
    <v-text-field
      v-model="mongoDbUrl"
      :hint="
        $t('settings.forExample', {
          example:
            'mongodb+srv://user:password@cluster0.xxxxxx.mongodb.net/?retryWrites=true',
        })
      "
      persistent-hint
      @update:model-value="setMongoDBURL($event)"
      style="margin: 10px"
    ></v-text-field>
    <v-btn @click="upload" variant="outlined" class="ma-2 pa-2">
      {{ $t("chat.upload") }}
    </v-btn>
    <v-btn @click="download" variant="outlined" class="ma-2 pa-2">
      {{ $t("chat.download") }}
    </v-btn>
  </v-list-item>
  <ConfirmModal ref="confirmModal" />
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;
import ConfirmModal from "@/components/ConfirmModal.vue";
import bots from "@/bots";

const emit = defineEmits(["close-dialog"]);
const confirmModal = ref();
const store = useStore();
const jsonData = ref(null);
const mongoDbUrl = ref(store.state.mongoDbUrl);
const snackbar = reactive({
  show: false,
  text: "",
  timeout: 1500,
  color: "success",
});
const setMongoDBURL = (url) => {
  store.commit("setMongoDBURL", url);
};
async function upload() {
  const result = await confirmModal.value.showModal(
    "",
    i18n.global.t("chat.confirmUpload"),
  );
  if (result) {
    const data = JSON.parse(JSON.stringify(localStorage, null, 2));
    // don't know why there's _id prop in localStorage that would lead to duplicate key error
    delete data._id;
    const is_success = await ipcRenderer.invoke("upload", {
      mongoDbUrl: mongoDbUrl.value,
      data,
    });
    if (is_success) {
      snackbar.text = i18n.global.t("proxy.saveSuccess");
      snackbar.color = "success";
      snackbar.timeout = 1000;
      snackbar.show = true;
    }
  }
}
async function download() {
  const result = await confirmModal.value.showModal(
    "",
    i18n.global.t("chat.confirmDownload"),
  );
  if (result) {
    // eslint-disable-next-line
    const value = await ipcRenderer.invoke("download", MongoDB_URL.value);
    reload(value.at(-1));
  }
}
const readJson = async (event) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    const value = JSON.parse(evt.target.result);
    jsonData.value = value;
    reload(value);
  };
  reader.readAsText(event.target.files[0]);
};
async function reload(value) {
  const load = i18n.global.t("proxy.saveAndApply");
  const result = await confirmModal.value.showModal("", `${load}?`);
  if (result) {
    // todo merge data if supporting merge local and new data
    // let value_messages = JSON.parse(value["chatall-messages"]);
    // const local_chats = JSON.parse(localStorage["chatall-messages"]).chats;
    // value_messages.chats.forEach((element) => {
    //   element.index += local_chats.length;
    // });
    // value_messages.chats = [...local_chats, ...value_chats.chats];
    // value["chatall-messages"] = JSON.stringify(value_messages.chats);
    Object.keys(value).map((d) => (localStorage[d] = value[d]));
    await ipcRenderer.invoke("restart-app");
  }
}

// This function downloads the chat history as a JSON file.

const downloadJson = () => {
  const messages = get_messages();
  if (!messages) {
    console.error("chatall-messages not found in localStorage");
    return;
  }

  // Create an array of messages from the chat history.
  const content = "history";
  download_by_link(messages, content);
};
function get_messages() {
  // Get the chat history from localStorage.
  const chatallMessages = localStorage.getItem("chatall-messages");
  if (!chatallMessages) {
    return;
  }

  const chats = JSON.parse(chatallMessages)?.chats ?? [];
  try {
    // Create an array of messages from the chat history.
    const messages = chats
      .filter((d) => !d.hide)
      .map((chat) => ({
        // The title of the chat.
        title: chat.title,
        // The messages in the chat.
        messages: chat.messages
          .filter((d) => !d.hide)
          .reduce((arr, message) => {
            const t = message.type;
            const content = message.content;
            if (t == "prompt") {
              arr.push({
                prompt: content,
                responses: [],
              });
            } else {
              const botClassname = message.className;
              const bot = bots.getBotByClassName(botClassname);
              const botName = bot.getFullname();
              arr.at(-1).responses.push({
                content,
                botName,
                botClassname,
                botModel: message.model,
                highlight: message.highlight,
              });
            }
            return arr;
          }, []),
      }));
    return messages;
  } catch (e) {
    // debugger;
  }
}
const downloadDataJson = () => {
  const content = "data";
  const messages = localStorage;
  download_by_link(messages, content);
};
// Create a blob that contains the JSON data.
// The space parameter specifies the indentation of nested objects in the string representation.
function download_by_link(messages, name) {
  const blob = new Blob([JSON.stringify(messages, null, 2)], {
    // The type of the blob.
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  // Create a file name for the JSON file.
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const fileName = `chatall-${name}-${year}${month}${day}-${hour}${minute}${second}`;

  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.json`;
  document.body.appendChild(a);

  // Click the anchor element to download the file.
  a.click();

  // Remove the anchor element from the document body.
  document.body.removeChild(a);

  // Revoke the URL for the blob.
  URL.revokeObjectURL(url);
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
</script>
@/utils/storage
