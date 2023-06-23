<template>
  <v-form
    ref="formRef"
    @submit.prevent="true"
    v-shortkey.once="['ctrl', 'f']"
    @shortkey="handleFindShortcut"
    style="
      position: absolute;
      right: 0;
      width: 400px;
      min-width: 200px;
      padding-top: 20px;
    "
  >
    <v-text-field
      @keydown.enter="() => find()"
      @focus="$event.target.select()"
      ref="findTextRef"
      color="primary"
      density="compact"
      variant="solo"
      :label="$t('find.find')"
      single-line
      :rules="[() => isMatch || $t('find.noMatches')]"
      v-model="findTextModel"
      v-show="isShowFindText"
      prepend-inner-icon="mdi-magnify"
    >
      <template v-slot:append-inner>
        <v-btn-group>
          <v-btn
            size="x-small"
            icon="mdi-chevron-up"
            @click="find(true)"
          ></v-btn>
          <v-btn
            size="x-small"
            icon="mdi-chevron-down"
            @click="find(false)"
          ></v-btn>
        </v-btn-group>
        <v-tooltip
          :text="$t('find.matchCase')"
          location="bottom"
          v-model="isShowMatchCaseTooltip"
        >
          <template v-slot:activator="{ props }">
            <v-btn-toggle v-model="matchCaseToggle">
              <v-btn
                :value="MATCH_CASE_VALUE"
                v-bind="props"
                size="x-small"
                icon="mdi-format-letter-case"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-tooltip>
        <v-tooltip
          :text="$t('find.wrapAround')"
          location="bottom"
          v-model="isShowWrapAroundTooltip"
        >
          <template v-slot:activator="{ props }">
            <v-btn-toggle v-model="wrapAroundToggle">
              <v-btn
                :value="WRAP_AROUND_VALUE"
                v-bind="props"
                size="x-small"
                icon="mdi-autorenew"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-tooltip>
        <v-btn-group>
          <v-btn
            size="x-small"
            icon="mdi-close"
            @click="closeFindTextField"
          ></v-btn>
        </v-btn-group>
      </template>
    </v-text-field>
  </v-form>
</template>

<script setup>
import { ref, nextTick } from "vue";

const formRef = ref(null);

const findTextRef = ref(null);
const findTextModel = ref("");
const isShowFindText = ref(false);

const MATCH_CASE_VALUE = "case";
const WRAP_AROUND_VALUE = "wrap";

const matchCaseToggle = ref([]); // default disable match case
const isShowMatchCaseTooltip = ref(false);

const wrapAroundToggle = ref([WRAP_AROUND_VALUE]); // default enable wrap around
const isShowWrapAroundTooltip = ref(false);

const isMatch = ref(true);

function handleFindShortcut() {
  isShowFindText.value ? closeFindTextField() : showFindTextField();
}

function showFindTextField() {
  isShowFindText.value = true;
  nextTick(() => {
    findTextRef.value.$el.querySelector("input").focus();
  });
}

function closeFindTextField() {
  isShowFindText.value = false;
}

function find(backward) {
  isMatch.value = window.find(
    findTextModel.value,
    matchCaseToggle.value?.length,
    backward,
    wrapAroundToggle.value?.length,
  );
  formRef.value.validate();
}
</script>

<style scoped>
:deep() .v-field {
    padding-right: 0;
}
</style>
