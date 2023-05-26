
const state = {
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
}

const getters = {
  getSelectedBots: (state) => state.selectedBots,
  getOpenaiApiSettings: (state) => state.openaiApi,
  getChatgptSettings: (state) => state.chatgpt,
  getGradioSettings: (state) => state.gradio,
  getMossSettings: (state) => state.moss,
  getWenxinQianfanSettings: (state) => state.wenxinQianfan,
}

const mutations = {
  SET_BOT_SELECTED(state, payload) {
    const { botId, selected } = payload;
    state.selectedBots[botId] = selected;
  },
  SET_CHATGPT(state, refreshCycle) {
    state.chatgpt.refreshCycle = refreshCycle;
  },
  SET_OPENAI_API(state, values) {
    state.openaiApi = { ...state.openaiApi, ...values };
  },
  SET_MOSS(state, token) {
    state.moss.token = token;
  },
  SET_WENXIN_QIANFAN(state, { apiKey, secretKey }) {
    state.wenxinQianfan = { apiKey, secretKey };
  },
  SET_GRADIO(state, values) {
    state.gradio = { ...state.gradio, ...values };
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}