import * as fb from 'firebase';

import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';
import {PRICE_GENERATOR} from "@/apps/stocks/store/types";

export const state = {
  isAuth: null,
  uid: null,
};

export const getters = {

  isAuth(state) {
    return state.isAuth;
  },

  userId(state) {
    return state.uid;
  },
};

export const mutations =  {
  [LOGIN_USER](state, payload) {
    state.uid = payload;
    state.isAuth = true;
  },

  [LOGOUT_USER](state, payload) {
    state.uid = null;
    state.isAuth = null;
  },
};

export const actions = {
  async [CREATE_USER]({commit}, {email, password}) {

    try {
      const test = fb.auth().createUserWithEmailAndPassword(email, password)
      console.log('test', test);
    } catch (error) {
      console.log('error', error)
      throw error
    }

  },

  [LOGIN_USER]({commit}, payload) {

    // commit(LOGIN_USER, payload)
    // commit(FETCH_PORTFOLIO, payload)
  },

  [LOGOUT_USER]({commit}, payload) {
    commit(LOGOUT_USER)
  },
};


export default {
  state,
  getters,
  mutations,
  actions
}
