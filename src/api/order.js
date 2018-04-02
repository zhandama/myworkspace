/*
* @Author: fredlee
* @Date:   2017-10-31 13:56:39
* @Last Modified by:   fredlee
* @Last Modified time: 2017-11-14 12:20:48
*/
import Vue from 'vue'

const vm = new Vue()

function createdOrder (params) {
  return vm.$http.post('/api/frontend/order/', params)
}
function getRecords (params) {
  return vm.$http.get('/api/frontend/order/records', {params: params})
}
function payment (orderId) {
  return vm.$http.post(`/api/frontend/order/payment/${orderId}`)
}
function getOrderInfo (orderId) {
  return vm.$http.get(`/api/frontend/order/buy/info/${orderId}`)
}
function getBuyList (params) {
  return vm.$http.get('/api/frontend/order/buy/all', {params: params})
}
function deleteOrder (orderId) {
  return vm.$http.post(`/api/frontend/order/buy/cancel/${orderId}`)
}
export default {
  createdOrder,
  getRecords,
  payment,
  getOrderInfo,
  getBuyList,
  deleteOrder
}
