import Vue from 'vue';
import { PRICE_GENERATOR } from './types';

export default {
    randomPriseGenerateAction({commit, state}) {

        const prices = JSON.parse(JSON.stringify(state.offers));
        prices.map( item => {
            let {price} = item;
            const value = Math.floor(Math.random() * 10);
            Math.random() > 0.5 ? price += value : price -= value;
            if(price < 0) price = 0;
            return Object.assign(item, {price})
        })

        Vue.http.put('offers.json', prices)
            .then(response => {
                commit(PRICE_GENERATOR, prices)
            }, error => {console.log('error--', error)})
    },

    getStartStocksValue({commit}) {
        Vue.http.get('offers.json')
            .then(resp => resp.json())
            .then(offers => {
              console.log('fromServer', offers)
                commit(PRICE_GENERATOR, offers)
            } )
    }
}
