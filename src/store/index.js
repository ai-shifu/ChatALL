import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import i18n from "@/i18n";
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
    const { messages, chats, ...persistedState } = state;
    return persistedState;
  },
});

export default createStore({
  state: {
    uuid: "",
    lang: "auto",
    columns: 2,
    openaiApi: {
      apiKey: "",
      temperature: 1,
      pastRounds: 5,
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
    qianWen: {
      xsrfToken: "",
    },
    wenxinQianfan: {
      apiKey: "",
      secretKey: "",
      pastRounds: 5,
    },
    chats: [
      {
        title: "New Chat",
        favBots: [
          // default bots
          { classname: "ChatGPT35Bot", selected: true },
          { classname: "ChatGPT4Bot", selected: true },
          { classname: "ChatGPTBrowsingBot", selected: true },
          { classname: "BingChatCreativeBot", selected: true },
          { classname: "BingChatBalancedBot", selected: true },
          { classname: "BingChatPreciseBot", selected: true },
          { classname: "ChatGLMBot", selected: true },
          { classname: "VicunaBot", selected: true },
          { classname: "AlpacaBot", selected: true },
          { classname: "ClaudeBot", selected: true },
        ],
        contexts: {},
        messages: [],
      },
    ],
    currentChatIndex: 0,
    updateCounter: 0,
    // TODO: delete following fields
    selectedBots: {},
    messages: [],
  },
  mutations: {
    changeColumns(state, n) {
      state.columns = n;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    SET_BOT_SELECTED(state, { botClassname, selected }) {
      const currentChat = state.chats[state.currentChatIndex];
      const bot = currentChat.favBots.find(
        (bot) => bot.classname === botClassname,
      );
      if (bot) bot.selected = selected;
      else currentChat.favBots.push({ classname: botClassname, selected });
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
    setQianWenToken(state, token) {
      state.qianWen.xsrfToken = token;
    },
    setWenxinQianfan(state, values) {
      state.wenxinQianfan = { ...state.wenxinQianfan, ...values };
    },
    setGradio(state, values) {
      state.gradio = { ...state.gradio, ...values };
    },
    addMessage(state, message) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.messages.push(message);
    },
    updateMessage(state, { indexes, message }) {
      const { chatIndex, messageIndex } = indexes;
      const i = chatIndex == -1 ? state.currentChatIndex : chatIndex;
      const chat = state.chats[i];
      chat.messages[messageIndex] = {
        ...chat.messages[messageIndex],
        ...message,
      };
    },
    setMessages(state, messages) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.messages = messages;
    },
    incrementUpdateCounter(state) {
      state.updateCounter += 1;
    },
    setChatContext(state, { botClassname, context }) {
      const currentChat = state.chats[state.currentChatIndex];
      if (currentChat.contexts == undefined) currentChat.contexts = {};
      currentChat.contexts[botClassname] = context;
    },
    clearMessages(state) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.contexts = {};
      currentChat.messages = [];
    },
    init(state) {
      // Upgrade messages data structure
      if (state.messages.length > 0) {
        const chat = {
          title: i18n.global.t("chat.newChat"),
          contexts: {},
          messages: state.messages,
        };
        state.chats[0] = chat;
        state.messages = [];
      }
      // Migrate to favorited bots
      if (state.selectedBots) {
        const bots = Object.keys(state.selectedBots);
        state.chats[0].favBots = [];
        for (const bot of bots) {
          if (state.selectedBots[bot])
            state.chats[0].favBots.push({ classname: bot, selected: true });
        }
        state.selectedBots = null;
      }
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

      for (const bot of bots) {
        const message = {
          type: "response",
          content: "",
          format: bot.getOutputFormat(),
          model: bot.constructor._model,
          done: false,
          highlight: false,
          hide: false,
          className: bot.getClassname(),
        };

        // workaround for tracking message position
        const currentChat = state.chats[state.currentChatIndex];
        message.index = currentChat.messages.push(message) - 1;

        bot.sendPrompt(
          prompt,
          (indexes, values) =>
            dispatch("updateMessage", { indexes, message: values }),
          { chatIndex: state.currentChatIndex, messageIndex: message.index },
        );

        getMatomo().trackEvent(
          "prompt",
          "sendTo",
          bot.getClassname(),
          prompt.length,
        );
      }
    },
    updateMessage({ commit, state }, { indexes, message: values }) {
      commit("updateMessage", { indexes, message: values });

      // workaround for notifing the message window to scroll to bottom
      commit("incrementUpdateCounter");

      const i =
        indexes.chatIndex == -1 ? state.currentChatIndex : indexes.chatIndex;
      const chat = state.chats[i];
      const message = { ...chat.messages[indexes.messageIndex], ...values };
      if (values.done) {
        getMatomo().trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
      }
    },
  },
  getters: {
    currentChat: (state) => {
      if (state.chats.length === 0) {
        return null;
      }
      return state.chats[state.currentChatIndex];
    },
  },
  modules: {
    // ...你的模块
  },
  plugins: [vuexPersist.plugin, messagesPersist.plugin], // 添加插件到 store
});
