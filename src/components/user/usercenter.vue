<template>
<div>
  <div class="mine-top">
      <router-link :to="{name:'setting'}"><div class="icon-set"></div></router-link>
      <div class="mine-avatar">
          <div class="box">
            <img :src="$store.state.steamPlayerInfo.avatarmedium" alt="" v-if="$store.state.steamPlayerInfo && $store.state.steamPlayerInfo.avatarmedium">
            <img src="~img/icon/avatar-2x.png" alt="" v-else>
          </div>
          <p class="player-name">{{$store.state.accountInfo.loginAccount}}</p>
      </div>
  </div>
  <div class="mine-list">
      <div class="mine-item clearfix">
        <router-link :to="{name:'mywallet'}">
          <div class="icon icon1 fl"></div>
          <div class="item-name fl">
              <span class="word">我的钱包</span>
              <i class="icon-right"></i>
          </div>
        </router-link>
      </div>
      <div class="mine-item clearfix">
          <router-link :to="{name:'onPurchase'}">
          <div class="icon icon2 fl"></div>
          <div class="item-name fl">
              <span class="word">求购管理</span>
              <i class="icon-right"></i>
          </div>
          </router-link>
      </div> 
      <div class="mine-item clearfix">
        <router-link :to="{name:'sellingManage'}">
          <div class="icon icon3 fl"></div>
          <div class="item-name fl">
              <span class="word">出售管理</span>
              <i class="icon-right"></i>
          </div>
        </router-link>
      </div>
      <div class="mine-item clearfix">
        <router-link :to="{name:'buylog'}">
          <div class="icon icon4 fl"></div>
          <div class="item-name fl">
              <span class="word">购买记录</span>
              <i class="icon-right"></i>
          </div>
        </router-link>
      </div>
      <div class="mine-item clearfix">
				<router-link :to="{name:'recordbag'}">
          <div class="icon icon5 fl"></div>
          <div class="item-name fl">
              <span class="word">背包记录</span>
              <i class="icon-right"></i>
          </div>
				</router-link>
      </div>
      <div class="mine-item clearfix">
          <router-link :to="{name:'message', query: {show: 1}}">
          <div class="icon icon6 fl"></div>
          <div class="item-name fl">
              <span class="word">个人信箱</span>
              <i class="icon-right"></i>
          </div>
           </router-link>
      </div>
      <div class="mine-item clearfix" onclick="NTKF.im_openInPageChat('bq_1000_1472795888825')">
          <div class="icon icon7 fl"></div>
          <div class="item-name fl">
              <span class="word">联系客服</span>
              <i class="icon-right"></i>
          </div>
      </div>
      <div class="mine-item clearfix">
        <router-link :to="{name:'help'}">
          <div class="icon icon8 fl"></div>
          <div class="item-name fl">
              <span class="word">帮助中心</span>
              <i class="icon-right"></i>
          </div>
        </router-link>
      </div>
  </div>
  <footercomponent :active="3"></footercomponent>
  <shopcarticoncomponent :active="0" />
</div>
</template>
<script>
import api from 'api'
import footercomponent from '../Footer.vue'
import shopcarticoncomponent from '../common/shopCartIocn.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    shopcarticoncomponent,
    footercomponent
  },
  created () {
    document.title = '我的背包-skins5173'
  }
}
</script>
