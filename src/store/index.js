import Vue from 'vue'
import Vuex from 'vuex'

import portfolio from '../pages/portfolio/store'
import stocks from '../pages/stocks/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0,
    inputField: '',
  },
  getters: {
      getTotalCounter(state) {
          const total = String(state.total);
          return `$${total.slice(0,-3)}.${total.slice(-3)}`;
      },

    getInput(state) {
        return state.inputField;
    }
  },
  mutations: {
      setTotalCounter(state, { price, count, eventType }) {
          if (eventType === 'sell') {
            state.total += Number(price) * Number(count);
          } else if (eventType === 'buy') {
            state.total -= Number(price) * Number(count);
          } else {
            state.total = Number(price);
          }
      },

      getInputMutate(state, value) {
        state.inputField = value;
      }
  },
  actions: {
      getStartTotalValue({commit}) {
          Vue.http.get('total.json')
              .then(resp => resp.json())
              .then(total => {
                  commit('setTotalCounter', {price: total})
              } )
      }
  },
  modules: {
    stocks, portfolio
  }
})
