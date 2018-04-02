<template>
<div class="pb-96">
  <div class="common-top" ref="top">
    <a href="javascript:history.go(-1)">
        <div class="back"></div>
    </a>
    <h2 class="top-title">{{currentCategory.name}}</h2>
    <a href="">
        <div class="top-right"></div>
    </a>
  </div>

  <!-- 商品列表 -->
  <div style="padding-top:.96rem" v-show="!showInfo&&!showBulkBuy&&!showTobuy">
    <div class="list-page-top"></div>
    <div class="list-box">
      <div class="goods-info clearfix">
        <div class="img-box fl">
            <!-- 对应游戏添加对应的类名dota pubg cs -->
            <img :class="{'dota':currentCategory.appId=='570','pubg':currentCategory.appId=='578080','cs':currentCategory.appId=='730'}" v-if="currentCategory.imgUrl" :src="imgUrl + currentCategory.imgUrl" />
        </div>
        <div class="info-box fl">
          <div class="price-box clearfix">
            <!-- 对应游戏的logo图标添加不同的类名icon-dota,icon-pubg,icon-cs -->
            <i class="fl" :class="{'icon-dota':currentCategory.appId=='570','icon-pubg':currentCategory.appId=='578080','icon-cs':currentCategory.appId=='730'}"></i>
            <span class="price fl">参考价<em>￥{{currentCategory.marketPrice}}</em></span>
          </div>
          <div class="tip-box">
            <!-- <span class="item color3">独特</span>
            <span class="item color1">不朽</span>
            <span class="item">装备</span> -->
            <span class="f14 color-87929f" v-for="item in propertyDetailList" :key="item.id" :style="{'color':item.color}">{{item.name}} </span>
          </div>
        </div>
      </div>

      <div class="state-nav clearfix">
        <div class="state-nav-item fl" @click="tabChange(0)">
            <span class="num">{{currentCategory.saleNum || 0}}</span>
            <span class="word">当前在售</span>
        </div>
        <div class="state-nav-item fl" @click="tabChange(1)">
            <span class="num">{{currentCategory.purchaseNum || 0}}</span>
            <span class="word">当前求购</span>
        </div>
        <div class="state-nav-item fl" @click="tabChange(2)">
            <span class="num">{{currentCategory.totalSaleNum || 0}}</span>
            <span class="word">累计已售</span>
        </div>
      </div>
      <div class="list">
        <div class="tab" :class="{'active':tabFixed}" ref="tabFixed">
            <ul class="clearfix">
                <li class="fl" @click="tabChange(0)" :class="{'active':tabActive==0}"><span class="word">出售</span></li>
                <li class="fl" @click="tabChange(1)" :class="{'active':tabActive==1}"><span class="word">求购</span></li>
                <li class="fl" @click="tabChange(2)" :class="{'active':tabActive==2}"><span class="word">成交记录</span></li>
            </ul>
        </div>
        <div class="tab" v-if="tabFixed">
            <ul class="clearfix">
                <li class="fl" @click="tabChange(0)" :class="{'active':tabActive==0}"><span class="word">出售</span></li>
                <li class="fl" @click="tabChange(1)" :class="{'active':tabActive==1}"><span class="word">求购</span></li>
                <li class="fl" @click="tabChange(2)" :class="{'active':tabActive==2}"><span class="word">成交记录</span></li>
            </ul>
        </div>
        <!-- 出售 -->
        <div class="list-item-box" v-if="tabActive==0&&sellList">
				  <div v-waterfall-lower="getSellListMore"  :waterfall-disabled="disabled" waterfall-offset="200">
          <div class="list-item clearfix" v-for="item in sellList" :key="item.id" >
            <div class="img-box">
              <!-- 对应游戏加对应类名 dota，pubg，cs -->
              <img @click="getShowInfo(item)" :class="{'dota':currentCategory.appId=='570','pubg':currentCategory.appId=='578080','cs':currentCategory.appId=='730'}" v-if="item.img_url" :src="imgUrl + item.img_url" />
              <!-- <span class="tip color1">补休</span> -->
              <div class="abrase-bar" v-if="currentCategory.appId =='730'&&item.abrasion">
                  <span class="num"  style="width:85%">磨损：<em>{{item.abrasion == 0 ? '无':item.abrasion}}</em></span>
              </div>
            </div>
            <div class="seller-box">
              <div class="price-box clearfix">
                <div class="left fl">
                    <span class="price fl">￥{{item.price}}</span>
                    <span class="span-shell fl">{{(item.price * 0.95).toFixed(2)}}</span>
                </div>
                <div class="right fr">
                    <span class="buyCar-btn" href="javascript:void(0)" @click="addCart(item.id)"></span>
                </div>
              </div>
              <div class="avatar-box clearfix">
                <div class="left fl">
                    <img class="avatar fl" :src="item.avatar" v-if="item.avatar" alt="">
                    <img class="avatar fl" v-else src="~img/icon/avatar-2x.png" alt="">
                    <span class="avatar-name fl">{{item.user_name}}</span>
                </div>
                <!-- shell-pay贝壳付 to-pay购买 sell-btn供应 -->
                <div class="right fr">
                    <span class="pay-btn shell-pay" @click="getshellpay(item,'SHELL')">贝壳付</span>
                    <span class="pay-btn to-pay" @click="getshellpay(item,'MONEY')">购买</span>
                </div>
              </div>
            </div>
        </div>
        </div>
        </div>
        <!-- 求购 -->
        <div class="list-item-box" v-if="tabActive==1&&buyList">
          <div v-waterfall-lower="getSellListMore" :waterfall-disabled="disabled" waterfall-offset="200">
          <div class="list-item clearfix" v-for="item in buyList" :key="item.id" >
            <div class="img-box">
                <!-- 对应游戏加对应类名 dota，pubg，cs -->
                <img :class="{'dota':currentCategory.appId=='570','pubg':currentCategory.appId=='578080','cs':currentCategory.appId=='730'}" v-if="item.img_url" :src="imgUrl + item.img_url" />
                <!-- <span class="tip color1">不朽</span> -->
            </div>
            <div class="seller-box">
              <div class="price-box clearfix">
                <div class="left fl">
                    <span class="price fl">￥{{item.price}}</span>
                    <span class="f12" style="padding-left:.2rem">求购数量 {{item.num-item.deal_num}} (件)</span>
                </div>
              </div>
              <div class="avatar-box clearfix">
                <div class="left fl">
                    <img class="avatar fl" :src="item.avatar" v-if="item.avatar" alt="">
                    <img class="avatar fl" v-else src="~img/icon/avatar-2x.png" alt="">
                    <span class="avatar-name fl">{{item.user_name}}</span>
                </div>
                <div class="right fr" @click="selectSelfInventory(item)">
                    <span class="pay-btn sell-btn">供应</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <!-- 成交记录 -->
        <div class="list-item-box"  v-if="tabActive==2&&recordList">
          <div class="list-item clearfix"  v-for="item in recordList" :key="item.id" >
            <div class="img-box fl">
              <!-- 对应游戏加对应类名 dota，pubg，cs -->
              <img :class="{'dota':currentCategory.appId=='570','pubg':currentCategory.appId=='578080','cs':currentCategory.appId=='730'}" v-if="item.itemImgUrl" :src="imgUrl + item.itemImgUrl" />
              <!-- <span class="tip color1">不朽</span> -->
            </div>
            <div class="seller-box fl">
              <div class="sell-price">￥{{item.price}}</div>
              <div class="seller clearfix">
                  <img class="avatar fl" :src="item.avatar" v-if="item.avatar" alt="">
                  <img class="avatar fl" v-else src="~img/icon/avatar-2x.png" alt="">
                  <span class="name fl">{{item.sellerName}}</span>
              </div>
            </div>
            <div class="time-box fr">
              <div class="word">出售</div>
              <div class="time">{{item.createTime}}</div>
            </div>
          </div>
        </div>
        <transition name="van-fade" v-if="!nomore">
          <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
        </transition>
        <!-- 没有更多饰品 -->
        <div class="no-more" v-if="nomore">
          <img src="~img/icon/empty.png" alt="">
          <p>抱歉，没有更多饰品了~</p>
        </div>
      </div>
    </div>
  </div>

  <div class="handle-nav">
    <a href="javascript:void(0)" @click="getBulkBuy" >
      <div class="nav-item fl" style="width:50%">
        <span>批量购买</span>
      </div>
    </a>
    <a href="javascript:void(0)" @click="getTobuy" >
      <div class="nav-item fl" style="width:50%">
        <span>我要求购</span>
      </div>
    </a>
    <!-- <a href="javascript:void(0)">
      <div class="nav-item fl">
        <span>我要租赁</span>
      </div>
    </a> -->
  </div>
  <shell-pay-dialog v-if="shellpay" :payItem='payItem' :type="type" :pay="pay" :payclose='payclose'></shell-pay-dialog>
  <shopcarticoncomponent :active="0" ref='shoppingcart'></shopcarticoncomponent>
  <van-popup v-model="showSupply" position="right" :overlay="false" style="height:100%;width:100%">
    <to-supply  v-if="showSupply" :item='infoItem' :searchItems="searchItems" :closeInfo='closeInfo' />
  </van-popup>
  <van-popup v-model="showTobuy" position="right" :overlay="false" style="height:100%;width:100%">
    <to-buy  v-if="showTobuy" :item='infoItem' :buyItem="sellList[0]||''" :getShowInfo="getShowInfo" :allNum="currentCategory.saleNum" :appId="appId" :itemId="itemId" :closeInfo='closeInfo' />
  </van-popup>
  <van-popup v-model="showBulkBuy" position="right" :overlay="false" style="height:100%;width:100%">
    <bulk-buy  v-if="showBulkBuy" :appId="appId" :itemId="itemId" :closeInfo='closeInfo' />
  </van-popup>
  <van-popup v-model="showInfo" position="right" :overlay="false" style="height:100%;width:100%">
    <goods-info  v-if="showInfo" :item='infoItem' :infoCategory="infoCategory" :closeInfo='closeInfo' />
  </van-popup>
  <to-top />
</div>
</template>
<style>
</style>
<script>
import api from 'api'
import {mapState} from 'vuex'
import {Dialog} from 'vant'
import {isLogin} from '@/common/index.js' 
import shopcarticoncomponent from '../common/shopCartIocn.vue'
import { Waterfall } from 'vant';
export default {
  directives: {
    WaterfallLower: Waterfall('lower') 
  },
  data () {
    return {
      appId: this.$route.query.appId,
      itemId: this.$route.query.itemId,
      searchType: this.$route.query.searchType,
      currentCategory: '',
      propertyDetailList: '',
      sellListCount: 0,
      sellList:'',
      buyListCount: 0,
      buyCount: 0,
      buyList:'',
      recordList: '',
      recordListCount: 0,
			tabActive: 0,
			showInfo: false,
      infoItem: [],
      infoCategory: '',
      shellpay: false,
      payItem: [],
      showBulkBuy: false,
      showTobuy: false,
      showSupply: false,
      searchItems: [],
      nomore: false,
      disabled: true,
      sellpageNum: 1,
      buypageNum: 1,
      type: '',
      tabFixed: false,
      top: 0
    }
  },
  components: {
    'bulk-buy': resolve => { require(['@/components/common/bulkBuy.vue'], resolve) },
    'to-buy': resolve => { require(['@/components/common/toBuy.vue'], resolve) },
    'to-supply': resolve => { require(['@/components/common/toSupply.vue'], resolve) },
    'goods-info': resolve => { require(['@/components/goods/goodsInfo.vue'], resolve) },
    'shell-pay-dialog': resolve => { require(['@/components/common/shellPayDialog.vue'], resolve) },
    'to-top': resolve => { require(['@/components/common/toTop.vue'], resolve) },
    shopcarticoncomponent
  },
  created () {
    this.getDetail()
    this.getuser()
    this.getSellList('init')
    if (this.searchType === '2' || this.searchType === 2) {
      this.tabChange(1)
    }
  },
  computed: {
    ...mapState({
      isLogin: state => {
        return state.isLogin
      }
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(()=>{
      this.top = this.$refs.tabFixed.getBoundingClientRect().top - this.$refs.top.getBoundingClientRect().height
    })
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= this.top) {
        this.tabFixed = false
      } else {
        this.tabFixed = true
      }
    },
    getSellListMore () {
      if (this.tabActive == 0) {
        if (this.sellList.length < this.sellListCount) {
          this.getSellList()
        } else {
          this.nomore = true
        }
      } else if (this.tabActive == 1){
        if (this.buyList.length < this.buyCount) {
          this.getBuyList()
        } else {
          this.nomore = true
        }
      }
    },
    selectSelfInventory (item) {
      if (!isLogin(this.isLogin)) {
        return
      }
      let params = {
        appId: this.appId,
        itemId: this.itemId
      }
      api.goods.selectSelfInventory(params).then(res => {
        if (res.status == 200 && res.data) {
          if (res.data.searchItems.length < 1) {
            if (res.data.whether) {
              this.$toast('您的背包中未找到相对应的饰品信息')
            } else {
              this.$toast('您符合的饰品正在盘库中，请盘库完毕后再出售')
            }
          } else {
            this.searchItems = res.data
            this.infoItem = item
            this.showSupply = true
          }
        }
      })
    },
    getBulkBuy () {
      if (!isLogin(this.isLogin)) {
        return
      }
      this.showBulkBuy = true
    },
    getTobuy () {
      if (!isLogin(this.isLogin)) {
        return
      }
      this.infoItem = this.currentCategory
      this.showTobuy = true
    },
		getShowInfo (item) {
      this.infoItem = item
      this.infoCategory = this.propertyDetailList
      this.showInfo = true
      // this.closeInfo()
      // this.tabChange(0)
		},
		closeInfo (a) {
      if (a === 'sell') {
        this.tabChange(0)
      }
      if (a === 'buy') {
        this.tabChange(1)
      }
      this.showInfo = false
      this.showBulkBuy = false
      this.showTobuy = false
      this.showSupply = false
    },
    payclose () {
      this.shellpay = false
    },
    getDetail () {
      let params = {
        appId: this.appId,
        itemId: this.itemId
      }
      api.goods.getGoodsDetail(params).then(res => {
        if (res.status == 200 && res.data) {
          this.nomore = false
          this.currentCategory = res.data.currentCategory
          if (this.$route.query.onPurchase) {
            this.getTobuy()
          }
          this.propertyDetailList = res.data.propertyDetailList
        }
      })
    },
    tabChange (index) {
      this.tabActive = index
      // this.nomore = false
      this.sellpageNum = 1
      this.buypageNum = 1
      if (this.tabActive == 0) {
        this.getSellList('init')
      } else if (this.tabActive == 1) {
        this.getBuyList('init')
      } else {
        this.getRecords('init')
      }
    },
    getSellList (item) {
      let params = {
        accurateMap: {
          app_id: [this.$route.query.appId],
          item_id: [this.$route.query.itemId],
          goods_type: [1]
        },
        page: this.sellpageNum,
        pageCount: 10,
        sortMap: {price: '+'}
      }
      if (item === 'init') {
        this.sellList = []
      }
      api.goods.searchGoodsList(params).then(res => {
        if (res.status == 200 && res.data) {
          this.sellpageNum ++
          let result = JSON.parse(res.data.result)
          if (result.items.length > 0) {
            this.sellList = this.sellList.concat(result.items)
          }
          this.sellListCount = result.total
        }
      })
    },
    getBuyList (item) {
      let params = {
        accurateMap: {
          app_id: [this.$route.query.appId],
          item_id: [this.$route.query.itemId],
          goods_type: [2]
        },
        page: this.buypageNum,
        pageCount: 10,
        sortMap: {price: '-'}
      }
      if (item === 'init') {
        this.buyList = []
      }
      api.goods.searchGoodsList(params).then(res => {
        if (res.status == 200 && res.data) {
          this.buypageNum ++
          let result = JSON.parse(res.data.result)
          let count = 0
          this.buyList = this.buyList.concat(result.items)
          this.buyCount = result.total
          this.buyList.forEach(x => {
            count += parseInt(x.num) - parseInt(x.deal_num)
          })
          this.buyListCount = count
        }
      })
    },
    getRecords (item) {
      let params = {
        appId: this.appId,
        itemId: this.itemId
      }
      if (item === 'init') {
        this.recordList = []
      }
      api.order.getRecords(params).then(res => {
        if (res.status == 200 && res.data) {
          this.recordList = this.recordList.concat(res.data.list)
          this.recordListCount = res.data.total
        }
      })
    },
    getshellpay (item, type) {
      // if (!this.$store.state.accountInfo.shell || (this.$store.state.accountInfo.shell < (item.price * 0.95).toFixed(2))) {
      //   this.$toast('您的贝壳数量不足')
      //   return
      // }
      if (!isLogin(this.isLogin)) {
        return
      }
      this.type = type
      this.payItem = item
      this.shellpay = true
    },
    pay (item, type) {
      if (!isLogin(this.isLogin)) {
        return
      }
			let params = {
				buyCount: 1,
				goodsIds: [item.id],
				payType: type,
				type: 1
			}
      api.order.createdOrder(params).then(res => {
				if (res.status == 200 && res.data) {
          if (type === 'SHELL') {
            this.$toast('兑换成功，请前往背包中查看')
            setTimeout(() => {
              location.href = "http://mskins.5173.com/bag"
            }, 2000)
            return
          }
					api.order.payment(res.data.orderId).then(res => {
						if (res.status === 200) {
              res.data = res.data.replace('Payment/PayDirectly.aspx', 'PaymentWap/PayExternalV2.aspx')
							window.location.href = res.data
						}
					})
				}
      })
    },
    getuser () {
      api.getUserInfo().then((res) => {
        if (res && res.status === 200) {
          this.$store.commit('setAccountInfo', res.data)
          this.$store.commit('setLoginstatus', true)
        }
      })
    },
    addCart (id) {
      if (!isLogin(this.isLogin)) {
        return
      }
      api.goods.addShoppingCar({'goodsId':id}).then(res =>{
        if (res.status == 200 && res.data) {
          this.$toast('加入购物车成功！');
          this.$refs.shoppingcart.init()
        }
      }, error => {
        this.$toast(error);
      })
    }
  }
}
</script>
<style type="text/css" >
</style>
