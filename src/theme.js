export const setBodyDataTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const saveTheme = async (mode, theme, store, ipcRenderer) => {
  let finalTheme = mode;
  if (mode === "system") {
    const nativeTheme = await ipcRenderer.invoke("get-native-theme");
    finalTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  }
  if (theme) theme.global.name.value = finalTheme;
  store.commit("setTheme", finalTheme);
  return finalTheme;
};
