<template>
<div  class="pb-200">
  <div class="common-top">
    <a href="javascript:" @click="closeInfo">
        <div class="back"></div>
    </a>
    <h2 class="top-title">我要求购</h2>
    <a href="">
        <div class="top-right"></div>
    </a>
  </div>
  <div class="mt-96">
      <!-- 商品信息 -->
      <div class="wanted-goods-info clearfix">
          <div class="wanted-price-tip clearfix" v-if="allNum > 0">
              <span class="word fl"><em>{{allNum}}</em>件饰品正在出售，最低价:<em v-if="buyItem.price">￥{{buyItem.price}}</em></span>
              <a class="to-buy fl" href="javascript:void(0)" @click="closeInfo('sell')">去购买</a>
          </div>
          <div class="img-box fl">
              <!-- 对应游戏加对应类名dota pubg cs -->
              <img :class="{'dota':item.appId=='570','pubg':item.appId=='578080','cs':item.appId=='730'}" v-if="item.imgUrl" :src="imgUrl + item.imgUrl" />
              <img class="cs" src="~img/cs-hot1.png" alt="" v-else>
              <!-- <span class="tip">崭新出厂</span> -->
          </div>
          <div class="goods-detail fl">
              <div class="goods-title clearfix">
                  <i class="fl" :class="{'icon-dota':item.appId=='570','icon-pubg':item.appId=='578080','icon-cs':item.appId=='730'}"></i>
                  <span class="title fl">{{item.name}}</span>
              </div>
              <div class="goods-price">
                  <span class="word">当前市场价:</span>
                  <span class="price">￥{{item.marketPrice || 0}}</span>
              </div>
              <div class="goods-price">
                  <span class="word">求购最高价:</span>
                  <span class="price">￥{{item.maxPrice || 0}}</span>
              </div>
          </div>
      </div>
      <!-- 求购范围 -->
      <!-- <div class="wanted-range" >
          <span class="word">建议求购范围</span>
          <span class="price">￥9.45 ~ ￥107.45</span>
      </div> -->
      <div class="container clearfix">
          <span class="front-title fl">求购单价<em class="unit">(￥)</em></span>
          <input class="input-price fl" placeholder="请输入单价不得低于0元" type="tel" v-model="params.price" maxlength="6" @input="checkNo">
      </div>
      <div class="container clearfix">
          <span class="front-title fl">求购件数<em class="unit">(件)</em></span>
          <div class="count-box fl clearfix">
              <span class="count-num icon-reduce fl" @click="params.num > 1?params.num--:params.num;checkNo()"></span>
              <input class="count-input fl" type="tel"  maxlength="" v-model="params.num" disabled style="background:#fff">
              <span class="count-num icon-add fl" @click="params.num < 99 ?++params.num:params.num;checkNo()"></span>
          </div>
      </div>
  </div>
  <!-- 底部按钮 -->
  <div class="wanted-bottom-btn">
      <ul class="clearfix">
          <li class="price-btn fl">
              <span>实付金额</span>
              <span class="price">￥{{allprice}}</span>
          </li>
          <li class="wanted-btn fl" @click="publish">
              <span class="">提交求购</span>
          </li>
      </ul>
  </div>
</div>
</template>
<script>
import api from 'api'
export default {
  props: {
    closeInfo: Function,
    getShowInfo: Function,
    item: {
      default: []
    },
    buyItem: {
      default: []
    },
    appId: {
      default: ''
    },
    itemId:{
      default: ''
    },
    allNum:{
      default: 0
    },
    minPrice:{
      default: 0
    }
  },
  data () {
    return {
      params: {
        appId: this.appId,
        itemId: this.itemId,
        num: 1,
        price: ''
      },
      allprice: 0
    }
  },
  // created () {
  //   console.log(this.item)
  // },
  methods: {
    checkNo () {
      if (this.params.price === '') {
        this.$toast('请先输入价格')
      }
      this.params.price = this.params.price.replace(/[^\d.]/g, '')
        .replace(/^\./g, '')
        .replace(/\.{2,}/g, '.')
        .replace('.', '$#$').replace(/\./g, '')
        .replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.allprice = Number(this.params.price * this.params.num).toFixed(2)
    },
    publish () {
      if (this.params.price === ''|| this.params.price == 0) {
        this.$toast('请先输入正确的价格')
        return
      }
      api.goods.publish(this.params).then(res => {
				if (res.status == 200 && res.data) {
          window.location = res.data.payUrl.replace('Payment/PayDirectly.aspx', 'PaymentWap/PayExternalV2.aspx')
				}
      })
    }
  }
}
</script>
