import { createStore } from 'vuex';
import { auth } from '../utils/firebase';

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    reloadUser({ commit }, name){
      auth.onAuthStateChanged( (user) => {
        commit("setUser", {
          ...user
        });
      })
    }
  },
  modules: {
  }
})
