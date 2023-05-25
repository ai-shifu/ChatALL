import i18n from "../i18n";

const state = {
  uuid: "",
  lang: "auto",
  columns: 2,
  updateCounter: 0,
}

const getters = {
  getUpdateCounter: (state) => state.updateCounter,
  getColumns: (state) => state.columns,
  getUuid: (state) => state.uuid,
  getLang: (state) => state.lang,
}

const mutations = {
  CHANGE_COLUMNS(state, n) {
    state.columns = n;
  },
  SET_UUID(state, uuid) {
    state.uuid = uuid;
  },
  SET_CURRENT_LANGUAGE(state, language) {
    state.lang = language;
    i18n.global.locale = language;
  },
  INCR_UPDATE_COUNTER(state) {
    state.updateCounter += 1;
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
