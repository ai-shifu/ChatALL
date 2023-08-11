import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import i18n from "@/i18n";
import messagesPersist from "./messagesPersist";
import promptsPersist from "./promptsPersist";
import { getMatomo } from "@/composables/matomo";

let isThrottleMessage = false;
let isThrottleThreadMessage = false;
let messageBuffer = [];
let threadMessageBuffer = [];
// 初始化 VuexPersist 实例
const vuexPersist = new VuexPersist({
  key: "chatall-app", // 用于存储的键名，可以根据你的应用更改
  storage: window.localStorage, // 使用 localStorage，你还可以选择其他存储方式，如 sessionStorage
  reducer: (state) => {
    // eslint-disable-next-line
    const { messages, chats, prompts, updateCounter, ...persistedState } =
      state;
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
    azureOpenaiApi: {
      azureApiKey: "",
      temperature: 1,
      pastRounds: 5,
      azureApiInstanceName: "",
      azureOpenAIApiDeploymentName: "",
      azureOpenAIApiVersion: "",
    },
    chatgpt: {
      refreshCycle: 0,
      riskConfirmed: false,
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
    skyWork: {
      inviteToken: "",
      token: "",
    },
    wenxinQianfan: {
      apiKey: "",
      secretKey: "",
      pastRounds: 5,
    },
    characterAI: {
      token: "",
      ttl: 0,
    },
    claudeAi: {
      org: "",
    },
    poe: {
      formkey: "",
    },
    chats: [
      {
        title: "New Chat",
        favBots: [
          // default bots
          { classname: "ChatGPT35Bot", selected: true },
          { classname: "BingChatCreativeBot", selected: true },
          { classname: "BingChatBalancedBot", selected: true },
          { classname: "BingChatPreciseBot", selected: true },
          { classname: "PiBot", selected: true },
          { classname: "YouChatBot", selected: true },
          { classname: "ChatGLMBot", selected: true },
          { classname: "VicunaBot", selected: true },
          { classname: "AlpacaBot", selected: true },
        ],
        contexts: {},
        messages: [],
        threads: [],
        hide: false,
        createdTime: new Date().getTime(),
      },
    ],
    currentChatIndex: 0,
    updateCounter: 0,
    theme: undefined,
    mode: "system",
    isChatDrawerOpen: true,
    // TODO: delete following fields
    selectedBots: null,
    messages: [],
    prompts: [],
  },
  mutations: {
    changeColumns(state, n) {
      state.columns = n;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    setBotSelected(state, { botClassname, selected }) {
      const currentChat = state.chats[state.currentChatIndex];
      const bot = currentChat.favBots.find(
        (bot) => bot.classname === botClassname,
      );
      if (bot) bot.selected = selected;
      else currentChat.favBots.push({ classname: botClassname, selected });
    },
    setFavBotOrder(state, newOrder) {
      const currentChat = state.chats[state.currentChatIndex];
      newOrder.forEach((botClassname, order) => {
        const bot = currentChat.favBots.find(
          (bot) => bot.classname === botClassname,
        );
        if (bot) bot.order = order;
      });
    },
    addFavoriteBot(state, botClassname) {
      const currentChat = state.chats[state.currentChatIndex];
      const favBots = currentChat.favBots;
      if (favBots.find((bot) => bot.classname === botClassname) == undefined)
        favBots.push({ classname: botClassname, selected: true });
    },
    removeFavoriteBot(state, botClassname) {
      const currentChat = state.chats[state.currentChatIndex];
      const favBots = currentChat.favBots;
      const index = favBots.findIndex((bot) => bot.classname === botClassname);
      favBots.splice(index, 1);
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
    setAzureOpenaiApi(state, values) {
      state.azureOpenaiApi = { ...state.azureOpenaiApi, ...values };
    },
    setMoss(state, token) {
      state.moss.token = token;
    },
    setQianWenToken(state, token) {
      state.qianWen.xsrfToken = token;
    },
    setSkyWork(state, tokens) {
      state.skyWork = { ...state.skyWork, ...tokens };
    },
    setWenxinQianfan(state, values) {
      state.wenxinQianfan = { ...state.wenxinQianfan, ...values };
    },
    setGradio(state, values) {
      state.gradio = { ...state.gradio, ...values };
    },
    setCharacterAI(state, values) {
      state.characterAI = { ...state.characterAI, ...values };
    },
    setClaudeAi(state, values) {
      state.claudeAi = { ...state.claudeAi, ...values };
    },
    setPoe(state, values) {
      state.poe = { ...state.poe, ...values };
    },
    setLatestPromptIndex(state, promptIndex) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.latestPromptIndex = promptIndex;
    },
    setLatestThreadPromptIndex(state, { threadIndex, promptIndex }) {
      const currentChat =
        state.chats[state.currentChatIndex].threads[threadIndex];
      currentChat.latestPromptIndex = promptIndex;
    },
    setResponseThreadIndex(state, { responseIndex, threadIndex }) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.messages[responseIndex].threadIndex = threadIndex;
    },
    updateMessage(state) {
      messageBuffer.forEach((update) => {
        const { indexes, message } = update;
        const { chatIndex, messageIndex } = indexes;
        const i = chatIndex == -1 ? state.currentChatIndex : chatIndex;
        const chat = state.chats[i];
        chat.messages[messageIndex] = {
          ...chat.messages[messageIndex],
          ...message,
        };
      });
      messageBuffer = [];
      isThrottleMessage = false;
    },
    updateThreadMessage(state) {
      threadMessageBuffer.forEach((update) => {
        const { indexes, message } = update;
        const { chatIndex, messageIndex, threadIndex } = indexes;
        const i = chatIndex == -1 ? state.currentChatIndex : chatIndex;
        const chat = state.chats[i];
        chat.threads[threadIndex].messages[messageIndex] = {
          ...chat.threads[threadIndex].messages[messageIndex],
          ...message,
        };
      });
      threadMessageBuffer = [];
      isThrottleThreadMessage = false;
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
      currentChat.threads = [];
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
      if (state.chats[0].threads === undefined) {
        state.chats[0].threads = [];
      }
      if (state.chats[0].index === undefined) {
        state.chats[0].index = 0;
        state.chats[0].createdTime = new Date().getTime();
        state.isChatDrawerOpen = true;
      }
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    createChat(state) {
      const { favBots } = state.chats[state.currentChatIndex];
      const chatIndex =
        state.chats.push({
          favBots,
          contexts: {},
          messages: [],
          threads: [],
          createdTime: new Date().getTime(),
        }) - 1;
      state.chats[chatIndex].index = chatIndex;
      state.chats[chatIndex].title = `${i18n.global.t("chat.newChat")} ${
        chatIndex + 1
      }`;
    },
    selectChat(state, index) {
      state.currentChatIndex = index;
    },
    hideChat(state) {
      state.chats[state.currentChatIndex].hide = true;
    },
    editChatTitle(state, { title, isEditedByUser = false }) {
      if (isEditedByUser) {
        state.chats[state.currentChatIndex].title = title;
        state.chats[state.currentChatIndex].isTitleUserEdited = true;
      } else {
        if (!state.chats[state.currentChatIndex].isTitleUserEdited) {
          // if user has not edit title before, set title
          state.chats[state.currentChatIndex].title = title;
        } // else do not overwrite user title
      }
    },
    setIsChatDrawerOpen(state, isChatDrawerOpen) {
      state.isChatDrawerOpen = isChatDrawerOpen;
    },
    deleteChats(state) {
      const { favBots } = state.chats[state.currentChatIndex];
      const newChats = [
        {
          favBots,
          contexts: {},
          messages: [],
          threads: [],
          index: 0,
          title: i18n.global.t("chat.newChat"),
          createdTime: new Date().getTime(),
        },
      ];
      state.chats = newChats;
      state.currentChatIndex = 0;
    },
    addPrompt(state, values) {
      const addPrompt = { ...values };
      addPrompt.index = state.prompts.push(addPrompt) - 1;
    },
    editPrompt(state, values) {
      const { index } = values;
      state.prompts[index] = { ...state.prompts[index], ...values };
    },
    deletePrompt(state, values) {
      state.prompts[values.index].hide = true;
    },
  },
  actions: {
    sendPrompt({ commit, state, dispatch }, { prompt, bots, promptIndex }) {
      isThrottleMessage = false;
      const currentChat = state.chats[state.currentChatIndex];
      if (promptIndex === undefined) {
        // if promptIndex not found, not resend, push to messages array
        const promptMessage = {
          type: "prompt",
          content: prompt,
          done: true,
          hide: false,
        };
        // add message
        const index = currentChat.messages.push(promptMessage);
        promptMessage.index = index - 1;
        promptIndex = promptMessage.index;
      }
      commit("setLatestPromptIndex", promptIndex); // to keep track of the latest prompt index for hiding old prompt's resend button

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
          promptIndex: promptIndex,
        };

        // workaround for tracking message position
        message.index = currentChat.messages.push(message) - 1;

        bot.sendPrompt(
          prompt,
          (indexes, values) =>
            dispatch("updateMessage", { indexes, message: values }),
          { chatIndex: state.currentChatIndex, messageIndex: message.index },
        );

        getMatomo()?.trackEvent(
          "prompt",
          "sendTo",
          bot.getClassname(),
          prompt.length,
        );
      }
    },
    sendPromptInThread(
      { commit, state, dispatch },
      { prompt, bot, responseIndex, threadIndex, promptIndex },
    ) {
      isThrottleThreadMessage = false;
      const currentChat = state.chats[state.currentChatIndex];
      let thread;
      if (threadIndex !== undefined) {
        // existing thread
        thread = currentChat.threads[threadIndex];
      } else {
        // new thread
        const newThreadMessage = {
          responseIndex: responseIndex,
          messages: [],
        };
        newThreadMessage.index = currentChat.threads.push(newThreadMessage) - 1;
        thread = newThreadMessage;
        threadIndex = thread.index;
        // update threadIndex to response
        commit("setResponseThreadIndex", {
          responseIndex,
          threadIndex: thread.index,
        });
      }

      if (promptIndex === undefined) {
        // index starts at zero, using `if (!promptIndex)` will enter wrong condition for first time.
        // if promptIndex not found, not resend, push to messages array
        const threadPromptMessage = {
          type: "prompt",
          content: prompt,
        };
        // add message
        threadPromptMessage.index =
          thread.messages.push(threadPromptMessage) - 1;
        promptIndex = threadPromptMessage.index;
      }
      commit("setLatestThreadPromptIndex", {
        threadIndex: thread.index,
        promptIndex,
      }); // to keep track of the latest prompt index for hiding old prompt's resend button

      const threadResponseMessage = {
        type: "response",
        content: "",
        format: bot.getOutputFormat(),
        model: bot.constructor._model,
        done: false,
        highlight: false,
        hide: false,
        className: bot.getClassname(),
        promptIndex: promptIndex,
      };

      // workaround for tracking message position
      threadResponseMessage.index =
        thread.messages.push(threadResponseMessage) - 1;

      bot.sendPrompt(
        prompt,
        (indexes, values) =>
          dispatch("updateThreadMessage", { indexes, message: values }),
        {
          chatIndex: state.currentChatIndex,
          messageIndex: threadResponseMessage.index,
          threadIndex: threadIndex,
        },
      );

      getMatomo()?.trackEvent(
        "prompt",
        "replyTo",
        bot.getClassname(),
        prompt.length,
      );
    },
    updateMessage({ commit, state }, { indexes, message: values }) {
      messageBuffer.push({ indexes, message: values });
      if (!isThrottleMessage) {
        isThrottleMessage = true;
        setTimeout(() => {
          commit("updateMessage");
          commit("incrementUpdateCounter");
        }, 200); // save every 0.2 seconds
      }
      if (values.done) {
        const i =
          indexes.chatIndex == -1 ? state.currentChatIndex : indexes.chatIndex;
        const chat = state.chats[i];
        const message = { ...chat.messages[indexes.messageIndex], ...values };
        getMatomo()?.trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
      }
    },
    updateThreadMessage({ commit, state }, { indexes, message: values }) {
      threadMessageBuffer.push({ indexes, message: values });
      if (!isThrottleThreadMessage) {
        isThrottleThreadMessage = true;
        setTimeout(() => {
          commit("updateThreadMessage");
          commit("incrementUpdateCounter");
        }, 200); // save every 0.2 seconds
      }
      if (values.done) {
        const i =
          indexes.chatIndex == -1 ? state.currentChatIndex : indexes.chatIndex;
        const chat = state.chats[i];
        let message = { ...chat.threads[indexes.threadIndex], ...values };
        getMatomo()?.trackEvent(
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
    // get current chat prompt
    getCurrentChatPrompt: (state, getters) => {
      const messages = getters.currentChat.messages;
      return messages.filter((message) => message?.type === "prompt");
    },
  },
  modules: {
    // ...你的模块
  },
  plugins: [vuexPersist.plugin, messagesPersist.plugin, promptsPersist.plugin], // 添加插件到 store
});
