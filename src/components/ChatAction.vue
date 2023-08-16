<template>
  <v-dialog
    height="75%"
    width="80%"
    :model-value="props.open"
    @update:model-value="closeDialog"
  >
    <v-card height="100%">
      <v-card-title>
        <v-row>
          <v-col class="d-flex align-center">
            {{ props.action.name }}
            <v-btn
              flat
              @click="isEdit = !isEdit"
              :icon="isEdit ? 'mdi-eye' : 'mdi-pencil-outline'"
            ></v-btn>
          </v-col>
          <v-col class="d-flex align-center justify-end">
            <v-label>{{ previewTextarea.length }}</v-label>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pt-0 overflow-auto">
        <v-textarea
          hide-details
          rows="20"
          v-show="isEdit"
          v-model="previewTextarea"
          @input="previewText = previewTextarea"
        >
        </v-textarea>
        <chat-prompt
          v-show="!isEdit"
          :message="{ content: previewText }"
          :isThread="false"
          :columns="3"
        ></chat-prompt>
      </v-card-text>
      <v-card-actions class="justify-end pr-6 pt-0" style="gap: 0.3rem">
        <v-btn
          class="send-prompt-btn"
          elevation="2"
          :disabled="
            previewTextarea.trim() === '' ||
            selectedBots.length === 0 ||
            !chatRef
          "
          @click="send"
        >
          {{ $t("footer.sendPrompt") }}
        </v-btn>
        <div class="bot-logos">
          <BotLogo
            v-for="(bot, index) in favBots"
            :id="`fav-bot-${index + 1}`"
            :key="index"
            :bot="bot.instance"
            :active="bot.selected"
            :data-id="bot.classname"
            size="36"
            @click="bot.selected = !bot.selected"
          />
        </div>
        <v-form class="d-flex">
          <v-radio-group v-model="chatRef" density="compact" hide-details>
            <v-radio :label="$t('chat.inNewChat')" value="new"></v-radio>
            <v-radio
              :label="$t('chat.inCurrentChat')"
              value="current"
            ></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, toRaw, watch, computed } from "vue";
import { useStore } from "vuex";
import { preview } from "../helpers/template-helper";
import ChatPrompt from "@/components/Messages/ChatPrompt.vue";
import BotLogo from "@/components/Footer/BotLogo.vue";
import _bots from "@/bots";

const store = useStore();
const isEdit = ref(false);
const previewText = ref("");
const previewTextarea = ref("");
const chatRef = ref(undefined);
const emit = defineEmits(["update:open"]);
const props = defineProps(["open", "action", "responses", "activeBots"]);
watch(() => props.open, onChangeOpenProp);

const selectedResponses = computed(() =>
  store.state.selectedResponses.map((res) => {
    return { botName: res.className, botResponse: res.content };
  }),
);
const favBots = ref([]);
const selectedBots = computed(() =>
  favBots.value.filter((bot) => bot.selected),
);

function onChangeOpenProp() {
  if (props.open) {
    updatePreview();
    updateFavBots();
  } else {
    isEdit.value = false;
  }
}

async function updatePreview() {
  previewTextarea.value = await preview(
    props.action.prefix,
    props.action.template,
    props.action.suffix,
    selectedResponses.value,
  );
  previewText.value = previewTextarea.value;
}

function updateFavBots() {
  favBots.value = [];
  for (const key in props.activeBots) {
    if (props.activeBots[key]) {
      favBots.value.push({
        classname: key,
        selected: false,
        instance: _bots.getBotByClassName(key),
      });
    }
  }
}

function closeDialog(value) {
  emit("update:open", value);
}

async function send() {
  if (chatRef.value === "new") {
    await store.dispatch("createChatAndSelect");
  }
  await store
    .dispatch("sendPrompt", {
      prompt: previewTextarea.value,
      bots: selectedBots.value.map((bot) => toRaw(bot).instance),
    })
    .then(() => {
      if (chatRef.value === "new") {
        store.commit("editChatTitle", {
          title: previewTextarea.value.substring(0, 30),
        });
      }
    });
  closeDialog(false);
  deselectAllResponses();
}

function deselectAllResponses() {
  store.commit("deleteAllSelectedResponses");
}
</script>

<style scoped>
:deep() .v-textarea textarea {
    height: 100%;
}

:deep() i.v-icon {
  color: rgb(var(--v-theme-primary));
}

.bot-logos {
  gap: 4px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.send-prompt-btn {
  height: 40px !important;
  margin: 0.4rem !important;
  text-transform: uppercase !important;
  font-size: small !important;
  color: rgb(var(--v-theme-on-primary));
  background-color: rgb(var(--v-theme-primary));
  border-radius: 4px !important;
}
</style>
