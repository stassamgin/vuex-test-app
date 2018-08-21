import Vue from 'vue'
import Vuex from 'vuex'

import portfolio from '@/apps/portfolio/store'
import stocks from '@/apps/stocks/store'
import auth from '@/apps/auth/store'

import {
  SHOW_MODAL,
  SET_LOAD,
} from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0,
    inputField: '',

    showModal: false,
    loading: false,
  },
  getters: {
    getInput(state) {
        return state.inputField;
    },

    isShowModal(state) {
      return state.showModal;
    },

    isLoading(state) {
      return state.loading;
    },
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
      },

      [SHOW_MODAL](state, value) {
        if (value) {
          state.showModal = true;
        } else {
          state.showModal = false;
        }
      },

      [SET_LOAD](state, value) {
        if (value) {
          state.loading = true;
        } else {
          state.loading = false;
        }
      }
  },
  actions: {
      getStartTotalValue({commit}) {
          Vue.http.get('total.json')
              .then(resp => resp.json())
              .then(total => {
                  commit('setTotalCounter', {price: total})
              } )
      },


      [SET_LOAD]({commit}, value) {
        commit(SET_LOAD, value)
      }
  },
  modules: {
    stocks, portfolio, auth
  }
})
