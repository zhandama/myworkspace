/*
* @Author: tangxm
* @Date:   2017-10-11 16:57:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-18 12:23:16
*/
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations.js'
import common from './modules/common'

Vue.use(Vuex)
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
	  common
  },
  strict: process.env.NODE_ENV !== 'production'
})
