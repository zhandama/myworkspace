/*
* @Author: tangxm
* @Date:   2017-10-11 16:58:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-07 14:01:23
*/
import * as type from './type.js'
import api from 'api'

export default {
  [type.GET_USER] ({commit}) {
    api.getUserInfo(new Date().getTime()).then((res) => {
      if (res && res.status === 200) {
        commit('setAccountInfo', res.data)
        commit('setLoginstatus', true)
      }
    }, (error) => {
      commit('setAccountInfo', {})
      commit('setLoginstatus', false)
      return Promise.reject(error)
    })
  }
}
