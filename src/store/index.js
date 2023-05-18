import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import i18n from "../i18n";
import messagesPersist from "./messagesPersist";

const getMatomo = function () {
  return window.Piwik.getAsyncTracker();
};

// 初始化 VuexPersist 实例
const vuexPersist = new VuexPersist({
  key: "chatall-app", // 用于存储的键名，可以根据你的应用更改
  storage: window.localStorage, // 使用 localStorage，你还可以选择其他存储方式，如 sessionStorage
  reducer: (state) => {
    // eslint-disable-next-line
    const { messages, ...persistedState } = state;
    return persistedState;
  },
});

export default createStore({
  state: {
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
    updateCounter: 0,
  },
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
    setGradio(state, values) {
      state.gradio = { ...state.gradio, ...values };
    },

    addMessage(state, message) {
      state.messages.push(message);
    },
    updateMessage(state, { index, message }) {
      state.messages[index] = { ...state.messages[index], ...message };
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    incrementUpdateCounter(state) {
      state.updateCounter += 1;
    },
  },
  actions: {
    sendPrompt({ commit, state, dispatch }, { prompt, bots }) {
      commit("addMessage", {
        type: "prompt",
        content: prompt,
        done: true,
        hide: false,
      });

      const $matomo = getMatomo();
      for (const bot of bots) {
        const message = {
          type: "response",
          content: "",
          format: bot.getOutputFormat(),
          logo: bot.getLogo(),
          name: bot.getFullname(),
          model: bot.constructor._model,
          done: false,
          highlight: false,
          hide: false,
          className: bot.constructor._className,
        };

        // workaround for tracking message position
        message.index = state.messages.push(message) - 1;

        bot.sendPrompt(
          prompt,
          (index, values) =>
            dispatch("updateMessage", { index, message: values }),
          message.index,
        );

        $matomo.trackEvent(
          "prompt",
          "sendTo",
          bot.constructor._className,
          prompt.length,
        );
      }
    },
    updateMessage({ commit, state }, { index, message: values }) {
      commit("updateMessage", { index, message: values });

      // workaround for notifing the message window to scroll to bottom
      commit("incrementUpdateCounter");

      const message = { ...state.messages[index], ...values };
      if (values.done) {
        getMatomo().trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
      }
    },
    clearMessages({ commit }) {
      commit("setMessages", []);
    },
  },
  modules: {
    // ...你的模块
  },
  plugins: [vuexPersist.plugin, messagesPersist.plugin], // 添加插件到 store
});
