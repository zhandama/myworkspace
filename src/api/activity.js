/*
* @Author: fredlee
* @Date:   2017-10-18 14:32:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-20 10:41:36
*/
import Vue from 'vue'

const vm = new Vue()

function key (params) {
  return vm.$http.get('/api/frontend/user/prop/key', {params: params})
}
function open (params) {
  return vm.$http.post('/api/frontend/prop/box/open', params)
}
function create (params) {
  return vm.$http.post('/api/frontend/prop/order/create', params)
}
function pay (params) {
  return vm.$http.get('/api/frontend/prop/order/pay', {params: params})
}
function detail (params) {
  return vm.$http.get('/api/frontend/prop/order/detail', {params: params})
}
function winRecord (params) {
  return vm.$http.get('/api/frontend/prop/box/winRecord', {params: params})
}
function boxRecord (params) {
  return vm.$http.get('/api/frontend/prop/box/boxRecord', {params: params})
}
function userKeyRecord (params) {
  return vm.$http.get('/api/frontend/prop/box/userKeyRecord', {params: params})
}
function getFreeList (params) {
  return vm.$http.post('/api/frontend/activity/fastend/list', params)
}
function getHotFreeList (params) {
  return vm.$http.post('/api/frontend/activity/fastend/hot', params)
}
function buyFreeapi (params) {
  return vm.$http.post('/api/frontend/activity/fastend/buy', params)
}
function freeDetailapi (params) {
  return vm.$http.post('/api/frontend/activity/fastend/info/', params)
}
function getinUserListapi (params) {
  return vm.$http.post('/api/frontend/activity/fastend/join/users', params)
}
function indexFreeListapi (params) {
  return vm.$http.post('/api/frontend/activity/fastend/main', params)
}
function getIgetinList (params) {
  return vm.$http.post('/api/frontend/activity/fastend/user', params)
}
function getFreelogList (params) {
  return vm.$http.post('/api/frontend/activity/fastend/log', params)
}
export default {
  key,
  open,
  create,
  pay,
  winRecord,
  boxRecord,
  detail,
  userKeyRecord,
  getFreeList,
  getHotFreeList,
  buyFreeapi,
  freeDetailapi,
  getinUserListapi,
  indexFreeListapi,
  getIgetinList,
  getFreelogList
}
