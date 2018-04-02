import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {goodsRoute} from './goodsRoute.js'
import {bagRoute} from './bag.js'
import {userRoute} from './user.js'
import {purchaseRoute} from './purchase.js'
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'home')
const shoppingCar = r => require.ensure([], () => r(require('@/components/common/shopCar.vue')), 'shoppingCar')

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home,
      children: [
        {
          path: '/index.html',
          component:Home
        }
      ],
      meta: {requireAuth: false}
    },
    {
      path: '/shoppingCar',
      name: 'shoppingCar',
      component:shoppingCar,
      children: [
        {
          path: '',
          component:shoppingCar
        }
      ],
      meta: {requireAuth: true}
    },
    goodsRoute,
    bagRoute,
    userRoute,
    purchaseRoute
  ]
})
