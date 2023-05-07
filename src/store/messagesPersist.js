// store/messagesPersist.js
import VuexPersist from "vuex-persist";

const messagesPersist = new VuexPersist({
  key: "chatall-messages",
  storage: window.localStorage,
  reducer: (state) => ({ messages: state.messages }), // 只存储 messages 状态
});

export default messagesPersist;
