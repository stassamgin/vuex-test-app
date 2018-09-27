<template>
  <div id="app">
    <v-app app>
      <base-navbar app />
      <v-container
        class="container__custom"
        text-xs-center
        app>
        <router-view />
      </v-container>
      <app-login v-if="isShowModal" />
    </v-app>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import baseNavbar from '@/components/baseNavbar';
import Login from '@/apps/auth/Login';
import { FETCH_PORTFOLIO } from '@/apps/portfolio/store/types';

export default {
  name: 'App',
  components: {
    baseNavbar,
    appLogin: Login,
  },
  computed: {
    ...mapGetters([
      'isAuth',
      'isShowModal',
    ]),
  },
  watch: {
    isAuth() {
      if (this.isAuth) this.$store.dispatch(FETCH_PORTFOLIO);
    },
  },
  created() {
    if (this.isAuth) this.$store.dispatch(FETCH_PORTFOLIO);
    this.$store.dispatch('getStartStocksValue');
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container__custom {
  padding-top: 100px;
}
</style>
