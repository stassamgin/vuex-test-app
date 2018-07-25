<template>
  <v-layout>
    <appStocks />
  </v-layout>
</template>

<script>
  import Stocks from '@/apps/stocks/Stocks'

  export default {
    name: "home",
    metaInfo: {
      title: 'v-stock - Home',
    },
    components: {
      appStocks: Stocks,
    }
  }
</script>

<style scoped>

</style>
