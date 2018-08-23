<template>
  <div class="portfolio">
    <portfolio-item
            v-for="item in portfolioStock"
            :data="item"
            :key="item.id"
    ></portfolio-item>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PortfolioItem from './portfolioItem';

  export default {
    name: "portfolio",
    metaInfo: {
      title: 'v-stock - Portfolio',
    },
    components: {
      PortfolioItem
    },
    computed: {
      ...mapGetters(['portfolioStock']),
    },
  }
</script>

<style scoped>
  .portfolio {
    padding: 30px 30px;
    display: flex;
    flex-flow: row wrap;
  }
</style>
