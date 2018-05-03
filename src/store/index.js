import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coin: 0
  },
  mutations: {
    clicker_action(state) {
      state.coin++
    }
  }
})
