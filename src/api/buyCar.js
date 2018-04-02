/*
* @Author: fredlee
* @Date:   2017-10-18 14:32:05
* @Last Modified by:   fredlee
* @Last Modified time: 2017-10-30 20:00:39
*/
import Vue from 'vue'

const vm = new Vue()

function getCarList (params) {
  return vm.$http.get('/api/frontend/shoppingcart/list', {params: params})
}
function deleteCart (params) {
  return vm.$http.delete(`/api/frontend/shoppingcart/${params}`)
}
function deleteCartAll () {
  return vm.$http.delete('/api/frontend/shoppingcart/list')
}
export default {
  getCarList,
  deleteCart,
  deleteCartAll
}
