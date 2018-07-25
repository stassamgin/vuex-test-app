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

.navbar {
  padding: 0 40px;
}

.counter {
  margin-right: 20px;
  margin-left: 50px;
  color: #666;
  font-weight: bold;
  font-size: 18px;
}

.nav {
  margin-left: 50px;
}

.data {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  height: 50px;
  display: flex;
  align-items: center;
  color: #999;
  font-weight: bold;

  img {
    max-height: 100%;
  }

  span {
    transform: translateX(-4px);
    font-size: 18px;
  }

  &-block {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
