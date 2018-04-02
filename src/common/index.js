/*
* @Author: fredlee
* @Date:   2017-10-31 17:45:51
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-11 17:17:35
*/
import api from 'api'

const CONFIG = {}
CONFIG.install = async (Vue) => {
  Vue.prototype.imgUrl = 'http://skins-image.5173.com/'  // 'skins-image-test.oss-cn-hangzhou.aliyuncs.com'
  // Vue.prototype.imgUrl = 'http://skins-image-test.oss-cn-hangzhou.aliyuncs.com/'
  Vue.prototype.gameList = await gameList()
  Vue.prototype.big_user = 'runemaster'
}

// 获取游戏列表
async function gameList () {
  return new Promise((resolve, reject) => {
    api.header.getGames().then((res) => {
      resolve(res) 
    }, (err) => {
      reject(err)
    })
  })
}
export {CONFIG}

export const isLogin = (islogin) => {
  if (!islogin) {
    location.href = `https://passport.5173.com/m?returnUrl=${encodeURIComponent(location.href)}`
    return false
  };
  return true
}
