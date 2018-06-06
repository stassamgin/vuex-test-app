<template>
  <div class="stocks">
    <stock-component v-for="item in stocks" :data="item" :key="item.id"></stock-component>
  </div>
</template>

<script>
  import StockComponent from '../stockComponent/StockComponent'

  export default {
    name: "stocks",
    components: {
      StockComponent
    },
    data() {
      return {
        stocks: [{
          id: 1,
          name: 'BMW',
          price: 110,
        },{
          id: 2,
          name: 'Mers',
          price: 10,
        },{
          id: 3,
          name: 'Vaz',
          price: 2110,
        }]
      }
    }

  }
</script>

<style scoped>

  .stocks {
    padding: 30px 30px;
    display: flex;
    flex-flow: row wrap;
  }

</style>
