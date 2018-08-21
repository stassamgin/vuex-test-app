<template>
  <div id="app">
      <v-app app>
        <base-navbar app />
        <v-container text-xs-center app>
          <router-view />
        </v-container>
        <app-login v-if="isShowModal" />
      </v-app>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import baseNavbar from '@/components/baseNavbar'
import Login from '@/apps/auth/Login'


export default {
  name: 'app',
  components: {
    baseNavbar,
    appLogin: Login,
  },
  computed: {
    ...mapGetters([
      'getTotalCounter',
      'isShowModal'
    ]),
  },
  methods: {
    ...mapActions({
      endDay: 'randomPriseGenerateAction',
    }),
  },
  created() {
    this.$store.dispatch('getStartTotalValue')
    this.$store.dispatch('getStartStocksValue')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
