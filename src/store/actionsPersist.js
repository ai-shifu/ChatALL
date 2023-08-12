// store/actionsPersist.js
import VuexPersist from "vuex-persist";

const actionsPersist = new VuexPersist({
  key: "chatall-actions",
  storage: window.localStorage,
  reducer: (state) => ({ actions: state.actions }), // Store actions
});

export default actionsPersist;
