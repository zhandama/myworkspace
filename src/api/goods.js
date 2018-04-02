/*
* @Author: fredlee
* @Date:   2017-10-16 16:32:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-27 11:21:17
*/
import Vue from 'vue'

const vm = new Vue()

function getCategoryList (params) {
  return vm.$http.get('/api/frontend/category/property/'+ params.appName)
}
function getCSGOCategoryList (params) {
  return vm.$http.get('/api/frontend/category/property/csgo', {params: params})
}

function getDotaCategoryList (params) {
  return vm.$http.get('/api/frontend/category/property/dota2', {params: params})
}
function getPUBGCategoryList (params) {
  return vm.$http.get('/api/frontend/category/property/pubg', {params: params})
}
function getItemsList (params) {
  return vm.$http.post('/api/frontend/category/search', params)
}
function getGoodsDetail (params) {
  return vm.$http.post('/api/frontend/category/categoryprice', params)
}
function searchGoodsList (params) {
  return vm.$http.post('/api/frontend/search/searchGoodsList', params)
}
function searchLoading (params) {
  return vm.$http.get('/api/frontend/search/loading/' + params)
}
function publish (params) {
  return vm.$http.post('/api/frontend/purchase/user/publish', params)
}
function getOne (params) {
  return vm.$http.get('/api/frontend/purchase/user/one', {params: params})
}
// function getBuyList (params) {
//   return vm.$http.get('/api/frontend/purchase/page', {params: params})
// }
function addShoppingCar (params) {
  return vm.$http.post('/api/frontend/shoppingcart/', params)
}
function selectStock (params) {
  return vm.$http.get('/api/frontend/selectGoods/selectStock', {params: params})
}
function selectSelfInventory (params) {
  return vm.$http.post('/api/frontend/selectGoods/selectSelfInventory', params)
}
function hotsearchlist (params) {
  return vm.$http.get('/api/frontend/hot/search/list', {params: params})
}
function hotsearchlog (params) {
  return vm.$http.post('/api/frontend/hot/search/log', params)
}
export default{
  getCategoryList,
  getCSGOCategoryList,
  getDotaCategoryList,
  getPUBGCategoryList,
  getItemsList,
  getGoodsDetail,
  searchGoodsList,
  publish,
  // getBuyList,
  getOne,
  addShoppingCar,
  selectStock,
  selectSelfInventory,
  searchLoading,
  hotsearchlist,
  hotsearchlog
}
