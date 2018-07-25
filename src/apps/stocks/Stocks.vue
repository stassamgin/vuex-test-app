<template>
  <div class="stocks">
    <stock-component
            v-for="item in getOffers"
            :data="item"
            :key="item.id"
            :clickEvent="buyOfferedItem"
            eventType="buy"
    ></stock-component>
  </div>
</template>

<script>
  import StockComponent from '@/components/baseStockComponent';

  export default {
    name: "stocks",
    components: {
      StockComponent
    },
    methods: {
      buyOfferedItem(eventData) {
          this.$store.dispatch('buyPortfolioItemAction', eventData)
      }
    },
    computed: {
        getOffers() {
            return this.$store.getters.getOffers
        }
    },
  }
</script>

<style scoped>

  .stocks {
    padding: 30px 30px;
    display: flex;
    flex-flow: row wrap;
  }

</style>
