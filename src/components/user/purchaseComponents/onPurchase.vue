<template>
<div>
  <div class="wanted-handler-search filter-block" style="padding-bottom:.1rem">
      <div class="search-box clearfix" style="padding-bottom: 0">
          <div class="box fl">
              <input class="fl" type="text"  placeholder="请输入饰品关键字" v-model="queryParams.categoryName" @keyup.enter="search">
          </div>
      </div>
  </div>

  <div class="">
      <!-- 正在求购 -->
      <div class="tab-item" style="display: ;">
          <ul class="item-list">
            <div v-waterfall-lower="loadMore" :waterfall-disabled="disabled" waterfall-offset="200">
              <li class="list-item" style="border-bottom: 0" v-for="item in purchaseList" :key="item.id">
                  <div class="number-line clearfix">
                      <div class="num fl">
                          <span>订单号:</span>
                          <span>{{item.orderId}}</span>
                      </div>
                      <div class="time fr">
                          <span>{{item.createTime}}</span>
                      </div>
                  </div>
                  <div class="goods-box">
                      <div class="img-box">
                          <img class="dota" :src="imgUrl +item.imgUrl" alt="">
                          <!-- <span class="goods-tip color1">不朽</span> -->
                      </div>
                      <div class="detail">
                          <div class="above clearfix">
                              <span class="name fl">{{item.title||item.purchaseType}}</span>
                              <span class="color fr">正在求购</span>
                          </div>
                          <div class="below clearfix">
                              <span class="price fl">￥{{item.price}}</span>
                              <span class="btn fr" @click="cancelPurchaseId = item.orderId;confirmBox = true">取消求购</span>
                              <span class="count fr">{{item.dealNum}}/{{item.num}}</span>
                          </div>
                      </div>
                  </div>
              </li>
            </div>
          </ul>
          <transition name="van-fade" v-if="!nomore">
            <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
          </transition>
          <div class="no-more" v-if="nomore">
            <img src="~img/icon/empty.png" alt="">
            <p>抱歉，没有更多记录~</p>
          </div>
      </div>
      
  </div>
  
  <!-- 温馨提示 -->
  <transition name='van-fade'>
    <div class="bomb" v-if="confirmBox">
      <div class="content">
          <div class="title">
              <span>温馨提示</span>
          </div>
          <div class="tip">
              <span>是否确定取消求购</span>
          </div>
      </div>
      <div class="btn-box">
          <span class="btn-left fl" @click="confirmBox = false">取消</span>
          <span class="btn-right fr" @click="cancelPurchase()">确定</span>
      </div>
  </div>
   </transition>
   
  <!-- 弹框背景 -->
    <transition name='van-fade' >
    <div class="mask" v-if="confirmBox"></div>
    </transition>
    
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
      queryParams:{
        status:20,
        pageNum:1,
        pageSize:10,
        appId:578080,
        categoryName: ''
      },
      purchaseList:[],
      confirmBox:false,
      cancelPurchaseId:'',
      disabled: false,
      nomore: false,
      total: 0
    }
  },
  components: {
  },
  created () {
    document.title = '正在求购-skins5173'
    if (this.$route.query.appId > 0) {
      this.queryParams.appId = this.$route.query.appId
    }
    this.getPurchaseList()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.queryParams.appId = to.query.appId
      this.queryParams.pageNum = 1
      this.getPurchaseList('init')
    }
  },
	methods: {
    loadMore () {
      if (this.purchaseList.length < this.total) {
        this.getPurchaseList()
      } else {
        this.nomore = true
      }
    },
    getPurchaseList (item) {
      this.nomore = false
      api.center.page(this.queryParams).then(res => {
        if (item === 'init') {
          this.purchaseList = []
        }
        this.nomore = false
        this.queryParams.pageNum ++
        this.total = res.data.total
        this.purchaseList = this.purchaseList.concat(res.data.list)
      })
    },
    search () {
      this.queryParams.pageNum = 1
      this.getPurchaseList('init')
    },
    cancelPurchase () {
      api.center.finish({purchaseOrderId:this.cancelPurchaseId}).then(
        res => {
          if (res.data === '') {
              this.$toast('取消成功')
              setTimeout(() => {
                this.queryParams.pageNum = 1
                this.getPurchaseList('init')
                this.confirmBox = false
              })
            }
        }
      )
    }
	}
}
</script>
