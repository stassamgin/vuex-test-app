import {
  BUE_PORTFOLIO_ITEM,
  SELL_PORTFOLIO_ITEM,
  SET_PORTFOLIO_STOCK,
  SET_PORTFOLIO_HISTORY,
  SET_PORTFOLIO_COUNT,
  FETCH_PORTFOLIO,
} from './types';

export const state = {
  stock: [],
  history: [],
  count: null,
};

export const getters = {
  getPortfolio(state) {
    return state.stock
  }
};

export const mutations =  {
  'SET_PORTFOLIO_ITEM' (state, {count, eventType, name, price}) {
    if (eventType === 'sell') {
      const item = state.stock.find(item => item.name === name)
      item.count -= Number(count)
      if (item.count < 1) state.stock.splice(state.stock.indexOf(item), 1)
    }
    if (eventType === 'buy') {
      if(state.stock.some(item => item.name === name)) {
        const currentItem = state.stock.find(item => item.name === name);
        currentItem.price = Math.round(
          (currentItem.price * currentItem.count + Number(price) * Number(count))/(currentItem.count + Number(count)))
        currentItem.count += Number(count)
      } else {
        state.stock.push({
          id: state.stock.length === 0 ? 0 : state.stock[state.stock.length - 1].id + 1,
          name,
          count: Number(count),
          price: Number(price)
        })
      }
    }
  }
};

export const actions = {
  buyPortfolioItemAction({commit, state, rootState}, {count, eventType, data:{name, price}}) {
    if(Number(price) * Number(count) > rootState.total) return
    commit('setTotalCounter', {price, count, eventType})
    commit('SET_PORTFOLIO_ITEM', {count, eventType, name, price})
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
