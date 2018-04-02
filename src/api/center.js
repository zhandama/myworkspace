import Vue from 'vue'

const vm = new Vue()
// 押金和冻结金
function brief () {
  return vm.$http.get('/api/frontend/user/account/brief')
}
// 绑定stream
function steamId () {
  return vm.$http.get('/api/frontend/user/steamUrl')
}
// 保存交易URL
function saveDeal (params) {
  return vm.$http.post('/api/frontend/user/saveDeal', params)
}
// 账号中心
function accountCenter (params) {
  return vm.$http.get('/api/frontend/statics/info', {params: params})
}
// 出售管理->数据统计
function dataStatistics (params) {
  return vm.$http.get('http://localhost:3000/saleData', {params: params})
}
// 出售管理->出售列表
function saleGoodsList (params) {
  return vm.$http.get('/api/frontend/selectGoods/selectGoodsOnSellBackge', {params: params})
}
// 出售管理->改价列表
function priceGoods (params) {
  return vm.$http.post('/api/frontend/selectGoods/select/price', params)
}

// 我的背包->改价列表
function mypriceGoods (params) {
  return vm.$http.post('/api/frontend/selectGoods/selectOnSell', params)
}
// 出售管理->修改价格
function changgoodsPrice (params) {
  return vm.$http.post('/api/frontend/changgoods/changeprice', params)
}
// 出售管理->下架接口
function offTheShelfGoods (params) {
  return vm.$http.post('/api/frontend/changgoods/offTheShelfGoods', params)
}
// 出售管理->出售记录
function saleRecord (params) {
  return vm.$http.get('/api/frontend/order/sell/list', {params: params})
}
// 出售管理->出售记录
function sellExport (params) {
  return vm.$http.get('/api/frontend/order/sell/list/export', {params: params})
}
// 求购管理->求购统计
function askToBuyData () {
  return vm.$http.get('http://localhost:3000/newAskToBuyData')
}
// 求购管理->求购列表
function search (params) {
  return vm.$http.post('/api/frontend/category/searchAll', params)
}
// 求购管理->正在求购列表
function page (params) {
  return vm.$http.get('/api/frontend/purchase/user/page', {params: params})
}
// 求购管理->取消求购
function finish (params) {
  return vm.$http.post('/api/frontend/purchase/user/finish', params)
}
// 求购管理->查看求购记录
function orderId (params) {
  return vm.$http.get(`/api/frontend/order/buy/${params}`)
}
// 我的背包->5173仓库
function warehouse (params) {
  return vm.$http.post('/api/frontend/search/searchSelfGoodsList', params)
}
// 我的背包->出售饰品芝麻信用
function credit () {
  return vm.$http.get('/api/frontend/user/credit')
}
// 我的背包->出售饰品芝麻信用返回false
function cache () {
  return vm.$http.post('/api/frontend/user/credit/cache')
}
// steam仓库列表
function steamWarehouse (params) {
  return vm.$http.get('/api/frontend/inventoryOrnament/inventoryOrnament', {params: params})
}
// steam仓库存入5173仓库
function deposit5173 (params) {
  return vm.$http.post('/api/frontend/inventoryOrnament/depositQuotation', params)
}
// 5173仓库取回steam仓库
function selectTakeOutOffer (params) {
  return vm.$http.get('/api/frontend/inventoryOrnament/selectTakeOutOffer', {params: params})
}
// 我的背包->循环
function selectOfferById (params) {
  return vm.$http.get('/api/frontend/inventoryOrnament/selectOfferById', {params: params})
}
// 我的背包->查询正在存入5173的商品
function selectGoodsStatusForStorage (params) {
  return vm.$http.get('/api/frontend/selectGoods/selectGoodsStatusForStorage', {params: params})
}
// 我的背包->出售列表
function selectCategoryByItrmId (params) {
  return vm.$http.post('/api/frontend/selectGoods/selectCategoryByItrmId', params)
}
// 我的背包->确认出售
function groundingGoods (params) {
  return vm.$http.post('/api/frontend/changgoods/groundingGoods', params)
}
// 查询取回中状态
function selectGoodsStatusforTakeOut (params) {
  return vm.$http.get('/api/frontend/selectGoods/selectGoodsStatusforTakeOut', {params: params})
}
// 5173仓库取回steam仓库
function withdrawAdapter (params) {
  return vm.$http.post('/api/frontend/inventoryOrnament/withdrawAdapter', params)
}
// 我的背包->交易链接
function tradeUrl () {
  return vm.$http.get('http://localhost:3000/tradeUrl')
}
// 我的背包->交易记录
function selectGoodsLogByUid (params) {
  return vm.$http.get('/api/frontend/selectGoods/selectGoodsLogByUid', {params: params})
}
// 安全中心
function securityCenter () {
  return vm.$http.get('/api/frontend/user/securityCenter')
}
// 磨损度
function selectAssertsfloat (params) {
  return vm.$http.post('/api/frontend/inventoryOrnament/selectAssertsfloat', params)
}
// 我的消息
function message (params) {
  return vm.$http.post('/api/frontend/message/list', params)
}
// 获取用户贝壳记录
function shellRecord (params) {
  return vm.$http.get('/api/frontend/prop/box/userRecord', {params: params})
}
function getLoading (params) {
  return vm.$http.get('/api/frontend/search/loading/' + params)
}
// 刷新steam库存
function refreshResult (params) {
  return vm.$http.get('/api/frontend/inventoryOrnament/refreshResult', {params: params})
}
// 在售列表查询
function warehouseSelling (params) {
  return vm.$http.get('/api/frontend/Personal/warehouse/selling', {params: params})
}
// 5173仓库列表
function warehouseList (params) {
  return vm.$http.get('/api/frontend/Personal/warehouse/list', {params: params})
}
// 刷新5173仓库列表
function refresh (params) {
  return vm.$http.get('/api/frontend/Personal/warehouse/refresh', {params: params})
}
// 刷新5173仓库列表
function gettemporary (params) {
  return vm.$http.get('/api/frontend/message/personal/temporary/STEAM_WAREHOUSING_STATUS', {params: params})
}
/* eslint-disable no-new */
export default {
  brief,
  steamId,
  saveDeal,
  accountCenter,
  dataStatistics,
  saleGoodsList,
  priceGoods,
  changgoodsPrice,
  offTheShelfGoods,
  saleRecord,
  askToBuyData,
  finish,
  warehouse,
  credit,
  cache,
  steamWarehouse,
  deposit5173,
  selectOfferById,
  selectCategoryByItrmId,
  groundingGoods,
  tradeUrl,
  selectGoodsStatusForStorage,
  selectGoodsLogByUid,
  withdrawAdapter,
  search,
  page,
  orderId,
  selectTakeOutOffer,
  securityCenter,
  selectAssertsfloat,
  selectGoodsStatusforTakeOut,
  message,
  mypriceGoods,
  shellRecord,
  getLoading,
  refreshResult,
  sellExport,
  warehouseSelling,
  warehouseList,
  refresh,
  gettemporary
}
