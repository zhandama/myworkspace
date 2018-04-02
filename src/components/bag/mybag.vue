<template>
<div >
  <div class="shop" v-show="!showMessage&&!showSell">
      <div class="shop-top">
          <bagtopcomponent></bagtopcomponent>
          <div class="store-game">
              <ul class="clearfix">
                  <li class="fl" @click="gameChange(item.appId)" v-for="item in gameList" v-if="gameList.length > 0" :key="item.appId" :class="{'active':item.appId==params.appId}">
                      <span>{{item.appName}}</span>
                  </li>
              </ul>
          </div>
      </div>

      <!-- 我的背包处的搜索 -->
      <div class="filter-block store-filter">
          <div class="filter-box">
              <input class="search-filter" type="text" placeholder="请输入饰品关键字" v-model="params.keyword" maxlength="" @keyup.enter="getList('clear')">
              <span class="filter-item fr icon-robot" @click="showMessage=true">报价</span>
              <span class="filter-item fr icon-sort" v-if="params.appId=='578080'" :class="{'active-up':params.TimeAsc&&time,'active-down':!params.TimeAsc&&time}" @click="params.TimeAsc ? params.TimeAsc = false:params.TimeAsc=true;price=false;time=true;params.priceAsc='';getList('clear')">时间</span>
              <span class="filter-item fr icon-filter" v-if="params.appId!='578080'" @click="active=false;filter.show=!filter.show">筛选</span>
              <span class="filter-item fr icon-sort" :class="{'active-up':params.priceAsc&&price,'active-down':!params.priceAsc&&price}" @click="params.priceAsc ? params.priceAsc = false:params.priceAsc=true;price=true;time=false;params.TimeAsc='';getList('clear')">价格</span>
          </div>
          <div class="filter-detail" v-if="filter.show">
              <!-- 有三项筛选的 -->
              <div class="filter-tab">
                  <ul class="clearfix">
                      <li class="fl" :class="{'active':filter.item0}" @click="filter.item0=true" style="width:50%">
                          <span>属性</span>
                          <i class="icon-arrow"></i>
                      </li>
                      <li class="fl" :class="{'active':!filter.item0}" @click="filter.item0=false" style="width:50%">
                          <span>排序</span>
                          <i class="icon-arrow"></i>
                      </li>
                  </ul>
              </div>
              <!-- 属性 -->
              <div class="tab-item" v-if="filter.item0">
                  <div class="item-box" v-if="params.appId=='730'&&categoryList.type">
                      <div class="title">类型</div>
                      <div class="select-list clearfix">
                          <span class="select-item fl"  @click="params.type=''" :class="{'active':params.type==''}">不限</span>
                          <span class="select-item fl" v-for="item in categoryList.type" :class="{'active':params.type==item.value}" @click="params.type=item.value" :key="item.value">{{item.zhName}}</span>
                      </div>
                  </div>
                  <div class="item-box" v-if="params.appId=='730'&&categoryList.slot">
                      <div class="title">外观</div>
                      <div class="select-list clearfix">
                          <span class="select-item fl" @click="params.slot=''" :class="{'active':params.slot==''}">不限</span>
                          <span class="select-item fl" v-for="item in categoryList.slot" :class="{'active':params.slot==item.value}"  @click="params.slot=item.value" :key="item.value">{{item.zhName}}</span>
                      </div>
                  </div>
                  <div class="item-box" v-if="params.appId=='570'&&categoryList.rarity">
                      <div class="title">稀有度</div>
                      <div class="select-list clearfix">
                          <span class="select-item fl" @click="params.rarity=''" :class="{'active':params.rarity==''}">不限</span>
                          <span class="select-item fl" :class="{'active':params.rarity==item.value}" v-for="item in categoryList.rarity"  @click="params.rarity=item.value" :key="item.value">{{item.zhName}}</span>
                      </div>
                  </div>
                  <!-- 确定或者重置 -->
              </div>
              <!-- 排序 -->
              <div class="tab-item" v-if="!filter.item0">
                  <div class="sort-list clearfix">
                      <span class="sort-item fl" :class="{'active':(params.TimeAsc==null||params.TimeAsc=='')&&!time}" @click="params.TimeAsc='';time=false;price=false;">默认</span>
                      <span class="sort-item fl" :class="{'active':params.TimeAsc==true&&time}" @click="params.TimeAsc=true;time=true;price=false;params.priceAsc='';">时间<em class="up-sort"></em></span>
                      <span class="sort-item fl" :class="{'active':params.TimeAsc==false&&time}" @click="params.TimeAsc=false;time=true;price=false;params.priceAsc='';">时间<em class="down-sort"></em></span>
                  </div>
              </div>
              <div class="select-confirm">
                  <span class="btn" @click="init();filter.show=false">重置</span>
                  <span class="btn active" @click="getList('clear');filter.show=false">确定</span>
              </div>
          </div>
          <div class="filter-result">共<em>{{total}}</em>件</div>
      </div>

      <!-- 商品列表 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-waterfall-lower="loadMore"  waterfall-disabled="disabled" waterfall-offset="200">
          <div class="goods-list clearfix">
            <transition-group name="van-fade">
              <a class="" style="display:inline-block" href="javascript:void(0)"  v-for="(item,index) in goodsList" :key="item.id"  @click="chose(item, index)">
                  <div class="goods-item fl" :class="{'active':item.chose}">
                      <div class="img-box">
                        <span class="tip" style="top:.2rem;left:.2rem" v-show="params.appId =='730' && item.slot_name">{{item.slot_name}}</span>
                        <span class="tip" style="top:.2rem;left:.2rem" v-show="params.appId =='570' && item.rarity_name">{{item.rarity_name}}</span>
                        <div class="itemMask" v-if="item.state === 6">{{item.type == 1?'取回中...':'盘库中...'}}</div>
                        <img :class="{'dota':item.app_id=='570','pubg':item.app_id=='578080','cs':item.app_id=='730'}" :src="imgUrl + item.img_url" >
                        <i class="icon-selected"  v-if="item.chose"></i>
                        <div class="abrase-bar" v-if="params.appId =='730'&&item.abrasion">
                            <span class="num"  style="width:80%">磨损：<em>{{item.abrasion == 0 ? '无':item.abrasion}}</em></span>
                        </div>
                      </div>
                      <div class="goods-name">{{item.title}}</div>
                      <div class="goods-price">
                          <span class="">参考价<em class="price">￥{{item.maeketPrice ? item.maeketPrice : 0 | priceFloat}}</em></span>
                      </div>
                  </div>
              </a>
              </transition-group>
          </div>
        </div>
      </van-pull-refresh>
      <transition name="van-fade" v-if="!nomore && isLoadMore">
        <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
      </transition>
      <div class="no-more" v-if="nomore">
          <img src="~img/icon/empty.png" alt="">
          <p>抱歉，没有更多饰品了~</p>
      </div>
  </div>
  <div class="sell-admin-bottom" style="z-index:99" v-if="active">
      <ul class="clearfix">
          <!-- 选中加active -->
          <li class="fl" :class="{'active':choseAll}" @click="chose('all');choseAll=!choseAll">
              <span class="icon-circle">全选</span>
          </li>
          <li class="fl" @click="getsteam">
              <span>取回</span>
          </li>
          <li class="fl" @click="getsell">
              <span>出售</span>
          </li>
      </ul>
  </div>
  <van-popup v-model="showMessage" position="right" :overlay="false" style="height:100%;width:100%">
      <div class="common-top">
          <a href="javascript:" @click="closeBaoJia">
              <div class="back"></div>
          </a>
          <h2 class="top-title">交易报价</h2>
          <a href="">
              <div class="top-right"></div>
          </a>
      </div>
      <div class="mt-96" style="height:100%;overflow:scroll">
        <div class="order-item clearfix" v-if="autocheckResList.length > 0" v-for="item in autocheckResList" :key="item.offer_id">
            <div class="img-box fl">
                <img class="cs" :src="item.bot_avatar" alt="">
            </div>
            <!-- 三行的 three-line-->
            <div class="info-box fl three-line">
                <div class="title">{{item.bot_name}}<span class="color">(取)</span></div>
                <div class="line">
                    <span class="code">校验码：<em class="price">{{item.verify_code}}</em><em v-if="item.status=='sent'||item.status=='wait'"> ({{timeDown(item)}})</em></span>
                    <span v-if="item.status == 'sent'">前往Steam进行处理</span>
                </div>
                <div class="line" ><span>{{baojiaTxt(item)}}</span></div>
            </div>
            <div class="handler-box fr" v-if="item.status == 'sent'"  @click="baojiaClick(item)">
                <span class="btn">处理</span>
            </div>
        </div>
        <div class="no-more" v-if="autocheckResList.length <= 0">
            <img src="~img/icon/empty.png" alt="">
            <p>暂无报价~</p>
        </div>
      </div>
  </van-popup>
  <van-popup v-model="showSell" position="right" :overlay="false" style="height:100%;width:100%">
    <to-sell ref='tosell' v-if="showSell" :closeSell='closeSell' :goodsList="toSellList" :toSellConfig="toSellConfig"></to-sell>
  </van-popup>
  <transition name="van-fade" v-if="depositing!=0">
  <div class="bomb" >
      <div class="content">
          <h3 class="title">温馨提示</h3>
          <p class="tip" v-if="depositing == 1">正在等待机器人响应...</p>
          <p class="tip" v-if="depositing == 2">您有饰品正在取回中...</p>
      </div>
      <div class="btn-box" v-if="depositing == 1" @click="showMessage=true;depositing=0">
          <span class="know">朕知道了</span>
      </div>
  </div>
  </transition>
  <div class="mask" v-if="depositing!=0"></div>
  
</div>
</template>
<script>
// import {mapState, mapActions} from 'vuex'
import bagtopcomponent from './bagTop'
import { Waterfall } from 'vant';
import api from 'api'
export default {
  directives: {
    WaterfallLower: Waterfall('lower') 
  },
  data () {
    return {
      params: {
        appId: this.$route.query.gameId || '578080',
        pageNum: 1,
        pageSize: 20,
        slot: '',
        rarity: '',
        quality: '',
        type: '',
        keyword: '',
        priceAsc: '',
        TimeAsc: false
      },
      filter: {
        show: false,
        item0: true
      },
      price: false,
      time: true,
      goodsList: [],
      temporary: [],
      total: 0,
      isLoading: false,
      isLoadMore:false,
      nomore: false,
      active: false,
      choseAll: false,
      autocheckResList: [],
      realInterval: '',
      offeridList: '',
      showMessage: false,
      showSell: false,
      sysTime: 0,
      toSellList: [],
      toSellConfig: [],
      categoryList: [],
      depositing: 0,
      sysTime: 0,
      isRobot: true,
      success: false,
      offeridListArr: []
    }
  },
  components: {
    'to-sell': resolve => { require(['@/components/common/toSell.vue'], resolve) },
    bagtopcomponent
  },
  created () {
    this.getList()
    this.onGetSteam()
  },
  computed: {
  },
  methods: {
    closeBaoJia () {
      this.showMessage = false
      if (this.success) {
        this.init()
      }
    },
    gameChange (appId) {
      this.params.appId = appId
      this.categoryList = []
      if (this.params.appId === '730') {
        this.params.rarity = ''
        api.goods.getCSGOCategoryList().then(data => {
          this.categoryList = data.data
        })
      } else if (this.params.appId === '578080') {
        api.goods.getPUBGCategoryList().then(data => {
          this.categoryList = data.data
        })
      } else {
        this.params.slot = ''
        this.params.type = ''
        api.goods.getDotaCategoryList().then(data => {
          this.categoryList = data.data
        })
      }
      this.init()
      this.onGetSteam()
    },
    onRefresh () {
      this.init()
    },
    loadMore () {
      if (this.goodsList.length < this.total) {
        this.getList()
      } else {
        this.nomore = true
      }
    },
    init () {
      this.params.pageNum = 1
      this.nomore = false
      this.choseAll = false
      this.active = false
      this.total = 0
      this.filter.show = false
      this.filter.item0 = true
      this.params.slot = ''
      this.params.rarity = ''
      this.params.quality = ''
      this.params.type = ''
      this.params.keyword = ''
      this.getList('clear')
    },
    getList (item) { // 请求列表
      this.isLoadMore = true
      api.center.warehouseList(this.params).then(res => {
        if (item === 'clear') {
          this.active = false
          this.goodsList = []
        }
        this.isLoadMore = false
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        if (res.status == 200 && res.data) {
          this.params.pageNum ++
          if (res.data.goodsList.length > 0) {
            this.goodsList = this.goodsList.concat(res.data.goodsList)
            this.total = res.data.total
            // this.gettemporary()
          } else {
            if (this.params.pageNum == 1) {
              this.nomore = true
            }
          }
          if (this.choseAll) {
            for (let i in this.goodsList) {
              this.$set(this.goodsList[i], 'chose', true)
            }
          } 
        }
      })
    },
    // gettemporary () {
    //   api.center.gettemporary().then(res => {
    //     this.temporary = res.data
    //   })
    // },
    getsteam () { // 取回steam仓库
      var self = this
      let params = {
        app_id: this.params.appId,
        items: []
      }
      this.goodsList.find(x => {
        if (x.chose) {
          let list = {
            asset_id: x.asset_id,
            market_hash_name: x.market_hash_name,
            original_id: x.origin_id,
            app_id: x.app_id,
            id: x.id,
            item_id: x.item_id
          }
          params.items.push(list)
        }
      })
      if (!this.$store.state.accountInfo.dealUrl || this.$store.state.accountInfo.dealUrl === '') {
        this.$toast('请先设置steam交易链接')
        return
      }
      if (params.items.length > 0) {
        api.center.withdrawAdapter(params).then(res => {
          this.depositing = 1
          setTimeout(() => {
            this.depositing = 0
          }, 2000)
          this.offeridList = res.data.offerIds
          this.init()
          clearInterval(this.realInterval)
          this.realInterval = setInterval(() =>{
            self.autocheck()
          }, 2000)
        }, error => {
          if (error.code === 128) {
            this.depositing = 2
            setTimeout(() => {
              this.depositing = 0
            }, 2000)
          }
        })
      }
    },
    getsell () {
      let params = [], self = this
      this.goodsList.find(x => {
        if (x.chose) {
          params.push(x.id)
        }
      })
      if (params.length > 0) {
        api.center.mypriceGoods(params).then(res => {
          self.toSellList = res.data.resultStmgoodsAndCategory
          self.toSellConfig.defaultPrice = 0
          self.toSellConfig.poundage = res.data.poundage
          self.showSell = true
        })
      }
    },
    closeSell (a) {
      this.showSell = false
      if (a != 'back') {
        this.init()
      }
    },
    autocheck () {
      var self = this
      if (self.offeridList && self.offeridList.length > 0) {
        api.center.selectTakeOutOffer({offerIds: self.offeridList}).then(
        res => {
          self.sysTime = res.data.systemTime / 1000
          if (res.data.data.length > 0) {
            self.autocheckResList = res.data.data
            for (var i = 0; i < self.autocheckResList.length; i++) {
              var item = self.autocheckResList[i]
              if (item.status === 'failed') {
                if (item.error_code === 10) {
                  this.$toast('由于您的Steam手机令牌绑定未超过7天,不能取回');
                } else if (item.error_code === 7) {
                  this.$toast('由于您的Steam令牌未开启,无法向您发送报价');
                } else if (item.error_code === 8) {
                  this.$toast('由于您的Steam交易链接有误,无法给您发送报价');
                } else if (item.error_code === 9) {
                  this.$toast('由于您的Steam账号交易权限被禁,无法给您发送报价');
                } else if (item.error_code === 11) {
                  this.$toast('报价失败,可能是当前Steam服务器繁忙或其它原因');
                } else if (item.error_code === 6) {
                  this.$toast('由于您的Steam账号设置为隐私,无法发送报价');
                }
                self.offeridList = self.offeridList.replace(item.offer_id, '')
              } else if (item.status === 'success') {
                self.offeridList = self.offeridList.replace(item.offer_id, '')
              }
            }
          } else {
            clearInterval(self.realInterval)
          }
        }, error => {
          this.init()
          clearInterval(self.realInterval)
        }
      )
      } else {
        this.init()
        clearInterval(self.realInterval)
      }
    },
    chose (item, index) {
      if (item === 'all') { // 全选
        if (this.choseAll) {
          for (let i in this.goodsList) {
            this.$set(this.goodsList[i], 'chose', false)
            this.active = false
          }
        } else {
          for (let i in this.goodsList) {
            this.$set(this.goodsList[i], 'chose', true)
          }
        }
      } else { // 单选
        if (item.state === 6) {
        } else {
          if (this.goodsList[index].chose) {
            this.$set(this.goodsList[index], 'chose', false)
          } else {
            this.$set(this.goodsList[index], 'chose', true)
          }
          if (this.goodsList.find(x => x.chose !== true)) {
            this.choseAll = false
          } else {
            this.choseAll = true
          }
          if (this.goodsList.find(x => x.chose === true)) {
            this.active = true
          } else {
            this.active = false
          }
        }
      }
    },
    baojiaTxt (item) {
      if (item.error_code === 1) {
        return item.error_info
      } else if (item.error_code === 2) {
        return '报价已发送,去接受报价'
      } else if (item.error_code === 10) {
        return '由于您的Steam手机令牌绑定未超过7天,不能取回'
      } else if (item.error_code === 14) {
        return '此报价已被取消,请稍后再试'
      } else if (item.error_code === 15) {
        return '您已拒绝此报价,请稍后再试'
      } else if (item.error_code === 4) {
        return '报价发送失败,请稍后再试'
      } else if (item.error_code === 7) {
        return '由于您的Steam令牌未开启,无法向您发送报价'
      } else if (item.error_code === 8) {
        return '由于您的Steam交易链接有误,无法给您发送报价'
      } else if (item.error_code === 9) {
        return '由于您的Steam账号交易权限被禁,无法给您发送报价'
      } else if (item.error_code === 11) {
        return '报价失败,可能是当前Steam服务器繁忙或其它原因'
      } else if (item.error_code === 12) {
        return '由于您修改此笔交易报价,报价已取消,请稍后在试'
      } else if (item.error_code === 13) {
        return '由于您长时间未接受报价,此报价已过期,请稍后在试'
      } else if (item.error_code === 6) {
        return '由于您的Steam账号设置为隐私,无法发送报价'
      } else if (item.status === 'success') {
        return '交易报价处理完成。'
      } else {
        return '报价发生错误,请稍后再试'
      }
    },
    baojiaClick (item) {
      if (item.status === 'sent' && item.error_code === 2) {
        window.open('https://steamcommunity.com/tradeoffer/' + item.trade_offer_id + '/')
      } else {
        if (item.error_code !== 1) {
          this.getList()
          if (this.offeridListArr && this.offeridListArr.length > 0) {
            for (var i = 0; i < this.offeridListArr.length; i++) {
              if (item.offer_id === this.offeridListArr[i]) {
                this.offeridListArr.splice(i, 1)
                this.offeridList = this.offeridListArr.join(',')
              }
            }
          } else {
            clearInterval(this.realInterval)
            this.autocheckResList = []
          }
        }
      }
    },
    onGetSteam () {
      var self = this
      this.autocheckResList = []
      api.center.selectGoodsStatusforTakeOut({appId: this.params.appId}).then(
        res => {
          if (res.data.length > 0) {
            this.offeridListArr = []
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].outOfferId !== null && res.data[i].outOfferId !== '') {
                this.offeridListArr.push(res.data[i].outOfferId)
              }
            }
            if (this.offeridListArr && this.offeridListArr.length > 0) {
              this.offeridListArr = Array.from(new Set(this.offeridListArr))
            }
            this.offeridList = this.offeridListArr.join(',')
            clearInterval(this.realInterval)
            this.realInterval = setInterval(() =>{
              self.autocheck()
            }, 2000)
          }
        }
      )
    },
    timeDown (item) {
      var time = (new Date(item.create_at) - 1 + 1) / 1000
      if ((time - this.sysTime + 300).toFixed(0) > 0) {
        return ((time - this.sysTime + 300).toFixed(0))
      } else {
        return '0'
      }
    }
  },
  filters: {
    priceFloat (value) {
      if (value) {
        return value.toFixed(2)
      } else {
        return value
      }
    },
  }
}
</script>
<style type="text/css" scoped >
.itemMask {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(128,128,128,0.7);
  line-height: 115px;
  text-align: center;
  color: white
}
</style>