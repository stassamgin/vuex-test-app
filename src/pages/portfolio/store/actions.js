export default {
    buyPortfolioItemAction({commit, state, rootState}, {count, eventType, data:{name, price}}) {
        if(Number(price) * Number(count) > rootState.total) return
        commit('setTotalCounter', {price, count, eventType})
        commit('SET_PORTFOLIO_ITEM', {count, eventType, name, price})
    },
    sellPortfolioItemAction({commit, state, rootState}, {count, eventType, data:{name}}) {

        if(Number(count) > state.portfolio.find(item => item.name === name).count) return
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
}
