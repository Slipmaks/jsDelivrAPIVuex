import { createStore } from "vuex";

const store = createStore({
  state: {
    rawData: [],
    currentPackage: {},
  },
  mutations: {
    setData(state, payload) {
      state.rawData = payload;
    },
    setCurrentPackage(state, payload) {
      state.currentPackage = payload;
    },
  },
  actions: {
    async getData(context, searchOption) {
      fetch(
        `https://registry.npmjs.org/-/v1/search?text=${searchOption}&size=100`
      ).then((response) => {
        response.json().then((r) => {
          context.commit("setData", r.objects);
        });
      });
    },
    getCurrentPackage(context, p) {
      context.commit("setCurrentPackage", p);
    },
  },
});
export default store;
