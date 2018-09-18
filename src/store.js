import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from './services/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: authService.isAuthenticated()
  },
  getters: {
    getAuth(state) {
      return state.isAuthenticated
    } 
  },
  mutations: {
    setAuth(state, auth) {
      state.isAuthenticated = auth
    }
  },
  actions: {
    modifyAuth(context, payload) {
      context.commit('setAuth', payload)
    }
  }
})
