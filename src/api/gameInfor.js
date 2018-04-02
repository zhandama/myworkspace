import Vue from 'vue'

const vm = new Vue()
// 全部新闻
function gameInfors (params) {
  return vm.$http.post('/api/frontend/information/list', params)
}
// 新闻详情
function gameInforsXq (params) {
  return vm.$http.get('/api/frontend/information/informationInfo', {params: params})
}
// 点赞
function like (params) {
  return vm.$http.post('/api/frontend/information/praise', params)
}
// 判断是否点赞
function isLike (params) {
  return vm.$http.get('/api/frontend/information/isPraise', {params: params})
}
// 热门新闻
function hotInfors (params) {
  return vm.$http.get('http://localhost:3000/gameInforLists', {params: params})
}
// 帮助左侧列表
function helpList (params) {
  return vm.$http.get('/api/frontend/helpcenter/list', {params: params})
}
// 帮助详情
function helpDetail (params) {
  return vm.$http.get('/api/frontend/helpcenter/detail', {params: params})
}
// 留言分类
function types (params) {
  return vm.$http.get('/api/frontend/feedback/types', {params: params})
}
// 留言接口
function submit (params) {
  return vm.$http.post('/api/frontend/feedback/submit', params)
}
/* eslint-disable no-new */
export default {
  gameInfors,
  gameInforsXq,
  like,
  isLike,
  hotInfors,
  helpList,
  helpDetail,
  types,
  submit
}
