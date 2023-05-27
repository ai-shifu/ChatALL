
const state = {
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
  getOpenaiApiSettings: (state) => state.openaiApi,
  getChatgptSettings: (state) => state.chatgpt,
  getGradioSettings: (state) => state.gradio,
  getMossSettings: (state) => state.moss,
  getWenxinQianfanSettings: (state) => state.wenxinQianfan,
}

const mutations = {
  SET_CHATGPT_SETTINGS(state, refreshCycle) {
    state.chatgpt.refreshCycle = refreshCycle;
  },
  SET_OPENAI_API_SETTINGS(state, values) {
    state.openaiApi = { ...state.openaiApi, ...values };
  },
  SET_MOSS_SETTINGS(state, token) {
    state.moss.token = token;
  },
  SET_WENXIN_QIANFAN_SETTINGS(state, { apiKey, secretKey }) {
    state.wenxinQianfan = { apiKey, secretKey };
  },
  SET_GRADIO_SETTINGS(state, values) {
    state.gradio = { ...state.gradio, ...values };
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}