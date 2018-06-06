<template>
  <div class="portfolio">
    <stock-component v-for="item in portfolio" :data="item" :key="item.id" color="sell"></stock-component>
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
        portfolio: [{
          id: 1,
          name: 'BMW',
          price: 110,
        },{
          id: 2,
          name: 'Mers',
          price: 10,
        }]
      }
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
