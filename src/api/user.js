/*
* @Author: fredlee
* @Date:   2017-10-18 14:32:05
* @Last Modified by:   fredlee
* @Last Modified time: 2017-10-30 20:00:39
*/
import Vue from 'vue'

const vm = new Vue()
// 滑动验证码
function getSliderLength (params) {
  return vm.$http.get('/api/frontend/sms/getSliderLength', {params: params})
}
// 用户登陆
function loginByAccount (params) {
  return vm.$http.post('/api/frontend/user/loginByAccount', params)
}
// 判断用户是否账号密码错误-用于显示登陆验证码
function checkUserLogin (params) {
  return vm.$http.get('/api/frontend/user/checkUserLogin', {params: params})
}
function mainLoginUrl (params) {
  return vm.$http.post('/api/frontend/sms/sendMobileCodeSlider', params)
}

// 用户注册账号密码+手机号
function register (params) {
  return vm.$http.post('/api/frontend/user/register', params)
}

// 手机号注册
function quickReg (params) {
  return vm.$http.post('/api/frontend/user/quickReg', params)
}

function sendMobileCodeSlider (params) {
  return vm.$http.post('/api/frontend/sms/sendMobileCodeSlider', params)
}
function userBindMobile (params) {
  return vm.$http.post('/api/frontend/user/userBindMobile', params)
}
export default {
  getSliderLength,
  loginByAccount,
  checkUserLogin,
  mainLoginUrl,
  register,
  sendMobileCodeSlider,
  userBindMobile,
  quickReg
}
