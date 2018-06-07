import Vue from 'vue'
import Vuex from 'vuex'

import portfolio from '../pages/portfolio/store'
import stocks from '../pages/stocks/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 10000,
    offers: {
      'BWV': 110,
      'Google': 200,
      'Apple': 250,
      'Twitter': 10
    }
  },
  getters: {
      getTotalCounter(state) {
          const total = String(state.total);
          return `$${total.slice(0,-3)}.${total.slice(-3)}`;
      }
  },
  mutations: {
      setTotalCounter(state, payload) {
          const { price, count, type} = payload;
          if (type === 'sell') {
            state.total += Number(price) * Number(count);
          }
          if (type === 'buy') {
            state.total -= Number(price) * Number(count);
          }
      },
      pseudoRandomPriceGenerator(state) {
        const prices = state.offers;
        for (let key in prices) {
          const value = Math.floor(Math.random() * 10);
          Math.random() > 0.5 ? prices[key] += value : prices[key] -= value;
          if(prices[key] < 0) prices[key] = 0;
        }

      }
  },
  actions: {  },
  modules: {
    portfolio, stocks
  }
})
