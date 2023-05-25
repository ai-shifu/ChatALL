// store/messagesPersist.js
import VuexPersist from "vuex-persist";

const messagesPersist = new VuexPersist({
  key: "chatall-messages",
  storage: window.localStorage,
  reducer: (state) => ({ messages: state.messages, chats: state.chats }), // Store only messages and chats
});

export default messagesPersist;
