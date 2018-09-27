<template>
  <v-toolbar app>
    <v-layout
      class="navbar"
      justify-space-between
      align-center>
      <div class="logo-block">
        <router-link
          tag="div"
          to="/">
          <div class="logo">
            <img src="@/assets/logo.png">
            <span>- stock</span>
          </div>
        </router-link>
        <v-btn
          class="ml-4"
          color="secondary"
          left
          @click.prevent="endDay"
        >
          End Day
        </v-btn>
      </div>
      <div
        v-if="!isAuth"
        class="data">
        <v-btn
          color="primary"
          @click="SHOW_MODAL(true)" >
          <v-icon left>person</v-icon>
          Login
        </v-btn>
      </div>
      <div
        v-else
        class="data">
        <nav class="nav">
          <router-link
            tag="v-btn"
            to="/portfolio">Portfolio</router-link>
          <router-link
            tag="v-btn"
            to="/history">History</router-link>
        </nav>
        <v-menu offset-y>
          <v-btn slot="activator">Save & Load</v-btn>
          <v-list>
            <v-list-tile @click="{}">
              <v-list-tile-title>Save Data</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="{}">
              <v-list-tile-title>Load Data</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn
          color="primary"
          @click="logoutHandler" >
          <v-icon left>input</v-icon>
          Logout
        </v-btn>
        <div
          v-if="portfolioCount"
          class="counter">
          Funds: {{ portfolioCount }} $
        </div>
      </div>
    </v-layout>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { LOGOUT_USER } from '@/apps/auth/store/types';
import {
  SHOW_MODAL,
} from '@/store/types';

export default {
  name: 'BaseNavbar',
  computed: {
    ...mapGetters(['isAuth', 'portfolioCount']),
  },
  methods: {
    ...mapActions({
      endDay: 'randomPriseGenerateAction',
    }),
    ...mapMutations([SHOW_MODAL, LOGOUT_USER]),
    logoutHandler() {
      this.$router.push('/');
      this.LOGOUT_USER();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 30px;
  min-width: 100px;
}

.counter {
  margin-left: 30px;
  color: #666;
  font-weight: bold;
  font-size: 18px;
}

.nav {
  margin-left: 10px;
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
