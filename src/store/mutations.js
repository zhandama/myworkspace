/*
* @Author: tangxm
* @Date:   2017-10-20 14:06:55
* @Last Modified by:   tangxm
* @Last Modified time: 2017-10-30 22:10:50
*/
export default {
  setAccountInfo (state, info) {
    state.steamPlayerInfo = info.steamPlayerInfo
    state.accountInfo = info.stmUsers
  },
  setLoginstatus (state, val) {
    state.isLogin = val
  }
}
