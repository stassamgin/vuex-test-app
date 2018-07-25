<template>
  <v-toolbar app>
    <v-layout class="navbar" justify-space-between align-center>
      <div class="logo-block">
        <router-link tag="div" to="/">
          <div class="logo">
            <img src="@/assets/logo.png">
            <span>- stock</span>
          </div>
        </router-link>
        <v-btn
          class="ml-5"
          color="secondary"
          left
          @click.prevent="endDay"
        >
          End Day
        </v-btn>
      </div>
      <div class="data" v-if="!isAuth">
          <v-btn
            @click="SHOW_MODAL(true)"
            color="primary"          >
            <v-icon left>person</v-icon>
            Login
          </v-btn>
      </div>
      <div class="data" v-else>
        <nav class="nav">
          <router-link tag="v-btn" to="/portfolio">Portfolio</router-link>
          <router-link tag="v-btn" to="/history">History</router-link>
        </nav>
        <v-menu offset-y>
          <v-btn slot="activator">Save & Load</v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Save Data</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Load Data</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <div class="counter">
          Funds: 54
        </div>
      </div>
    </v-layout>
  </v-toolbar>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';

  import {
    SHOW_MODAL
  } from '@/store/types';

  export default {
    name: "baseNavbar",
    computed: {
      ...mapGetters(['isAuth']),
    },
    methods: {
      ...mapActions({
        endDay: 'randomPriseGenerateAction',
      }),
      ...mapMutations([SHOW_MODAL,])
    },
  }
</script>

<style scoped>

</style>
