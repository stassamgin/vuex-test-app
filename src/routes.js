import VueRouter from 'vue-router'
import Home from './pages/Home'
import Portfolio from './pages/portfolio/Portfolio'
import Stocks from './pages/stocks/Stocks'



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
    path: '/stocks',
    component: Stocks,
    name: 'stocks'
  }
],
  mode: 'history'
})
