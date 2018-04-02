<template>
<div>
  <div v-show="!detailShow" ref="scroll">
    <div class="common-top">
        <a href="javascript:history.go(-1)">
            <div class="back"></div>
        </a>
        <h2 class="top-title">购买记录</h2>
        <a href="">
            <div class="top-right"></div>
        </a>
    </div>
    <div class="mt-96">
        <div class="chack-tab" @click="searchShow=!searchShow">
            <span class="icon-arrow">订单查询</span>
        </div>
        <!-- 订单查询下拉 -->
        <div v-if="searchShow">
            <div class="chack-item">
                <div class="title">
                    <span>支付类型</span>
                </div>
                <div class="tips-box clearfix">
                    <span class="tips-item fl"  @click="params.payType = ''" :class="{'active':params.payType == ''}">不限</span>
                    <span class="tips-item fl"  @click="params.payType = 1" :class="{'active':params.payType == 1}">金额支付</span>
                    <span class="tips-item fl"  @click="params.payType = 2" :class="{'active':params.payType == 2}">贝壳支付</span>
                </div>
            </div>
            <div class="chack-item">
                <div class="title">
                    <span>支付状态</span>
                </div>
                <div class="tips-box clearfix">
                    <span class="tips-item fl" @click="params.state = ''" :class="{'active':params.state == ''}">不限</span>
                    <span class="tips-item fl" @click="params.state = 1" :class="{'active':params.state == 1}">待支付</span>
                    <span class="tips-item fl" @click="params.state = 2" :class="{'active':params.state == 2}">已支付</span>
                    <span class="tips-item fl" @click="params.state = 3" :class="{'active':params.state == 3}">购买成功</span>
                    <span class="tips-item fl" @click="params.state = 4" :class="{'active':params.state == 4}">交易取消</span>
                    <span class="tips-item fl" @click="params.state = 5" :class="{'active':params.state == 5}">已退款</span>
                </div>
            </div>
            <div class="select-confirm">
                <span class="btn" @click="searchShow=!searchShow;init()">重置</span>
                <span class="btn active" @click="searchShow=!searchShow;search()">确定</span>
            </div>
        </div>
        <!-- 查询未下拉 -->
        <van-pull-refresh v-model="isLoading" @refresh="init">
        <div v-waterfall-lower="loadMore"  :waterfall-disabled="disabled" waterfall-offset="200">
        <div v-if="!searchShow">
            <div class="recode-box" style="padding-bottom:.2rem;margin-bottom:.2rem" v-for="item in buyList" :key="item.id" @click="checkDetail(item)">
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
                    <span class="btn fr" v-if="item.state == 1" @click="pay(item.orderId)">继续支付</span>
                    <span class="btn fr" v-if="item.state == 1" style="margin-right:.1rem;background:#999" @click="deleteOrder(item.orderId)">取消订单</span>
                </div>
            </div>
        </div>
        </div>
        </van-pull-refresh>
        <transition name="van-fade" v-if="!nomore && !searchShow">
          <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
        </transition>
        <div class="no-more" v-if="nomore && !searchShow">
            <img src="~img/icon/empty.png" alt="">
            <p>没有更多了~</p>
        </div>
    </div>
  </div>
  <van-popup v-model="detailShow" position="right" :overlay="false" style="height:100%;width:100%">
    <buylog-detail v-if="detailShow" :orderId='orderId' :item="infoItem" :deleteOrder="deleteOrder" :pay="pay" :closeInfo='closeInfo' />
  </van-popup>
</div>
</template>
<script>
import api from 'api'
import { Waterfall } from 'vant';
export default {
  directives: {
    WaterfallLower: Waterfall('lower') 
  },
  data () {
    return {
      params: {
        'pageQuery.pageNum': 1,
        'pageQuery.pageSize': 10,
        startDate: '',
        endDate: '',
        state: '',
        payType: ''
      },
      buyList: [],
      total: [],
      isLoadMore:false,
      isLoading: false,
      disabled: true,
      nomore: false,
      searchShow: false,
      detailShow:false,
      infoItem: [],
      orderId: '',
      scrollHeight: 0
    }
  },
  created () {
    this.init()
  },
  components: {
    'buylog-detail': resolve => { require(['@/components/user/buylogDetail.vue'], resolve) },
  },
  methods: {
    closeInfo () {
      this.detailShow = false
      setTimeout(() => {
        window.scrollTo(0, this.scrollHeight)
      }, 50)
    },
    loadMore () {
      if (this.searchShow) {
        return
      }
      if (this.buyList.length < this.total) {
        if (!this.detailShow) {
          this.params['pageQuery.pageNum'] ++
          this.getList()
        }
      } else {
        this.nomore = true
      }
    },
    init () {
      this.params = {
        'pageQuery.pageNum': 1,
        'pageQuery.pageSize': 10,
        startDate: '',
        endDate: '',
        state: '',
        payType: ''
      }
      this.getList('init')
    },
    search () {
      this.params['pageQuery.pageNum'] = 1
      this.getList('init')
    },
    getList (item) {
      this.isLoadMore = true
      api.order.getBuyList(this.params).then((res) => {
        if (item === 'init') {
          this.buyList = []
        }
        if (res && res.status === 200) {
          this.isLoading = false
          this.isLoadMore = false
          if (res.data.list.length > 0) {
            this.buyList = this.buyList.concat(res.data.list)
            this.nomore = false
          }
          this.total = res.data.total
        }
      })
    },
    pay (orderId) {
      api.order.payment(orderId).then((res) => {
        if (res && res.status === 200) {
          res.data = res.data.replace('Payment/PayDirectly.aspx', 'PaymentWap/PayExternalV2.aspx')
					window.location.href = res.data
        }
      })
    },
    deleteOrder (orderId) {
      api.order.deleteOrder(orderId).then((res) => {
        if (res && res.status === 200) {
          this.$toast('取消订单成功')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        };
      })
    },
    checkDetail (item) {
      this.scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop
      this.infoItem = item
      this.orderId = item.orderId
      this.detailShow = true
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