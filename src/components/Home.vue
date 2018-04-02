<template>
<div id="wrapper" class="pb-96">
  <div class="index-top">
      <div class="top-search clearfix">
          <a href="/">
              <div class="logo-5173 fl"></div>
          </a>
          <router-link :to="{name:'search'}">
              <div class="search-box fl">
                  <span class="word-tip">请输入关键字搜索</span>
              </div>
          </router-link>
          <router-link :to="{name:'message', query: {show: 0}}">
              <!-- 有消息时加active -->
              <span class="fl icon-msg" :class="{'active':messageCount > 0 && mymessageCount <= 0}">
                <i class="icon-redRot" :class="{'active':mymessageCount > 0}"  v-if="messageCount > 0 || mymessageCount > 0" >{{mymessageCount}}</i>
              </span>
          </router-link>
          <a href="http://skins.5173.com">
              <span class="fr icon-pc"></span>
          </a>
      </div>
      <div class="game-nav clearfix">
          <router-link :to="{name:'goodsList',query:{appId:item.appId}}" class="nav-link fl" href="javascript:void(0)"  v-for="item in gameList" v-if="gameList && gameList.length > 0" :key="item.appId">
              <div class="game-logo " :class="{'pubg-color':item.appId=='578080','dota-color':item.appId=='570','cs-color':item.appId=='730'}"></div>
              <span class="game-name">{{item.appName}}</span>
          </router-link>
      </div>
  </div>
  <div style="clear:both">
    <hotcomponent v-if="gameList && gameList.length > 0" v-for="item in gameList" :key="item.appId" :appName='item.appName' :appId='item.appId'></hotcomponent>
  </div>
  <van-popup v-model="showMessage" position="right" :overlay="false" style="height:100%;width:100%">
    <van-nav-bar
      title="消息"
      left-text="关闭"
      left-arrow
      @click-left="showMessage=false"
    />
    <div style="width:50px;margin:auto"><van-loading type="spinner" color="black" /></div>
  </van-popup>
  <footercomponent :active="0"></footercomponent>
  <shopcarticoncomponent :active="0" />
  <to-top />
</div>
</template>
<style>
.gameListTitle{background: #292929;line-height:4rem;height:4rem;text-align: center;border-radius: .3rem;color:#fff}
</style>
<script>
import {mapState, mapActions} from 'vuex'
import api from 'api'
import footercomponent from './Footer.vue'
import hotcomponent from './homeHot.vue'
import shopcarticoncomponent from './common/shopCartIocn.vue'
export default {
  data () {
    return {
      keywords: '',
      showMessage: false,
      goodsList: [],
      messageCount: 0,
      mymessageCount: 0
    }
  },
  components: {
    footercomponent,
    hotcomponent,
    shopcarticoncomponent,
    'to-top': resolve => { require(['@/components/common/toTop.vue'], resolve) },
  },
  created () {
    document.title = 'skins5173-steam电竞饰品交易平台'
  },
  mounted () {
    this.getMessageCount()
    this.getGames()
  },
  computed: {
    ...mapState({
      shoppingCount: state => {
        return state.common.shoppingCount
      },
      gameList: state => {
        return state.common.gameList
      }
    })
  },
  methods: {
    getMessageCount () {
      api.header.getMessageCount().then(res => { // 站内信条数
        if (res && res.status === 200) {
          this.messageCount = res.data
        }
      })
      api.header.getMyunusedMessageList().then(res => { // 个人信箱消息条数
        if (res && res.status === 200) {
          this.mymessageCount = res.data
        }
      })
    },
    ...mapActions({
      getGames: 'common/GET_GAMES'
    })
  }
}
</script>
<style type="text/css" >
</style>
