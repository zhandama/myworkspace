/*
* @Author: fredlee
* @Date:   2017-10-12 15:16:17
* @Last Modified by:   fredlee
* @Last Modified time: 2017-11-17 11:59:08
*/

import Vue from 'vue'

const vm = new Vue()

function getGames (params) {
  return new Promise((resolve, reject) => {
    vm.$http.get('/api/frontend/category/games').then((res) => {
      if (res && res.data) {
        resolve(res.data)
      }
    }, (error) => {
      reject(error)
    })
  })
}

// function getUser (params) {
//   return vm.$http.get('http://localhost:3000/userInfo', {params: params})
// }
function getMessageCount (params) {
  return vm.$http.post('/api/frontend/message/count', params)
}
function clearMessage () {
  return vm.$http.post('/api/frontend/message/clear')
}
function getMessageList (params) {
  return vm.$http.post('/api/frontend/message/list', params)
}
function getMyMessageList (params) {
  return vm.$http.post('/api/frontend/message/personal/list', params)
}
function getMyunusedMessageList () {
  return vm.$http.get('/api/frontend/message/personal/count')
}
function readPersonalMsg (params) {
  return vm.$http.post('/api/frontend/message/personal/' + params)
}
/* eslint-disable no-new */
export default {
  getGames,
  getMessageCount,
  clearMessage,
  getMessageList,
  getMyMessageList,
  getMyunusedMessageList,
  readPersonalMsg
}
