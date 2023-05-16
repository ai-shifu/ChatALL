import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import i18n from "../i18n";
import messagesPersist from "./messagesPersist";

// Initialize VuexPersist instance
const vuexPersist = new VuexPersist({
  key: "chatall-app", // Key for storing data, you can change it according to your application
  storage: window.localStorage, // Use localStorage, you can choose other storage options like sessionStorage
  reducer: (state) => {
    const { messages, ...persistedState } = state;
    return persistedState;
  },
});

const getDefaultState = () => ({
  uuid: "",
  lang: "auto",
  columns: 2,
  selectedBots: {
    // Active bots which no login required
    ChatGLMBot: true,
    VicunaBot: true,
    AlpacaBot: true,
    ClaudeBot: true,
  },
  openaiApi: {
    apiKey: "",
    temperature: 1,
    alterUrl: "",
  },
  chatgpt: {
    refreshCycle: 0,
  },
  gradio: {
    url: "",
    fnIndex: 0,
  },
  moss: {
    token: "",
  },
  wenxinQianfan: {
    apiKey: "",
    secretKey: "",
  },
  messages: [],
});

export default createStore({
  state: getDefaultState(),
  mutations: {
    changeColumns(state, n) {
      state.columns = n;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
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
    setOpenaiApi(state, values) {
      state.openaiApi = { ...state.openaiApi, ...values };
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
    setGradio(state, values) {
      state.gradio = { ...state.gradio, ...values };
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
    // ...other actions
  },
  modules: {
    // ...your modules
  },
  plugins: [vuexPersist.plugin, messagesPersist.plugin],
});
