<template>
<div>
  <div class="common-top">
      <a href="javascript:" @click="closeInfo">
          <div class="back"></div>
      </a>
      <h2 class="top-title">购买记录详情</h2>
      <a href="">
          <div class="top-right"></div>
      </a>
  </div>
  <div class="mt-96">
      <!-- 查询未下拉 -->
      <div>
          <div class="recode-box">
              <div class="line-box clearfix">
                  <span class="front fl">订单号</span>
                  <span class="middle fl">{{item.orderId}}</span>
              </div>
              <div class="line-box clearfix">
                  <span class="front fl">订单状态</span>
                  <span class="middle fl">{{item.state|orderText}}</span>
              </div>
              <div class="line-box clearfix">
                  <span class="front fl">下单时间</span>
                  <span class="middle fl">{{item.createTime}}</span>
              </div>
              <div class="line-box clearfix">
                  <span class="front fl">饰品数量</span>
                  <span class="middle fl">{{item.realNum}}</span>
              </div>
              <div class="line-box clearfix">
                  <span class="front fl">商品合计</span>
                  <span class="middle price fl">￥{{item.totalPrice}}</span>
                  <!-- <span class="btn fr" v-if="item.state == 1" @click="pay(item.orderId)">继续支付</span>
                  <span class="btn fr" v-if="item.state == 1" style="margin-right:.1rem;background:#999" @click="deleteOrder(item.orderId)">取消订单</span> -->
              </div>
          </div>
          <div class="mt-20">
              <div class="goods-box" v-for="item in lists" :key="item.orderId">
                  <div class="img-box">
                      <img :class="{'dota':item.appId=='570','pubg':item.appId=='578080','cs':item.appId=='730'}" :src="imgUrl+item.itemImgUrl" alt="">
                      <!-- <span class="goods-tip color1">不朽</span> -->
                  </div>
                  <div class="detail">
                      <div class="above clearfix">
                          <span class="name fl">{{item.itemName}}</span>
                      </div>
                      <div class="below clearfix">
                          <i class="icon-logo fl" :class="{'icon-dota':item.appId=='570','icon-pubg':item.appId=='578080','icon-cs':item.appId=='730'}"></i>
                          <span class="nomal fl">{{item.appName}}</span>
                          <span class="color fr">￥{{item.price}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</template>
<script>
import api from 'api'
export default {
  props: {
    closeInfo: Function,
    deleteOrder: Function,
    pay: Function,
    orderId: {
      default: ''
    },
    item: {
      default: []
    }
  },
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.getList()
    },
    getList () {
      api.order.getOrderInfo(this.orderId).then((res) => {
        if (res.status === 200 && res.data) {
          this.lists = res.data.records
        }
      })
    }
  },
  filters: {
    orderText (status) {
      switch (status) {
        case 1:
          return '待支付'
        case 2:
          return '已支付'
        case 3:
          return '购买成功'
        case 4:
          return '交易取消'
        case 5:
          return '已退款'
        default:
          return '购买失败'
      }
    }
  }
}
</script>
