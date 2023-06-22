import highlightDark from '!css-loader!../node_modules/highlight.js/styles/github-dark.css';
import highlightLight from '!css-loader!../node_modules/highlight.js/styles/github.css';

const HIGHLIGHT_STYLE_ID = 'chatall-higlightjs';

const SYSTEM = 'system';
const DARK = 'dark';
const LIGHT = 'light';
export const Mode = { SYSTEM, DARK, LIGHT };
export const Theme = { DARK, LIGHT };

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
  
  setDataTheme(theme); // markdown style

  // block style
  removePreviousHighlightStyle();
  addHighlightStyle(theme);
}

const removePreviousHighlightStyle = () => {
  document.querySelectorAll(`style#${HIGHLIGHT_STYLE_ID}`).forEach(e => e.remove());
}

const addHighlightStyle = (theme) => {
  const style = document.createElement('style');
  style.id = HIGHLIGHT_STYLE_ID;
  style.appendChild(document.createTextNode(theme === Theme.DARK ? highlightDark : highlightLight));
  document.head.appendChild(style);
}

const setDataTheme = (theme) => {
  document.documentElement.dataset.theme = theme; // set data-theme
};
