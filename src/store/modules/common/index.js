/*
* @Author: tangxm
* @Date:   2017-10-13 10:42:34
 * @Last Modified by: tangxm
 * @Last Modified time: 2017-12-15 10:36:02
*/

import * as type from './type.js'
import api from 'api'

const state = {
  shoppingCount: 0,
  gameList: []
}

const mutations = {
  setShoppingCount (state, val) {
    state.shoppingCount = val
  },
  setGameList: (state, list) => {
    state.gameList = list
  }
}

const actions = {
  [type.GET_SHOPPING_COUNT] ({commit}) {
    api.home.getShoppingCount(new Date().getTime()).then((res) => {
      if (res.status === 200) {
        commit('setShoppingCount', res.data)
      };
    }, error =>{
      commit('setShoppingCount', 0)
    })
  },
  [type.GET_GAMES] ({commit}, params) {
    api.header.getGames(params)
    .then((res) => {
      commit('setGameList', res)
    })
  }
}

/* eslint-disable no-new */
export default {
  state,
  mutations,
  actions
}
