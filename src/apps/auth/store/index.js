import * as fb from 'firebase';

import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';
import {SET_LOAD, SHOW_MODAL} from "@/store/types";

export const lsToken = 'access-token';

export const state = {
  uid: localStorage.getItem(lsToken) || null,
};

export const getters = {

  isAuth(state) {
    return !!state.uid;
  },

  userId(state) {
    return state.uid;
  },
};

export const mutations =  {
  [LOGIN_USER](state, payload) {
    state.uid = payload;
    localStorage.setItem(lsToken, payload);
  },

  [LOGOUT_USER](state) {
    state.uid = null;
    localStorage.removeItem(lsToken);
  },
};

export const actions = {
  async [CREATE_USER]({commit}, {email, password}) {
    commit(SET_LOAD, true)

    try {
      const request = await fb.auth().createUserWithEmailAndPassword(email, password)

      await fb.database().ref(`users/${request.user.uid}/count`).set(10000);
      commit(LOGIN_USER, request.user.uid)
      commit(SHOW_MODAL, false)
      commit(SET_LOAD, false)
    } catch (error) {
      commit(SET_LOAD, false)
      throw error
    }
  },

  async [LOGIN_USER]({commit}, {email, password}) {
    commit(SET_LOAD, true)

    try {
        const request = await fb.auth().signInWithEmailAndPassword(email, password)
        commit(SHOW_MODAL, false)
        commit(LOGIN_USER, request.user.uid)
        commit(SET_LOAD, false)
    } catch (error) {
        commit(SET_LOAD, false)
        throw error
    }
  },

  [LOGOUT_USER]({commit}) {
    commit(LOGOUT_USER)
  },
};


export default {
  state,
  getters,
  mutations,
  actions
}
