<template>
  <div>
    <v-dialog
      :model-value="props.open"
      @update:model-value="closeDialog"
      @after-leave="onDialogCloseTransitionEnded"
    >
      <v-card class="justify-center">
        <v-card-title>
          <v-text-field
            clearable
            v-model="search"
            density="compact"
            append-icon="mdi-magnify"
            :label="$t('find.find')"
            single-line
            hide-details
            autofocus
          ></v-text-field>
          <div class="pt-2 d-flex justify-space-between">
            <v-btn
              class="mt-1"
              prepend-icon="mdi-plus"
              :text="$t('prompt.addPrompt')"
              @click="add"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-select
              color="primary"
              density="compact"
              :items="prompts.languages"
              hide-details
              item-title="name"
              item-value="code"
              :model-value="language"
              @update:model-value="setPromptLanguage($event)"
            ></v-select>
          </div>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          height="70vh"
          fixed-header
          hover
          :no-data-text="$t('find.noMatches')"
          items-per-page="10"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td
                @click="usePrompt(item.raw)"
                @mouseover="showFullText($event)"
                @mouseleave="hideFullText($event)"
              >
                {{ item.columns.title }}
              </td>
              <td
                @click="usePrompt(item.raw)"
                @mouseover="showFullText($event)"
                @mouseleave="hideFullText($event)"
              >
                {{ item.columns.prompt }}
              </td>
              <td>
                <v-btn
                  flat
                  size="x-small"
                  :icon="item.raw.isPin ? 'mdi-star' : 'mdi-star-outline'"
                  @click="pin(item.raw)"
                ></v-btn>
                <v-btn
                  flat
                  size="x-small"
                  icon="mdi-pencil"
                  @click="edit(item.raw)"
                  v-if="item.raw.index >= 0"
                ></v-btn>
                <v-btn
                  flat
                  size="x-small"
                  icon="mdi-delete-outline"
                  @click="deletePrompt(item.raw)"
                  v-if="item.raw.index >= 0"
                ></v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      width="50%"
      :model-value="isOpenAddEditPrompt"
      @update:model-value="isOpenAddEditPrompt = $event"
    >
      <v-card>
        <v-form ref="formRef" class="pa-3" @submit.prevent>
          <v-text-field
            required
            :placeholder="$t('prompt.title')"
            v-model="title"
            :rules="requiredRule"
          ></v-text-field>
          <v-textarea
            required
            :placeholder="$t('prompt.prompt')"
            v-model="prompt"
            :rules="requiredRule"
          ></v-textarea>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            color="primary"
            @click="isOpenAddEditPrompt = false"
            >{{ $t("modal.cancel") }}</v-btn
          >
          <!-- color="primary" not working for nested dialog button -->
          <v-btn variant="flat" class="bg-primary" @click="addEditPrompt">{{
            $t("modal.done")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script setup>
import ConfirmModal from "@/components/ConfirmModal.vue";
import i18n from "@/i18n";
import prompts from "@/prompts";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "afterLeave"]);
const defaultLanguage = prompts.languages
  .map((lang) => lang.code)
  .includes(i18n.global.locale.value)
  ? i18n.global.locale.value // use user langauge if availble
  : "en"; // else default to 'en'
const language = ref(defaultLanguage);
const search = ref("");
const title = ref("");
const prompt = ref("");
const isEdit = ref(false);
const editIndex = ref(null);
const formRef = ref(null);
const confirmModal = ref(null);
const isOpenAddEditPrompt = ref(false);
let selectedPrompt = "";
const requiredRule = [
  (value) => (value?.trim() ? true : i18n.global.t("prompt.required")),
];

const headers = computed(() => [
  {
    key: "title",
    title: i18n.global.t("prompt.title"),
    width: "20%",
  },
  { key: "prompt", title: i18n.global.t("prompt.prompt"), width: "70%" },
  {
    key: "action",
    title: i18n.global.t("prompt.action"),
    width: "10%",
    sortable: false,
  },
]);
const userPrompts = computed(() => {
  return store.state.prompts
    .slice()
    .filter((p) => !p.hide)
    .sort((x, y) => {
      return x.isPin === y.isPin ? 0 : x.isPin ? -1 : 1;
    });
});
const data = computed(() => {
  const defaultPrompts = prompts[language.value].map((prompt) => {
    return { title: prompt.act, prompt: prompt.prompt };
  });

  return [...userPrompts.value, ...defaultPrompts];
});

const closeDialog = (value) => {
  emit("update:open", value);
};

function pin(row) {
  if (row.index >= 0) {
    store.commit("editPrompt", {
      ...row,
      isPin: !row.isPin,
    });
  } else {
    store.commit("addPrompt", { ...row, isPin: true });
  }
}

function usePrompt(row) {
  selectedPrompt = row.prompt;
  emit("update:open", false);
}

async function addEditPrompt() {
  if ((await formRef.value.validate()).valid) {
    if (isEdit.value) {
      store.commit("editPrompt", {
        title: title.value,
        prompt: prompt.value,
        index: editIndex.value,
      });
    } else {
      store.commit("addPrompt", { title: title.value, prompt: prompt.value });
    }
    isOpenAddEditPrompt.value = false;
  }
}

function add() {
  isEdit.value = false;
  title.value = "";
  prompt.value = "";
  isOpenAddEditPrompt.value = true;
}

function edit(item) {
  isEdit.value = true;
  title.value = item.title;
  prompt.value = item.prompt;
  editIndex.value = item.index;
  isOpenAddEditPrompt.value = true;
}

async function deletePrompt(item) {
  const result = await confirmModal.value.showModal(
    i18n.global.t("modal.confirmHidePrompt"),
  );
  if (result) {
    store.commit("deletePrompt", { ...item });
  }
}

function showFullText(element) {
  const parent = element.currentTarget.closest("tr");
  if (parent.querySelector(".tooltip")) {
    return;
  }
  for (let i = 0; i < parent.children.length - 1; i++) {
    const td = parent.children[i];
    const position = td.getBoundingClientRect();
    const div = document.createElement("div");
    div.innerText = td.innerText;
    td.innerText = "";
    div.classList.add("tooltip");
    div.style.width = `${position.width}px`;
    div.addEventListener("mouseleave", hideFullText);
    td.appendChild(div);
  }
}

function hideFullText(element) {
  const parent = element.currentTarget.closest("tr");
  if (!element.toElement || !parent.contains(element.toElement)) {
    const toRemove = parent.querySelectorAll(".tooltip");
    for (let i = 0; i < toRemove.length; i++) {
      toRemove[i].parentElement.innerText = toRemove[i].innerText;
      toRemove[i].remove();
    }
  }
}

function setPromptLanguage(value) {
  language.value = value;
}

function onDialogCloseTransitionEnded() {
  emit("afterLeave", selectedPrompt);
  selectedPrompt = "";
  search.value = "";
}
</script>

<style scoped>
:deep() tr {
  cursor: pointer;
}

:deep() td:nth-child(1),
td:nth-child(2) {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:deep() table {
  table-layout: fixed;
}

:deep() .tooltip {
  padding-right: 16px;
  white-space: break-spaces;
  background-color: transparent;
}
</style>
