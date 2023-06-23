import highlightDark from "!css-loader!../node_modules/highlight.js/styles/github-dark.css";
import highlightLight from "!css-loader!../node_modules/highlight.js/styles/github.css";
import markdownDark from "!css-loader!../node_modules/github-markdown-css/github-markdown-dark.css";
import markdownLight from "!css-loader!../node_modules/github-markdown-css/github-markdown-light.css";

const HIGHLIGHT_STYLE_ID = "chatall-higlightjs";
const MARKDOWN_STYLE_ID = "chatall-markdown";

const SYSTEM = "system";
const DARK = "dark";
const LIGHT = "light";
export const Theme = { DARK, LIGHT };
export const Mode = { SYSTEM, ...Theme };

/**
 * Determine the actual theme for system mode
 * @param {string} mode
 * @param {object} ipcRenderer
 * @returns {string} resolved theme
 */
export const resolveTheme = async (mode, ipcRenderer) => {
  let resolvedTheme = mode;
  if (mode === Mode.SYSTEM) {
    const nativeTheme = await ipcRenderer.invoke("get-native-theme");
    resolvedTheme = nativeTheme.shouldUseDarkColors ? Theme.DARK : Theme.LIGHT;
  }
  return resolvedTheme;
};

/**
 * Apply theme to UI
 * @param {string} theme dark / light
 * @param {object} vuetifyTheme from veutify useTheme
 */
export const applyTheme = (theme, vuetifyTheme) => {
  if (vuetifyTheme) {
    vuetifyTheme.global.name.value = theme; // vuetify theme
  }

  document
    .querySelectorAll(`style#${MARKDOWN_STYLE_ID}, style#${HIGHLIGHT_STYLE_ID}`)
    .forEach((e) => e.remove()); // remove previous style
  addStyle(
    HIGHLIGHT_STYLE_ID,
    theme === Theme.DARK ? highlightDark : highlightLight,
  );
  addStyle(
    MARKDOWN_STYLE_ID,
    theme === Theme.DARK ? markdownDark : markdownLight,
  );
};

const addStyle = (id, css) => {
  const style = document.createElement("style");
  style.id = id;
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
};
