<template>
  <v-overlay
    :scrim="true"
    :model-value="props.open"
    v-on:after-leave="closeShortcutGuide"
    @click="closeShortcutGuide"
  >
    <div
      style="
        position: absolute;
        top: 0;
        left: 15px;
        width: 100vw;
        height: 100vh;
      "
    >
      <div
        ref="shortcutGuideContentRef"
        style="position: relative"
        class="markdown-body"
      ></div>
    </div>
  </v-overlay>
</template>

<script setup>
const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "done"]);

import { ref } from "vue";
import { onUpdated } from "vue";
import { SHORTCUT_LIST } from "./shortcut.const";

const shortcutGuideContentRef = ref(null);

onUpdated(async () => {
  if (!props.open) {
    return;
  }
  addWindowResizeListener();
  SHORTCUT_LIST.forEach((shortcut) => {
    const shortcutElement = document.getElementById(shortcut.elementId);
    if (!shortcutElement) {
      return;
    }
    const position = shortcutElement.getBoundingClientRect();
    const div = document.createElement("div");
    div.classList.add("shortcut-label");
    div.style.top = `${position.top + (shortcut.offset?.top ?? 0)}px`;
    if (shortcut.alignHorizontallyCenter) {
      div.style.left = `${
        position.left + position.width / 2 + (shortcut.offset?.left ?? 0)
      }px`;
    } else {
      div.style.left = `${position.left + (shortcut.offset?.left ?? 0)}px`;
    }
    div.innerHTML = getShortcutLabelHTML(shortcut.key);
    div.style.flexDirection = shortcut.flexDirection;
    shortcutGuideContentRef.value.appendChild(div);
  });
});

function getShortcutLabelHTML(keys) {
  return keys.map(kbd).join("<span>+</span>");
}

function kbd(text) {
  return `<kbd>${formatModifierText(text)}</kbd>`;
}

function formatModifierText(string) {
  string = string.replace('meta', 'cmd');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addWindowResizeListener() {
  window.addEventListener("resize", closeShortcutGuide);
}

const toggleShortcutGuide = () => {
  if (props.open) {
    closeShortcutGuide();
  } else {
    openShortcutGuide();
  }
};

const closeShortcutGuide = () => {
  window.removeEventListener("resize", closeShortcutGuide);
  emit("update:open", false);
  emit("done");
};

const openShortcutGuide = () => {
  addWindowResizeListener();
  emit("update:open", true);
};

defineExpose({
  toggleShortcutGuide,
});
</script>
<style scoped>
:deep() .shortcut-label {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

:deep() span {
  line-height: 1rem;
  color: rgb(var(--v-theme-font));
}
</style>
