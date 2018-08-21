import * as fb from 'firebase';

import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';
import {SET_LOAD, SHOW_MODAL} from "@/store/types";

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

  [LOGOUT_USER](state) {
    state.uid = null;
    state.isAuth = null;
  },
};

export const actions = {
  async [CREATE_USER]({commit}, {email, password}) {
    commit(SET_LOAD, true)

    try {
      const request = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit(SET_LOAD, false)
        commit(SHOW_MODAL, false)
        //TODO: logic of add count to new user
        commit(LOGIN_USER, request.user.uid)
    } catch (error) {
      commit(SET_LOAD, false)
      throw error
    }
  },

  async [LOGIN_USER]({commit}, {email, password}) {
    commit(SET_LOAD, true)

    try {
        const request = await fb.auth().signInWithEmailAndPassword(email, password)
        commit(SET_LOAD, false)
        commit(SHOW_MODAL, false)
        commit(LOGIN_USER, request.user.uid)
        //commit(FETCH_PORTFOLIO, payload)
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
