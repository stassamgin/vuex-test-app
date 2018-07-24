import { PRICE_GENERATOR } from './types';

export default {
    [PRICE_GENERATOR] (state, newOffers) {
        state.offers = newOffers
    }
}
