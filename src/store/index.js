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
    showModal: false,
    loading: false,
  },
  getters: {
    isShowModal(state) {
      return state.showModal;
    },

    isLoading(state) {
      return state.loading;
    },
  },
  mutations: {
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
      [SET_LOAD]({commit}, value) {
        commit(SET_LOAD, value)
      }
  },
  modules: {
    stocks, portfolio, auth
  }
})
