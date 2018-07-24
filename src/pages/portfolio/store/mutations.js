export default {
    'SET_PORTFOLIO_ITEM' (state, {count, eventType, name, price}) {
        if (eventType === 'sell') {
            const item = state.portfolio.find(item => item.name === name)
            item.count -= Number(count)
            if (item.count < 1) state.portfolio.splice(state.portfolio.indexOf(item), 1)
        }
        if (eventType === 'buy') {
            if(state.portfolio.some(item => item.name === name)) {
                const currentItem = state.portfolio.find(item => item.name === name);
                currentItem.price = Math.round(
                    (currentItem.price * currentItem.count + Number(price) * Number(count))/(currentItem.count + Number(count)))
                currentItem.count += Number(count)
            } else {
                state.portfolio.push({
                    id: state.portfolio.length === 0 ? 0 : state.portfolio[state.portfolio.length - 1].id + 1,
                    name,
                    count: Number(count),
                    price: Number(price)
                })
            }
        }
    }
}
