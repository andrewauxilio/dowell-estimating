import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/auth'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    apps: {},
    roles: {}
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
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
    }
  },
  actions: {
    getApps(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/me')
        .then(response => {
            const _apps = response.data.apps
            const apps = {}

            _apps.forEach(el => {
              apps.push(el.app)
            })

            context.commit('getApps', apps)
            resolve(response)
        })
        .catch(error => {
            reject(error)
            console.log(error)
        })
      })
    },

    getRoles(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.post('/me')
        .then(response => {
            const _roles = response.data.roles
            const roles = {}

            _roles.forEach(el => {
              roles.push(el.role)
            })

            context.commit('getRoles', roles)
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
        axios.post('/login', {
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
          axios.post('/logout')
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
