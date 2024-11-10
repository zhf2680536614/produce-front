import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      username: "",
      password: "",
      gender: "",
      phoneNumber: "",
      email: "",
      image: "",
      address: [],
    },
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
  }
  },
  actions: {},
  modules: {},
});
