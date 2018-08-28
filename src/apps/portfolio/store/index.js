import {
  BUE_PORTFOLIO_ITEM,
  SELL_PORTFOLIO_ITEM,
  REMOVE_PORTFOLIO_ITEM,
  SET_PORTFOLIO_STOCK,
  SET_PORTFOLIO_HISTORY,
  SET_PORTFOLIO_COUNT,
  FETCH_PORTFOLIO,
} from '@/apps/portfolio/store/types';
import { SET_LOAD } from "@/store/types";
import * as fb from "firebase";


const portfolioArrayGenerator = (totalItemStock, portfolioStock) => {
  if(totalItemStock.length === 0) return;

  function Item (stockItem, portfolioItem) {
    this.id = portfolioItem.id;
    this.name = stockItem.name;
    this.currentPrice = stockItem.price;
    this.price = portfolioItem.price;
    this.count = portfolioItem.count;
  }

  const newPortfolioArray = [];

  portfolioStock.forEach(item => {
    newPortfolioArray.push(new Item(totalItemStock.find(stockItem => stockItem.id === item.id), item))
  })

  return newPortfolioArray;
};

const createHistoryBuyItem = function ({id, name, price}, buyCount) {
  this.side = 'buy';
  this.date = JSON.stringify(new Date());
  this.id = id;
  this.name = name;
  this.price = price;
  this.count = buyCount;
}

const createHistorySellItem = function ({id, name, currentPrice, price}, sellCount) {
  this.side = 'sell';
  this.date = JSON.stringify(new Date());
  this.id = id;
  this.name = name;
  this.price = price;
  this.sellPrice = currentPrice;
  this.count = sellCount;
}


export const state = {
  stock: null,
  history: null,
  count: null,
};

export const getters = {
  portfolioStock(state, getters) {
    if(state.stock)
    return portfolioArrayGenerator(getters.getOffers, Object.keys(state.stock).map(item => state.stock[item]));
  },

  portfolioCount(state) {
    return state.count
  },

  portfolioHistory(state) {
    return state.history ? Object.keys(state.history).map(item => state.history[item]) : [];
  },
};

export const mutations =  {
  [SET_PORTFOLIO_STOCK](state, stock) {
    state.stock = stock
  },

  [SET_PORTFOLIO_HISTORY](state, history) {
    if (state.history) {
      console.log('TRIGGER 1')
      const {key, item} = history;
      state.history = Object.assign({}, state.history, {[key]: item})
    } else {
      console.log('TRIGGER 2')
      state.history = history
    }
  },

  [SET_PORTFOLIO_COUNT](state, count) {
    state.count = count
  },

  [BUE_PORTFOLIO_ITEM](state, {currentPortfolioItemKey, count, price}) {
    state.stock[currentPortfolioItemKey].count = count;
    state.stock[currentPortfolioItemKey].price = price;
  },

  [SELL_PORTFOLIO_ITEM](state, {currentPortfolioItemKey, sellItemCount}) {
    state.stock[currentPortfolioItemKey].count -= sellItemCount;
  },

  [REMOVE_PORTFOLIO_ITEM](state, currentPortfolioItemKey) {
    delete state.stock[currentPortfolioItemKey]
    state.stock = Object.assign({}, state.stock)
  }
};

export const actions = {
  async [SET_PORTFOLIO_HISTORY]({dispatch, commit, state, rootState}, item) {
    try {
      const HISTORY_LENGTH = 20;
      const historyArray = state.history ? Object.keys(state.history) : {};
      if(historyArray.length >= HISTORY_LENGTH) {

        const newHistory = historyArray.slice(10).reduce(function(acc, key) {
          acc[key] = state.history[key]
          return acc
        }, {})

        await fb.database().ref(`users/${rootState.auth.uid}/history`).set(newHistory);
        await fb.database().ref(`users/${rootState.auth.uid}/history`).push(item);
        await dispatch(FETCH_PORTFOLIO);
        commit(SET_LOAD, false)
      } else {

        if(state.history) {
          const historyFetchAnswer = fb.database().ref(`users/${rootState.auth.uid}/history`).push(item);
          commit(SET_PORTFOLIO_HISTORY, {key: historyFetchAnswer.key, item})
          commit(SET_LOAD, false)
        } else {
          fb.database().ref(`users/${rootState.auth.uid}/history`).push(item);
          await dispatch(FETCH_PORTFOLIO);
          commit(SET_LOAD, false)
        }
      }
    } catch (error) {
      commit(SET_LOAD, false)
      console.log(error)
    }
  },

  [FETCH_PORTFOLIO]({commit, state, rootState}) {
    try {
      fb.database().ref(`users/${rootState.auth.uid}`).once('value', (snapShot) => {
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

  async [BUE_PORTFOLIO_ITEM]({dispatch, commit, state, rootState}, {count, data}) {
    commit(SET_LOAD, true)

    const {id, price} = data;

    const currentPortfolioItemKey = (() => {
      const stock = state.stock;
      for (let key in stock) {
        if (stock[key].id === id) return key
      }
    })();

    const newProfileCount = state.count - count * price;
    const currentItem = currentPortfolioItemKey ? state.stock[currentPortfolioItemKey] : null;

    if(currentItem) {
      const newItem = Object.assign({}, currentItem);
      newItem.price = Math.round(
        (currentItem.price * currentItem.count + Number(price) * Number(count))/(currentItem.count + Number(count)))
      newItem.count += Number(count)

      try {
        await fb.database().ref(`users/${rootState.auth.uid}/stock/${currentPortfolioItemKey}`).set(newItem);
        await fb.database().ref(`users/${rootState.auth.uid}/count`).set(newProfileCount);

        commit(BUE_PORTFOLIO_ITEM, {currentPortfolioItemKey, count: newItem.count, price: newItem.price});
        commit(SET_PORTFOLIO_COUNT, newProfileCount);
        await dispatch(SET_PORTFOLIO_HISTORY, new createHistoryBuyItem(data, count));
        commit(SET_LOAD, false)
      } catch (error) {
        commit(SET_LOAD, false)
        console.log(error)
      }
    } else {

      try {
        await fb.database().ref(`users/${rootState.auth.uid}/count`).set(newProfileCount);
        await fb.database().ref(`users/${rootState.auth.uid}/stock`).push({
          id,
          count: Number(count),
          price: Number(price)
        });
        await dispatch(SET_PORTFOLIO_HISTORY, new createHistoryBuyItem(data, count));
        await dispatch(FETCH_PORTFOLIO);
        commit(SET_PORTFOLIO_COUNT, newProfileCount);
        commit(SET_LOAD, false)
      } catch (error) {
        commit(SET_LOAD, false)
        console.log(error)
        throw error
      }
    }
  },

  async [SELL_PORTFOLIO_ITEM]({dispatch, commit, state, rootState}, {item, sellItemCount}) {

    const {id, count, currentPrice} = item;

    const newProfileCount = state.count + sellItemCount * currentPrice;
    const currentPortfolioItemKey = (() => {
      const stock = state.stock;
      for (let key in stock) {
        if (stock[key].id === id) return key
      }
    })();

    if(sellItemCount < count) {
      try {
        await fb.database().ref(`users/${rootState.auth.uid}/stock/${currentPortfolioItemKey}/count`).set(count - sellItemCount);
        await fb.database().ref(`users/${rootState.auth.uid}/count`).set(newProfileCount);

        commit(SELL_PORTFOLIO_ITEM, {currentPortfolioItemKey, sellItemCount});
        await dispatch(SET_PORTFOLIO_HISTORY, new createHistorySellItem(item, sellItemCount));
        commit(SET_PORTFOLIO_COUNT, newProfileCount);

        commit(SET_LOAD, false)
      } catch (error) {
        commit(SET_LOAD, false)
        console.log(error)
      }
    } else {
      try {
        await fb.database().ref(`users/${rootState.auth.uid}/stock/${currentPortfolioItemKey}`).remove();
        await fb.database().ref(`users/${rootState.auth.uid}/count`).set(newProfileCount);

        commit(REMOVE_PORTFOLIO_ITEM, currentPortfolioItemKey);
        commit(SET_PORTFOLIO_COUNT, newProfileCount);
        await dispatch(SET_PORTFOLIO_HISTORY, new createHistorySellItem(item, sellItemCount));
        commit(SET_LOAD, false)
      } catch (error) {
        commit(SET_LOAD, false)
        console.log(error)
      }
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
