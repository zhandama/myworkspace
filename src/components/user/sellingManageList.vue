<template>
<div>
  <div v-if="!showSell" id="wrapper" class="pb-96">
        <div class="common-top">
            <a href="javascript:history.go(-1)">
                <div class="back"></div>
            </a>
            <h2 class="top-title">出售管理</h2>
            <router-link :to="{name:'sellinglog'}">
                <div class="top-right">
                    <span>出售记录</span>
                </div>
            </router-link>
        </div>

        <div class="mt-96">
            <div class="sell-admin-box" >
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
            </div>
            <div class="shop sell-admin-handler">
                <div class="tip-box">
                    <div class="content clearfix">
                        <span class="front fl">在售{{otherMsg.total}}件</span>
                        <!-- <span class="behind fr">共售价￥0.01</span> -->
                    </div>
                </div>
                <div class="goods-list clearfix" v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400">
                    <div class="goods-item fl" :class="{'active':item.checked}" v-for="item,index in sellingList" @click="listItemCheck(item,index)">
                        <div class="img-box">
                            <img  :class="{'dota':item.app_id == '570','pubg':item.app_id == '578080','cs':item.app_id == '730'}" :src="imgUrl + item.img_url" alt="">
                            <!-- <span class="goods-tip color1">不朽</span> -->
                            <!-- 选中时出现 -->
                            <i v-show="item.checked" class="icon-selected"></i>
                        </div>
                        <div class="goods-name">{{item.title}}</div>
                        <div class="goods-price">
                            <span class="">我的售价<em class="price">￥{{item.price}}</em></span>
                        </div>
                    </div>
                    <!-- <div class="goods-item fl">
                        <div class="img-box">
                            <img class="dota" src="~img/dota-goods.png" alt="">
                            <span class="goods-tip color1">不朽</span>
                            
                            <i class="icon-selected"></i>
                        </div>
                        <div class="goods-name">P2000 | 渐变琥珀</div>
                        <div class="goods-price">
                            <span class="">参考价<em class="price">￥9.59</em></span>
                        </div>
                    </div> -->
                </div>
                <div class="empty" v-show="sellingList.length < 1">
                <img src="~img/icon/empty-buyCar.png" alt="">
                <p class="word">暂无数据</p>
            </div>
            </div>
        </div>
        <transition name="van-fade">
          <div class="sell-admin-bottom" v-show="bottomShow">
            <ul class="clearfix">
                <!-- 选中加active -->
                <li class="fl" :class="{'active': checkedAll}">
                    <span class="icon-circle" @click="listItemCheck('all')">全选</span>
                </li>
                <li class="fl" @click="removeSellingGoods()">
                    <span>下架</span>
                </li>
                <a >
                    <li class="fl" @click="changePrice()">
                        <span>改价</span>
                    </li>
                </a>
            </ul>
        </div>
        </transition>
        
    </div>
    <van-popup v-model="showSell" position="right" :overlay="false" style="height:100%;width:100%">
    <to-sell ref='tosell' v-if="showSell" :closeSell='closeSell' :goodsList="changePriceList" :toSellConfig="changePriceConfig"></to-sell>
  </van-popup>
</div>
</template>
<script>
import { Waterfall } from 'vant';
import api from 'api'
export default {
  data () {
    return {
      showSell:false,
      bottomShow:false,
      checkedAll:false,
      sellingList:[],
      changePriceList:[],
      changePriceConfig:{},
	    queryParams:{
        appId:this.$route.query.appId,
        pageNum:1,
        pageSize:20,
        priceAsc:false,
        time:(new Date() -1 +1),
        slot:'', 
        rarity:'',
        quality:'',
        type:'',
        keyword:'', 
      },
      otherMsg:{},
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
  directives: {
    WaterfallLower: Waterfall('lower')
  },
  components: {
    'to-sell': resolve => { require(['@/components/common/toSell.vue'], resolve) },
  },
  created () {
		document.title = '出售管理-skins5173'
    this.dataStat()
    this.getSellingList()
  },
  watch: {

  },
	methods: {
    closeSell (a) {
      this.showSell = false
      if (a != 'back') {
        this.init()
      }
    },
    init() {
      this.queryParams.pageNum = 1
      this.bottomShow = false
      setTimeout(() => {
        this.sellingList = []
        this.getSellingList()
      }, 1500)
    },
    changePrice () {
      let params = []
      for (let i = 0; i < this.sellingList.length; i++) {
        if (this.sellingList[i].checked) {
          params.push(this.sellingList[i].id)
        }
      }
      api.center.priceGoods(params).then(
        res => {
          this.changePriceList = res.data.resultStmgoodsAndCategory
          this.changePriceConfig.poundage = res.data.poundage
          this.showSell = true
        }
      )
    },
    loadMore () {
       this.queryParams.pageNum ++
       if (this.otherMsg.total > (this.queryParams.pageNum-1) * this.queryParams.pageSize) {
         this.getSellingList()
       }
    },
    getSellingList () {
      api.center.warehouseSelling(this.queryParams).then(
        res => {
          if (res.status == 200) {
            this.otherMsg = res.data
           this.sellingList = this.sellingList.concat(res.data.goodsList)
           for (var i = 0; i<this.sellingList.length; i++) {
             if (this.checkedAll) {
               this.$set(this.sellingList[i], 'checked', true)
             } else {
               this.$set(this.sellingList[i], 'checked', false)
             }
           }
          }
         
        }
      )
    },
    removeSellingGoods () {
      let params = []
      for (let i = 0; i < this.sellingList.length; i++) {
        if (this.sellingList[i].checked) {
          params.push(this.sellingList[i].id)
        }
      }
      api.center.offTheShelfGoods(params).then(
        res => {
          if (res.data = 'SUCCESS') {
            this.$toast('下架成功')
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        }
      )
    },
    listItemCheck (item,index) {
      if (item === 'all') { // 全选
        if (this.checkedAll) {
          for (let i in this.sellingList) {
            this.$set(this.sellingList[i], 'checked', false)
          }
          this.bottomShow = false
          this.checkedAll = false
        } else {
          for (let i in this.sellingList) {
            this.$set(this.sellingList[i], 'checked', true)
          }
           this.checkedAll = true
        }
      } else {
        if (this.sellingList[index].checked) {
          this.$set(this.sellingList[index], 'checked', false)
        } else {
          this.$set(this.sellingList[index], 'checked', true)
        }
        if (this.sellingList.find(x => x.checked !== true)) {
          this.checkedAll = false
        } else {
          this.checkedAll = true
        }
        if (this.sellingList.find(x => x.checked == true)) {
          this.bottomShow = true
        } else {
          this.bottomShow = false
        }
      }
    },
		dataStat () {
      var userInfo = {}
			userInfo.uid = this.$store.state.accountInfo.uid
      api.center.accountCenter(userInfo).then(data => {
        if (this.queryParams.appId === '730' || this.queryParams.appId === 730) {
          this.on_sell_totalprice = data.data[17].staticValue
          this.on_sell_totalnum = data.data[16].staticValue
          this.on_sell_todayprice = data.data[19].staticValue
          this.on_sell_todaynum = data.data[18].staticValue
          this.on_sell_lastweekprice = data.data[21].staticValue
          this.on_sell_lastweeknum = data.data[20].staticValue
          this.total_price = data.data[23].staticValue
          this.total_num = data.data[22].staticValue
        } else if (this.queryParams.appId === '578080' || this.queryParams.appId === 578080) {
          this.on_sell_totalprice = data.data[33].staticValue
          this.on_sell_totalnum = data.data[32].staticValue
          this.on_sell_todayprice = data.data[35].staticValue
          this.on_sell_todaynum = data.data[34].staticValue
          this.on_sell_lastweekprice = data.data[37].staticValue
          this.on_sell_lastweeknum = data.data[36].staticValue
          this.total_price = data.data[39].staticValue
          this.total_num = data.data[38].staticValue
        } else {
          this.on_sell_totalprice = data.data[25].staticValue
          this.on_sell_totalnum = data.data[24].staticValue
          this.on_sell_todayprice = data.data[27].staticValue
          this.on_sell_todaynum = data.data[26].staticValue
          this.on_sell_lastweekprice = data.data[29].staticValue
          this.on_sell_lastweeknum = data.data[28].staticValue
          this.total_price = data.data[31].staticValue
          this.total_num = data.data[30].staticValue
        }
      })
    },
	}
}
</script>
