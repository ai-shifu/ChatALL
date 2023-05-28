import VuexPersistence from "vuex-persist";
import { createStore } from "vuex";

import appModule from './app.module'
import chatsModule from './chats.module'
import settingsModule from './settings.module'

// eslint-disable-next-line no-unused-vars
const persistedStore = new VuexPersistence({
  key: "chatall-data",
  storage: window.localStorage,
  modules: [
    "chatsModule", 
    "appModule", 
    "settingsModule"
  ],
});

const store = createStore({
  modules: {
    appModule,
    chatsModule,
    settingsModule,
  },
  plugins: [ persistedStore.plugin ],
})

export default store