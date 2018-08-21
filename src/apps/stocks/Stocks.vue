<template>
  <div class="stocks">
    <stock-item
            v-for="item in getOffers"
            :data="item"
            :key="item.id"
    ></stock-item>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import StockItem from './stockItem';

  export default {
    name: "stocks",
    components: {
      StockItem
    },
    computed: {
      ...mapGetters(['getOffers']),
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
