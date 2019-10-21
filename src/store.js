import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from './modules/auth'
import gbg from './modules/qld/geebung'
import smt from './modules/nsw/smithfield'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: sessionStorage })],

  modules: {
      auth,
      gbg,
      smt
  },
});