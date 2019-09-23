import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    apps: [],
    roles: [],
    states: [],
    sites: [],
  },
  plugins: [createPersistedState()],
  getters: {
    loggedIn(state) {
      return state.token !== null
    },

    /**---------------------------------------
    *** Apps 
    ***---------------------------------------
    **/
    isEstimating(state) {
      const apps = state.apps
      return (apps.includes("estimating") ? true : false) 
    },

    /**---------------------------------------
    *** Roles 
    ***---------------------------------------
    **/
    isManager(state) {
      const roles = state.roles
      return (roles.includes("manager") ? true : false) 
    },
    isUser(state) {
      const roles = state.roles
      return (roles.includes("user") ? true : false) 
    },

    /**---------------------------------------
    *** States 
    ***---------------------------------------
    **/
    isNAT(state) {
      const states = state.states
      return (states.includes("nat") ? true : false) 
    },
    isVIC(state) {
      const states = state.states
      return (states.includes("vic") ? true : false) 
    },
    isQLD(state) {
      const states = state.states
      return (states.includes("nsw") ? true : false) 
    },
    isNSW(state) {
      const states = state.states
      return (states.includes("qld") ? true : false) 
    },

    /**---------------------------------------
    *** Sites 
    ***---------------------------------------
    **/
    // Queensland
    isGBG(state) {
      const sites = state.sites
      return (sites.includes("gbg") ? true : false) 
    },
    
    // New South Wales
    isNOW(state) {
      const sites = state.sites
      return (sites.includes("now") ? true : false) 
    },
    isNEW(state) {
      const sites = state.sites
      return (sites.includes("new") ? true : false) 
    },
    isSMT(state) {
      const sites = state.sites
      return (sites.includes("smt") ? true : false) 
    },

    //Victoria
    isBAY(state) {
      const sites = state.sites
      return (sites.includes("bay") ? true : false) 
    },

    
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    getApps(state, apps) {
      state.apps = apps
    },
    getRoles(state, roles) {
      state.roles = roles
    },
    getStates(state, states) {
      state.states = states
    },
    getSites(state, sites) {
      state.sites = sites
    }
  },
  actions: {
    getUserDetails(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/auth/me')
        .then(response => {
            const _apps = response.data.apps
            const apps = []

            const _roles = response.data.roles
            const roles = []

            const _states = response.data.states
            const states = []

            const _sites = response.data.sites
            const sites = []

            _apps.forEach(el => {
              apps.push(el.app)
              console.log(el.app)
            })

            _roles.forEach(el => {
              roles.push(el.role)
              console.log(el.role)
            })

            _states.forEach(el => {
              states.push(el.state)
              console.log(el.state)
            })

            _sites.forEach(el => {
              sites.push(el.site)
              console.log(el.site)
            })

            context.commit('getApps', apps)
            context.commit('getRoles', roles)
            context.commit('getStates', states)
            context.commit('getSites', sites)

            resolve(response)
        })
        .catch(error => {
            reject(error)
            console.log(error)
        })
      })
    },

    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', {
          email: credentials.email,
          password: credentials.password
        })
        .then(response => {
          const token = response.data.access_token
          localStorage.setItem('access_token', token)
          context.commit('retrieveToken', token)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/auth/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
        })
      }
    },
  }
})
