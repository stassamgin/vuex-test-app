import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

import store from "./store";
import router from './routes'
import App from './App.vue'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
