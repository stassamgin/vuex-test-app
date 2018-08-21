import { PRICE_GENERATOR } from './types';
import 'babel-polyfill';

import * as fb from 'firebase';

export const state = {
  offers: []
};

export const getters = {
  getOffers(state) {
    return state.offers
  }
};

export const mutations =  {
  [PRICE_GENERATOR] (state, payload) {
    state.offers = payload
  }
};

export const actions = {
  async randomPriseGenerateAction({commit, state}) {

    const prices = JSON.parse(JSON.stringify(state.offers));
    prices.map( item => {
      let {price} = item;
      const value = Math.floor(Math.random() * 10);
      Math.random() > 0.5 ? price += value : price -= value;
      if(price < 0) price = 0;
      return Object.assign(item, {price})
    })

    try {
      await fb.database().ref('offers').set(prices);
      commit(PRICE_GENERATOR, prices);
    } catch (error) {
      console.log('error', error)
      throw error
    }
  },

  async getStartStocksValue({commit}) {
    try {
      const offers = await fb.database().ref('offers').once('value');
      commit(PRICE_GENERATOR, offers.val())
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
