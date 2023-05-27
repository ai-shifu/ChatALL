import { v4 as uuidv4 } from "uuid";
import { DEFAULT_BOT_NAMES } from "@/config";

const getMatomo = function () {
  return window.Piwik.getAsyncTracker();
};

const state = {
  currentChatId: null,
  chats: {},
}

const getters = {
  getMessages: (state) =>  state.chats[state.currentChatId].messages,
  getChats: (state) => Object.values(state.chats)
    .filter(({ messages }) => messages.length > 0)
    .map(({id, title}) => ({
      id,
      title,
    })),
  getCurrentChatId: (state) => state.currentChatId,
  getCurrentChatActiveBotNames: (state) => state.currentChatId 
    ? state.chats[state.currentChatId].activeBotNames
    : [],
}

const mutations = {
  ADD_CHAT(state, chat) {
    state.chats[chat.id] = chat;
  },
  DELETE_CHAT(state, id) {
    delete state.chats[id];
  },
  UPDATE_ACTIVE_CHAT_ID(state, id) {
    state.currentChatId = id;
  },
  ADD_CHAT_MESSAGE(state, message) {
    state.chats[state.currentChatId]
      .messages
      .push(message);
  },
  UPDATE_CHAT_MESSAGE(state, { index, message, chatId }) {
    state.chats[chatId].messages[index] = { 
      ...state.chats[chatId].messages[index], 
      ...message ,
    };
  },
  UPDATE_CURRENT_CHAT_ACTIVE_BOTS(state, activeBotNames) {
    state.chats[state.currentChatId].activeBotNames = activeBotNames
  },
  SET_CHAT_MESSAGES(state, messages) {
    state.chats[state.currentChatId].messages = messages;
  },
}

const actions = {
  // TODO: externalize this function into useChatBots composable
  sendPrompt({ commit, state, dispatch }, { prompt, botInstances }) {
    commit("ADD_CHAT_MESSAGE", {
      type: "prompt",
      content: prompt,
      done: true,
      hide: false,
    });

    const $matomo = getMatomo();
    
    // eslint-disable-next-line no-unused-vars
    for (const botInstance of Object.values(botInstances)) {

      const message = {
        type: "response",
        content: "",
        format: botInstance.getOutputFormat(),
        logo: "/bots/" + botInstance.getLogo(),
        name: botInstance.getFullname(),
        model: botInstance.constructor._model,
        done: false,
        highlight: false,
        hide: false,
        className: botInstance.constructor._className,
      };

      // workaround for tracking message position
      message.index = state.chats[state.currentChatId]
        .messages.push(message) - 1;
      
      botInstance.sendPrompt(
        prompt,
        (index, values) =>
          dispatch("updateChatMessage", { 
            index, 
            message: values,
            chatId: botInstance.chatId,
          }),
        message.index,
      );

      $matomo.trackEvent(
        "prompt",
        "sendTo",
        botInstance.constructor._className,
        prompt.length,
      );
    }
  },
  updateChatMessage({ commit, state }, { index, message: values, chatId }) {
    commit("UPDATE_CHAT_MESSAGE", { index, message: values, chatId });

    // workaround for notifing the message window to scroll to bottom
    commit("appModule/INCR_UPDATE_COUNTER", undefined, { root: true });

    const message = { ...state.chats[chatId].messages[index], ...values };
    if (values.done) {
      getMatomo().trackEvent(
        "prompt",
        "received",
        message.className,
        message.content.length,
      );
    }
  },
  clearChatMessages({ commit }) {
    commit("SET_CHAT_MESSAGES", []);
  },
  deleteChat({ commit }, id) {
    commit("DELETE_CHAT", id);
  },
  createChat({ commit, state }) {
    if (state.currentChatId && state.chats[state.currentChatId].messages.length === 0) {
      return;
    }

    const id = uuidv4()
    const chatsCount = Object.keys(state.chats).length;
    const activeBotNames = [...DEFAULT_BOT_NAMES];
    
    if (process.env.NODE_ENV !== "production") {
      activeBotNames.push('DevBot');
    }
    
    commit("ADD_CHAT", { 
      id, 
      title: `New Chat #${chatsCount + 1}`, 
      messages: [],
      activeBotNames,
    });
    commit("UPDATE_ACTIVE_CHAT_ID", id);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
