import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from './services/Auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: authService.isAuthenticated(),
    userId: authService.getUserId()
  },
  getters: {
    getAuth(state) {
      return state.isAuthenticated
    },
    getId(state) {
      return state.userId
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.isAuthenticated = auth
    },
    setId(state, userId) {
      state.userId = userId
    }
  },
  actions: {
    modifyAuth(context, payload) {
      context.commit('setAuth', payload)
    },
    modifyId(context, payload) {
      context.commit('setId', payload)
    }
  }
})
