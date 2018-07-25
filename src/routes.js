import VueRouter from 'vue-router'
import Home from '@/apps/Home'
import Portfolio from '@/apps/portfolio/Portfolio'
// import History from '@/apps/history/History'



export default new VueRouter({
routes: [
  {
    path: '',
    component: Home
  },
  {
    path: '/portfolio',
    component: Portfolio,
    name: 'portfolio'
  },
  {
    path: '/history',
    // component: History,
    name: 'history'
  }
],
  mode: 'history'
})
