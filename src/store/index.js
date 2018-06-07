import Vue from 'vue'
import Vuex from 'vuex'

import portfolio from '../pages/portfolio/store'
import stocks from '../pages/stocks/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0
  },
  mutations: {  },
  actions: {  },
  getters: {  },
  modules: {
    portfolio, stocks
  }
})
