import VuexPersistence from "vuex-persist";
import { createStore } from "vuex";

import appModule from './app.module'
import chatsModule from './chats.module'
import settingsModule from './settings.module'

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
  plugins: process.env.NODE_ENV === 'production'
    ? [persistedStore.plugin]
    : []
})

export default store