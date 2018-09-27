<template>
  <v-layout>
    <appStocks />
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import Stocks from '@/apps/stocks/Stocks';
import {
  SHOW_MODAL,
} from '@/store/types';

export default {
  name: 'Home',
  metaInfo: {
    title: 'v-stock - Home',
  },
  components: {
    appStocks: Stocks,
  },
  methods: {
    ...mapMutations([SHOW_MODAL]),
  },
  created() {
    if (this.$route.query.showLogin) {
      this.$router.push('/');
      this.SHOW_MODAL(true);
    }
  },
};
</script>

<style scoped>

</style>
