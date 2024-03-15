<template>
  <v-list-item>
    <template v-for="setting in settings" :key="setting.name">
      <v-list-item-title v-if="setting.title">
        <!-- falcon.temperature -->
        {{ $t(setting.title) }}</v-list-item-title
      >
      <v-list-item-subtitle v-if="setting.description">
        <!-- falcon.temperaturePrompt -->
        {{ $t(setting.description) }}</v-list-item-subtitle
      >

      <v-text-field
        v-if="setting.type === Type.Text"
        v-model="settingState[setting.name]"
        outlined
        dense
        :label="setting.label"
        :placeholder="setting.placeholder"
        :hide-details="setting.hideDetails"
        @update:model-value="
          /* setFalcon({ temperature: $event }) */
          store.commit(mutationType, { [setting.name]: $event })
        "
      ></v-text-field>
      <v-select
        v-else-if="setting.type === Type.Select"
        v-model="settingState[setting.name]"
        outlined
        dense
        :label="setting.label"
        :placeholder="setting.placeholder"
        :hide-details="setting.hideDetails"
        :items="setting.items"
        @update:model-value="
          /* setFalcon({ temperature: $event }) */
          store.commit(mutationType, { [setting.name]: $event })
        "
      ></v-select>
      <v-slider
        v-else-if="setting.type === Type.Slider"
        v-model="settingState[setting.name] /* falcon.temperature */"
        color="primary"
        :min="setting.min"
        :max="setting.max"
        :step="setting.step"
        :ticks="translate(setting.ticks)"
        :show-ticks="
          /* 'show-ticks' cause lag issue when the possible value to slide is large */
          setting.ticks ? 'always' : false
        "
        thumb-label
        @update:model-value="
          /* setFalcon({ temperature: $event }) */
          store.commit(mutationType, { [setting.name]: $event })
        "
      >
        <template v-slot:append>
          <v-text-field
            v-model="settingState[setting.name] /* falcon.temperature */"
            :ref="
              (el) => {
                refs[setting.name] = el;
              }
            "
            type="number"
            style="width: 100px"
            density="compact"
            hide-details
            variant="outlined"
            @update:model-value="
              /* setFalcon({ temperature: validateInput(temperature, $event) }) */
              store.commit(mutationType, {
                [setting.name]: validateSliderInput(setting, $event),
              })
            "
          ></v-text-field>
        </template>
      </v-slider>
      <v-combobox
        v-else-if="setting.type === Type.Combobox"
        v-model="settingState[setting.name]"
        outlined
        dense
        :label="setting.label"
        :placeholder="setting.placeholder"
        :hide-details="setting.hideDetails"
        :items="setting.items"
        @update:model-value="
          store.commit(mutationType, { [setting.name]: $event })
        "
      ></v-combobox>
      <v-checkbox
        v-else-if="setting.type === Type.Checkbox"
        v-model="settingState[setting.name]"
        outlined
        dense
        color="primary"
        :label="setting.label"
        :placeholder="setting.placeholder"
        :hide-details="setting.hideDetails"
        @update:model-value="
          store.commit(mutationType, { [setting.name]: $event })
        "
      ></v-checkbox>
    </template>
  </v-list-item>
</template>

<script setup>
import i18n from "@/i18n";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { Type } from "./settings.const";
const store = useStore();
const settingState = computed(() => store.state[props.brandId]);
const refs = ref([]);
const props = defineProps({
  brandId: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  mutationType: {
    type: String,
    required: true,
  },
  watcher: {
    type: Function,
    default: undefined,
  },
});

if (props.watcher) {
  watch(
    () => settingState.value,
    (newValue) => {
      console.log(`${props.brandId}: ${JSON.stringify(newValue)}`);
      props.watcher(newValue);
    },
  );
}

onMounted(() => {
  for (const setting of props.settings) {
    if (setting.type !== Type.Slider) {
      continue;
    }
    // Set the 'min', 'max' and 'step' attributes for the input type 'number' spin button
    const inputElement = getInputElement(refs.value[setting.name]);
    inputElement.min = setting.min;
    inputElement.max = setting.max;
    inputElement.step = setting.step;
  }
});

function translate(settings) {
  if (settings) {
    let rets = {};
    Object.keys(settings).forEach((key) => {
      rets[key] = i18n.global.t(settings[key]);
    });
    return rets;
  }
  return settings;
}

function validateSliderInput(setting, value) {
  // validate input via keyboard within setting min and max
  value = value || 0; // set zero if empty string
  const input = getInputElement(refs.value[setting.name]);
  const valuefloat = parseFloat(value);
  const inputMaxFloat = parseFloat(input.max);
  const inputMinFloat = parseFloat(input.min);
  if (valuefloat > inputMaxFloat) {
    return inputMaxFloat;
  } else if (valuefloat < inputMinFloat) {
    return inputMinFloat;
  } else {
    return valuefloat;
  }
}

function getInputElement(ref) {
  return ref.$el.querySelector("input");
}
</script>
