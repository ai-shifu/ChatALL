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
};
