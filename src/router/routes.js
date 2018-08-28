import VueRouter from 'vue-router'
import Home from '@/apps/Home'
import Portfolio from '@/apps/portfolio/Portfolio'
import History from '@/apps/history/History'
import Guards from './guards'



export default new VueRouter({
routes: [
  {
    path: '',
    component: Home
  },
  {
    path: '/portfolio',
    component: Portfolio,
    name: 'portfolio',
    beforeEnter: Guards
  },
  {
    path: '/history',
    component: History,
    name: 'history',
    beforeEnter: Guards
  },
  {
    path: '*',
    redirect: '/',
  }
],
  mode: 'history'
})
