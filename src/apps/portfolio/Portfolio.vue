<template>
  <div class="portfolio">
    <template v-if="portfolioStockChecker">
      <portfolio-item
        v-for="item in portfolioStock"
        :data="item"
        :key="item.id" />
    </template>
    <div
      v-else
      class="portfolio__description">
      Sorry you still don't have any stocks
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PortfolioItem from './portfolioItem';

export default {
  name: 'Portfolio',
  metaInfo: {
    title: 'v-stock - Portfolio',
  },
  components: {
    PortfolioItem,
  },
  computed: {
    ...mapGetters(['portfolioStock']),

    portfolioStockChecker() {
      if (!this.portfolioStock || this.portfolioStock.length === 0) return false;
      return true;
    },
  },
};
</script>

<style scoped>
  .portfolio {
    padding: 30px 30px;
    display: flex;
    flex-flow: row wrap;
  }

  .portfolio__description {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #999;
  }
</style>
