/*
* @Author: fredlee
* @Date:   2017-10-13 10:46:55
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-15 13:14:17
*/
import Vue from 'vue'

const vm = new Vue()

function getBannerList (params) {
  return vm.$http.get('/api/frontend/banner/list', {params: params})
}
function getGoodsList (params) {
  return vm.$http.post('/api/frontend/category/list', params)
}
function getGoodsRecentList (params) {
  return vm.$http.get('/api/frontend/game/recent/transactionList/' + params)
}
function getShoppingCount (params) {
  return vm.$http.get('/api/frontend/shoppingcart/count', {params: params})
}

export default {
  getBannerList,
  getGoodsList,
  getShoppingCount,
  getGoodsRecentList
}
