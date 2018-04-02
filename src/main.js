// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueBus from 'vue-bus'
import store from './store'
import Axios from './http.js'
import api from 'api'
import VueLazyload from 'vue-lazyload'
import {CONFIG} from './common/index.js' // 获取配置信息
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.gameList = {}
Vue.use(CONFIG)
Vue.use(Vuex)
Vue.use(VueBus)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    api.getUserInfo()
    .then((res) => {
      if (res && res.status === 200) {
        router.app.$store.commit('setAccountInfo', res.data)
        router.app.$store.commit('setLoginstatus', true)
        next()
      } else {
        location.href = `https://passport.5173.com/m?returnUrl=${encodeURIComponent(location.href)}`
      }
    }, (error) => {
      location.href = `https://passport.5173.com/m?returnUrl=${encodeURIComponent(location.href)}`
      return Promise.reject(error)
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

// 路由跳转scrollTop 归 0
router.afterEach((to, from, next) => {
  if (to.name !== 'goodsList' && to.name !== 'goodsDetail') {
    window.scrollTo(0, 1)
  }
})
