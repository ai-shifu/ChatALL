// store/promptsPersist.js
import VuexPersist from "vuex-persist";

const promptsPersist = new VuexPersist({
  key: "chatall-prompts",
  storage: window.localStorage,
  reducer: (state) => ({ prompts: state.prompts }), // Store prompts
});

export default promptsPersist;
