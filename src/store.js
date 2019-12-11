import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from './store-modules/auth'
import dates from './store-modules/dates'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: sessionStorage })],

  modules: {
      auth,
      dates
  },
});