import { v4 as uuidv4 } from "uuid";

// Bots
import ChatGPT35Bot from "@/bots/openai/ChatGPT35Bot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import ChatGPTBrowsingBot from "@/bots/openai/ChatGPTBrowsingBot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import MOSSBot from "@/bots/MOSSBot";
import WenxinQianfanBot from "@/bots/baidu/WenxinQianfanBot";
import VicunaBot from "@/bots/lmsys/VicunaBot";
import ChatGLMBot from "@/bots/lmsys/ChatGLMBot";
import AlpacaBot from "@/bots/lmsys/AlpacaBot";
import ClaudeBot from "@/bots/lmsys/ClaudeBot";
import GradioAppBot from "@/bots/huggingface/GradioAppBot";
import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";
import DevBot from "@/bots/DevBot";

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
  getCurrentChatBotsAvailable: (state) => state.currentChatId 
    ? state.chats[state.currentChatId].bots
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
  UPDATE_CHAT_ACTIVE_BOTS(state, { activeBots }) {
    state.chats[state.currentChatId].activeBots = activeBots
  },
  SET_CHAT_MESSAGES(state, messages) {
    state.chats[state.currentChatId].messages = messages;
  },
}

const actions = {
  sendPrompt({ commit, state, dispatch }, { prompt, activeBotNames }) {
    commit("ADD_CHAT_MESSAGE", {
      type: "prompt",
      content: prompt,
      done: true,
      hide: false,
    });

    const $matomo = getMatomo();
    
    // eslint-disable-next-line no-unused-vars
    for (const activeBotName of activeBotNames) {

      const bot = state.chats[state.currentChatId].bots.find(
        (bot) => bot.constructor._className === activeBotName,
      );

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
      message.index = state.chats[state.currentChatId]
        .messages.push(message) - 1;
      
      bot.sendPrompt(
        prompt,
        (index, values) =>
          dispatch("updateChatMessage", { 
            index, 
            message: values,
            chatId: bot.chatId,
          }),
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
    const bots = [
      ChatGPT35Bot.getInstance(),
      ChatGPT4Bot.getInstance(),
      ChatGPTBrowsingBot.getInstance(),
      OpenAIAPI35Bot.getInstance(),
      OpenAIAPI4Bot.getInstance(),
      BingChatCreativeBot.getInstance(),
      BingChatBalancedBot.getInstance(),
      BingChatPreciseBot.getInstance(),
      ClaudeBot.getInstance(),
      BardBot.getInstance(),
      WenxinQianfanBot.getInstance(),
      SparkBot.getInstance(),
      HuggingChatBot.getInstance(),
      VicunaBot.getInstance(),
      AlpacaBot.getInstance(),
      ChatGLMBot.getInstance(),
      MOSSBot.getInstance(),
      GradioAppBot.getInstance(),
    ]

    if (process.env.NODE_ENV !== "production") {
      bots.push(DevBot.getInstance());
    }

    for (const bot of bots) {
      bot.setChatId(id);
    }

    commit("ADD_CHAT", { 
      id, 
      title: `New Chat #${chatsCount + 1}`, 
      messages: [],
      bots,
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
