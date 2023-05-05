import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import i18n from "../i18n";

// 初始化 VuexPersist 实例
const vuexPersist = new VuexPersist({
  key: "chatall-app", // 用于存储的键名，可以根据你的应用更改
  storage: window.localStorage, // 使用 localStorage，你还可以选择其他存储方式，如 sessionStorage
});

export default createStore({
  state: {
    lang: "auto",
    columns: 1,
    selectedBots: {},
    openaiApiKey: "",
    chatgpt: {
      refreshCycle: "",
    },
    moss: {
      token: "",
    },
    wenxinQianfan: {
      apiKey: "",
      secretKey: "",
    },
    messages: [],
  },
  mutations: {
    changeColumns(state, n) {
      state.columns = n;
    },
    SET_BOT_SELECTED(state, payload) {
      const { botId, selected } = payload;
      state.selectedBots[botId] = selected;
    },
    setCurrentLanguage(state, language) {
      state.lang = language;
      i18n.global.locale = language;
    },
    setChatgpt(state, refreshCycle) {
      state.chatgpt.refreshCycle = refreshCycle;
    },
    setOpenaiApiKey(state, openaiApiKey) {
      state.openaiApiKey = openaiApiKey;
    },
    setMoss(state, token) {
      state.moss.token = token;
    },
    setWenxinQianfan(state, { apiKey, secretKey }) {
      state.wenxinQianfan = { apiKey, secretKey };
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    // ...你的 actions
  },
  modules: {
    // ...你的模块
  },
  plugins: [vuexPersist.plugin], // 添加插件到 store
});
