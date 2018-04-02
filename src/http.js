/*
* @Author: fredlee
* @Date:   2017-10-19 11:09:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-01-19 14:33:40
*/
import axios from 'axios'
import Vue from 'vue'

const vm = new Vue()

// 请求前的拦截
axios.interceptors.request.use(config => {
  return config
}, error => {
  vm.$Message.error('这是一条错误信息', error)
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  return data
}, error => {
  if (error.response && error.response) {
    let data = error.response.data
    if (error.response.data.prefix === 'STM_USERS' && (error.response.data.code === 101 ||
                                                       error.response.data.code === 115 ||
                                                       error.response.data.code === 112 ||
                                                       error.response.data.code === 116 ||
                                                       error.response.data.code === 113)) {
      return Promise.reject(data)
    };
    // if (error.response.data.prefix === 'ORDER' || error.response.data.prefix === 'PURCHASE') {
    //   return Promise.reject(data)
    // };
    if (error.response.data.prefix === 'UNKNOWN' && error.response.data.code === 500) {
      return Promise.reject(data)
    };
    if (error.response.data.prefix === 'STM_PROPERTY' && (error.response.data.code === 102 ||
                                                          error.response.data.code === 116 ||
                                                          error.response.data.code === 105 ||
                                                          error.response.data.code === 119)) {
      return Promise.reject(data)
    };
    if (error.response.data.prefix === 'STM_GOODS' && (
                                                       error.response.data.code === 116||
                                                       error.response.data.code === 128||
                                                       error.response.data.code === 119)) {
      return Promise.reject(data)
    };
    let data1 = ''
    if (typeof data === 'string') {
      data1 = data
    } else {
      data1 = data.message
    }
    if (data1 !== 'Bad Request' && data1.indexOf('服务') === -1 && !/^[\w\s]+$/.test(data1)) {
      vm.$toast(data1);
      // if ((error.response.data.prefix === 'SHOPPING_CART' && error.response.data.code === 103) || (error.response.data.prefix === 'STM_GOODS' && error.response.data.code === 124) || (error.response.data.prefix === 'STM_GOODS' && error.response.data.code === 111)) {
      //   vm.$Dialog.show({
      //     content: data1,
      //     successButton: false,
      //     class: '',
      //     autofade: true,
      //     errorButton: false
      //   })
      // } else {
      //   vm.$Dialog.show({
      //     content: data1,
      //     successText: '朕知道了',
      //     class: '',
      //     autofade: true,
      //     autofadeTime: 2000,
      //     errorButton: false
      //   })
      // }
    }
    return Promise.reject(data)
  };
})

export default axios
