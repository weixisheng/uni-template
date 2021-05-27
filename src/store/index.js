import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getVip } from '@http/api'
const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    vipType: state => state.userInfo.vipType
  },
  mutations: {
    updateUser(state, payload) {
      state.userInfo = payload.userInfo
    }
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getVip().then(res => {
          if (Vue.prototype.$h.ck(res)) {
            commit('updateUser', {
              userInfo: res.return_data
            })
          }
          resolve()
        })
      })
    }
  }
})

export default store
