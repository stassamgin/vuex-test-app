<template>
  <div id="app">
      <v-app>
        <v-toolbar app>
            <v-layout class="navbar" justify-space-between align-center>
              <div class="logo-block">
                <router-link tag="div" to="/">
                  <div class="logo">
                    <img src="./assets/logo.png">
                    <span>- stock</span>
                  </div>
                </router-link>
                <nav class="nav">
                  <router-link tag="v-btn" to="/portfolio">Portfolio</router-link>
                  <router-link tag="v-btn" to="/stocks">Stocks</router-link>
                </nav>
              </div>
              <div class="data">
                <v-btn color="primary" @click.prevent="endDay">End Day</v-btn>
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
                  Funds: {{getTotalCounter}}
                </div>
              </div>
            </v-layout>
        </v-toolbar>
        <router-view></router-view>
      </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      count: 10000
    }
  },
  computed: {
      getTotalCounter() {
          return this.$store.getters.getTotalCounter
      }
  },
  methods: {
      endDay() {
          this.$store.commit('pseudoRandomPriceGenerator')
      }
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
