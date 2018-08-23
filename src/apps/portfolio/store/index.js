import {
  BUE_PORTFOLIO_ITEM,
  BUE_PORTFOLIO_EXIST_ITEM,
  BUE_PORTFOLIO_CREATE_ITEM,
  SELL_PORTFOLIO_ITEM,
  SET_PORTFOLIO_STOCK, //
  SET_PORTFOLIO_HISTORY, //
  SET_PORTFOLIO_COUNT, //
  FETCH_PORTFOLIO, //
  SET_PORTFOLIO,
} from '@/apps/portfolio/store/types';
import {SET_LOAD, SHOW_MODAL} from "@/store/types";
import * as fb from "firebase";


const portfolioArrayGenerator = (totalItemStock, portfolioStock) => {
  if(totalItemStock.length === 0) return;

  function Item (stockItem, portfolioItem) {
    this.id = portfolioItem.id;
    this.name = stockItem.name;
    this.currentPrice = stockItem.price;
    this.buePrice = portfolioItem.price;
    this.count = portfolioItem.count;
  }

  const newPortfolioArray = [];

  portfolioStock.forEach(item => {
    newPortfolioArray.push(new Item(totalItemStock.find(stockItem => stockItem.id === item.id), item))
  })

  return newPortfolioArray;
}


export const state = {
  stock: [],
  history: [],
  count: 10000,
};

export const getters = {
  portfolioStock(state, getters) {
    return portfolioArrayGenerator(getters.getOffers, Object.keys(state.stock).map(item => state.stock[item]));
  },

  portfolioCount(state) {
    return state.count
  },

  portfolioHistory(state) {
    return state.history
  },
};

export const mutations =  {

  [BUE_PORTFOLIO_ITEM](state, {count, id, price}) {

  },
  [SET_PORTFOLIO_STOCK](state, stock) {
    state.stock = stock
  },
  [SET_PORTFOLIO_HISTORY](state, history) {
    console.log('history--', history)
  },
  [SET_PORTFOLIO_COUNT](state, count) {
    console.log('count--', count)
  },

  'SET_PORTFOLIO_ITEM' (state, {count, eventType, name, price}) {
    if (eventType === 'sell') {
      const item = state.stock.find(item => item.name === name)
      item.count -= Number(count)
      if (item.count < 1) state.stock.splice(state.stock.indexOf(item), 1)
    }
    if (eventType === 'buy') {

    }
  }
};

export const actions = {
  [FETCH_PORTFOLIO]({commit, state, rootState}) {
    try {
      fb.database().ref(`users/${rootState.auth.uid}`).on('value', (snapShot) => {
        const { stock, history, count } = snapShot.val();
        commit(SET_PORTFOLIO_STOCK, stock)
        commit(SET_PORTFOLIO_HISTORY, history)
        commit(SET_PORTFOLIO_COUNT, count)
      });

      commit(SET_LOAD, false)
    } catch (error) {
      commit(SET_LOAD, false)

      console.log(error)
    }
  },


  async BUE_PORTFOLIO_ITEM({commit, state, rootState}, {count, data:{id, price}}) {

    commit(SET_LOAD, true)

    const currentItem = state.stock.find(item => item.id === id);
    if(currentItem) {
      const newItem = Object.assign({}, currentItem);
      newItem.price = Math.round(
        (currentItem.price * currentItem.count + Number(price) * Number(count))/(currentItem.count + Number(count)))
      newItem.count += Number(count)

      // await fb.database().ref('offers').set(prices);
      commit(SET_LOAD, false)
    } else {

      try {
        const request = await fb.database().ref(`users/${rootState.auth.uid}/stock`).push({
          id,
          count: Number(count),
          price: Number(price)
        });
        commit(SET_LOAD, false)

        console.log('request-', request)

        // commit(SHOW_MODAL, false)
        // commit(LOGIN_USER, request.user.uid)
        //commit(FETCH_PORTFOLIO, payload)
      } catch (error) {
        commit(SET_LOAD, false)

        console.log(error)
        throw error
      }
    }
  },

  sellPortfolioItemAction({commit, state, rootState}, {count, eventType, data:{name}}) {

    if(Number(count) > state.stock.find(item => item.name === name).count) return
    const currentPrice = rootState.stocks.offers.find(item => item.name === name).price
    commit('setTotalCounter', {
      price: currentPrice,
      count,
      eventType})
    commit('SET_PORTFOLIO_ITEM', {
      count,
      eventType,
      name,
      price: currentPrice
    })
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
