<template>
<div>
  <div id="wrapper" class="pb-96">
        <div class="common-top">
            <router-link :to="{name:'user'}">
                <div class="back"></div>
            </router-link>
            <h2 class="top-title">出售管理</h2>
            <router-link :to="{name:'sellinglog'}">
                <div class="top-right">
                    <span>出售记录</span>
                </div>
            </router-link>
        </div>

        <div class="mt-96">
            <!-- <div class="sell-admin-box">
                <ul class="clearfix" >
                    <li class="fl ">
                        <div class="number-box">
                            <span class="num">{{on_sell_todaynum}}</span>
                            <span class="word">今日出售(件)</span>
                        </div>
                    </li>
                    <li class="fl ">
                        <div class="number-box">
                            <span class="num">{{on_sell_todayprice /100}}</span>
                            <span class="word">今日收入(￥)</span>
                        </div>
                    </li>
                    <li class="fl ">
                        <div class="number-box">
                            <span class="num">{{on_sell_totalnum}}</span>
                            <span class="word"> 在售饰品(件)</span>
                        </div>
                    </li>
                    <li class="fl ">
                        <div class="number-box">
                            <span class="num">{{total_price / 100}}</span>
                            <span class="word">累计收入(￥)</span>
                        </div>
                    </li>
                </ul>
            </div> -->
            <div class="sell-admin-game">
                <div class="title clearfix">
                    <span class="all-game fl">全部游戏</span>
                    <span class="count fr">共<em class="num">{{on_sell_totalnum}}</em>件在售</span>
                </div>
                <div class="content">
                    <ul class="clearfix">
                          <router-link :to="{name:'sellingManageList',query:{appId:570}}">
                            <li class="fl" @click="queryParams.appId = 570">
                                <div class="big-logo big-dota"></div>
                                <p class="game-name">DOTA2</p>
                            </li>
                          </router-link>
                        <router-link :to="{name:'sellingManageList',query:{appId:578080}}">
                            <li class="fl" @click="queryParams.appId = 578080">
                                <div class="big-logo big-pubg"></div>
                                <p class="game-name">PUBG</p>
                            </li>
                        </router-link>
                        <router-link :to="{name:'sellingManageList',query:{appId:730}}">
                            <li class="fl" @click="queryParams.appId = 730">
                                <div class="big-logo big-cs"></div>
                                <p class="game-name">CS:GO</p>
                            </li>
                        </router-link>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import api from 'api'
export default {
  data () {
    return {
			queryParams:{
				appId: this.$route.query.appId || '578080'
      },
      on_sell_totalprice: 0, // 在售饰品总价
      on_sell_totalnum: 0, // 在售饰品数量
      on_sell_todayprice: 0, // 今日出售总价
      on_sell_todaynum: 0, // 今日出售数量
      on_sell_lastweekprice: 0, // 上周出售总价
      on_sell_lastweeknum: 0, // 上周出售数量
      total_price: 0, // 累计出售总价
      total_num: 0, // 累计出售数量
    }
  },
  components: {
  },
  created () {
		document.title = '出售管理-skins5173'
		this.dataStat()
  },
  watch: {

  },
	methods: {
		dataStat () {
      var userInfo = {}
      userInfo.uid = this.$store.state.accountInfo.uid
      api.center.accountCenter(userInfo).then(data => {
        this.on_sell_totalnum = data.data[2].staticValue
      })
    },
	}
}
</script>
