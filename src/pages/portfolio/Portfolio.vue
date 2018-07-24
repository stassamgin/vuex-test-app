<template>
  <div class="portfolio">
    <stock-component
            v-for="item in portfolio"
            :data="item"
            :key="item.id"
            :clickEvent="sellItems"
            eventType="sell"
    ></stock-component>
  </div>
</template>

<script>
  import StockComponent from '../stockComponent/StockComponent'

  export default {
    name: "portfolio",
    components: {
      StockComponent
    },
    data() {
      return {
        portfolio: []
      }
    },
    methods: {
        sellItems(eventData) {
            this.$store.dispatch('sellPortfolioItemAction', eventData)
        }
    },
    computed: {
        getPortfolio() {
            this.portfolio = this.$store.getters.getPortfolio
        }
    },
    created() {
        this.portfolio = this.$store.getters.getPortfolio
    }

  }
</script>

<style scoped>

  .portfolio {
    padding: 30px 30px;
    display: flex;
    flex-flow: row wrap;
  }

</style>
