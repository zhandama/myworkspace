/*
* @Author: fredlee
* @Date:   2017-10-12 15:15:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-18 13:33:04
*/
import header from './header.js'
import home from './home.js'
import gameInfor from './gameInfor.js'
import goods from './goods.js'
import center from './center.js'
import buyCar from './buyCar.js'
import order from './order.js'
import activity from './activity.js'
import user from './user.js'
import Vue from 'vue'

const vm = new Vue()

function getUserInfo (params) {
  return vm.$http.get('/api/frontend/user/userInfo', {params: params})
}
function login (params) {
  return vm.$http.get('/api/frontend/user/login', {params: params})
}
function logout (params) {
  return vm.$http.get('/api/frontend/user/logout', {params: params})
}
export default {
  getUserInfo,
  login,
  header,
  home,
  gameInfor,
  goods,
  center,
  buyCar,
  order,
  logout,
  activity,
  user
}
