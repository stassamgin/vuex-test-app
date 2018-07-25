import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import Meta from 'vue-meta';
import * as fb from 'firebase';
import colors from 'vuetify/es5/util/colors'

import 'vuetify/dist/vuetify.min.css'

import store from "./store";
import router from './routes'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.darken1,
    secondary: colors.red.darken1,
  }
})
Vue.use(Meta)




//Vue.http.options.root = 'https://vue-test-project-d0932.firebaseio.com/';
//Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyAxCfONZB3rkIjsSPlxnVVlUOYw-kxeFcQ",
      authDomain: "vue-test-project-d0932.firebaseapp.com",
      databaseURL: "https://vue-test-project-d0932.firebaseio.com",
      projectId: "vue-test-project-d0932",
      storageBucket: "vue-test-project-d0932.appspot.com",
      messagingSenderId: "655706965811"
    });
  }

})
