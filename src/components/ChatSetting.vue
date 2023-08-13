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
        :text="$t('chat.downloadAllChatHistory')"
        @click="downloadJson"
        style="margin-left: 10px"
      ></v-btn>
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
          :rules="[validationRules.required]"
        ></v-text-field>
        <v-textarea
          required
          rows="10"
          v-model="template"
          :placeholder="templatePlaceholder"
          :label="$t('chat.actionTemplate')"
          :rules="[validationRules.required, validationRules.template]"
          @input="onInputTemplate"
        >
          <template v-slot:append-inner>
            <v-btn
              flat
              v-bind="props"
              size="x-small"
              icon="mdi-help"
              style="background-color: inherit"
              @click="isShowTemplateGuideDialog = !isShowTemplateGuideTooltip"
            >
            </v-btn>
          </template>
        </v-textarea>
        <label class="pl-4" style="font-size: 1.2rem">{{
          $t("chat.preview")
        }}</label>
        <chat-prompt
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
    :model-value="isShowTemplateGuideDialog"
    v-on:after-leave="isShowTemplateGuideDialog = false"
  >
    <v-card>
      <chat-prompt
        class="w-100"
        :message="{ content: $t('chat.actionTemplateGuide') }"
        :isThread="false"
        :columns="3"
      ></chat-prompt>
    </v-card>
  </v-dialog>
  <ConfirmModal ref="confirmModal" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import i18n from "@/i18n";
import ChatPrompt from "@/components/Messages/ChatPrompt.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import bots from "@/bots";
import {
  preview,
  templateKey,
  templatePlaceholder,
} from "../helpers/template-parser";
const emit = defineEmits(["close-dialog"]);
const confirmModal = ref();
const formRef = ref(null);
const isOpenAddEditAction = ref(false);
const actionName = ref("");
const template = ref("");
const previewRef = ref("");
const isShowTemplateGuideDialog = ref(false);
const store = useStore();
const userActions = computed(() => {
  return store.state.actions.filter((p) => !p.hide);
});
const templateKeyRegex = {
  loopStart: new RegExp(templateKey.loopStart, "gm"),
  loopEnd: new RegExp(templateKey.loopEnd, "gm"),
  botName: new RegExp(templateKey.botName, "gm"),
  botResponse: new RegExp(templateKey.botResponse, "gm"),
};
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
const validationRules = {
  required: (value) =>
    value?.trim() ? true : i18n.global.t("prompt.required"),
  template: (value) => {
    let message = "";
    for (const key in templateKey) {
      if (!value.match(templateKeyRegex[key])) {
        message += i18n.global.t(`chat.${key}Required`) + ", ";
      }
    }
    return message ? message.substring(0, message.length - 2) : true;
  },
};

// This function downloads the chat history as a JSON file.
const downloadJson = () => {
  // Get the chat history from localStorage.
  const chatallMessages = localStorage.getItem("chatall-messages");
  if (!chatallMessages) {
    console.error("chatall-messages not found in localStorage");
    return;
  }

  const chats = JSON.parse(chatallMessages)?.chats ?? [];

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

  // Create a blob that contains the JSON data.
  // The space parameter specifies the indentation of nested objects in the string representation.
  const blob = new Blob([JSON.stringify({ chats: messages }, null, 2)], {
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
  const fileName = `chatall-history-${year}${month}${day}-${hour}${minute}${second}`;

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
};
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
  template.value = templatePlaceholder;
  isOpenAddEditAction.value = true;
  onInputTemplate();
}

function edit(item) {
  isEdit = true;
  actionName.value = item.name;
  template.value = item.template;
  editIndex = item.index;
  isOpenAddEditAction.value = true;
  onInputTemplate();
}

async function onInputTemplate() {
  previewRef.value = preview(template.value, previewSampleData);
}

async function addEditAction() {
  if ((await formRef.value.validate()).valid) {
    if (isEdit) {
      store.commit("editAction", {
        name: actionName.value,
        template: template.value,
        index: editIndex,
      });
    } else {
      store.commit("addAction", {
        name: actionName.value,
        template: template.value,
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
