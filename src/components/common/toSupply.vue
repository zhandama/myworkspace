<template>
<div  class="pb-200">
  <div class="common-top">
    <a href="javascript:" @click="closeInfo">
        <div class="back"></div>
    </a>
    <h2 class="top-title">供应</h2>
    <a href="">
        <div class="top-right"></div>
    </a>
  </div>
  <!-- 供应 -->
  <div class="mt-96">
      <div class="supply-box">
          <div class="tip-box">
              <!-- 关闭提示时，保留上面的tip类名div，关闭content类名div -->
              <div class="content" v-if="!searchItems.whether">您有商品正在盘库中，只展示部分可供饰品。</div>
          </div>
          <div class="supply-list">
              <ul class="clearfix">
                  <li class="fl" :class="{'active':item.chose}" @click="chose(item, index)" v-for="(item, index) in searchItems.searchItems" :key="item.item_id">
                      <div class="img-box">
                          <img :class="{'dota':item.app_id=='570','pubg':item.app_id=='578080','cs':item.app_id=='730'}" v-if="item.img_url" :src="imgUrl + item.img_url" />
                          <!-- <span class="tip">崭新出厂</span> -->
                          <div class="abrase-bar">
                              <span class="num" v-if="item.app_id=='730' && item.abrasion">磨损：<em>{{item.abrasion == 0 ? '无':item.abrasion}}</em></span>
                              <span class="num" v-else>{{item.title}}</span>
                          </div>
                          <!-- 选中时显示 -->
                          <i class="icon-selected"></i>
                      </div>
                  </li>
              </ul>
          </div>

          <div class="empty" v-if="searchItems.searchItems.length < 1">
              <img src="~img/icon/empty-buyCar.png" alt="">
              <p class="word">暂无对应饰品</p>
          </div>
      </div>
  </div>
  <!-- 底部按钮 -->
  <div class="wanted-bottom-btn">
      <ul class="clearfix">
          <li class="price-btn fl">
              <span>出售可得</span>
              <span class="price">￥{{allprice}}</span>
          </li>
          <li class="wanted-btn fl" @click="publish">
              <span class="">确认</span>
          </li>
      </ul>
  </div>
</div>
</template>
<script>
import api from 'api'
import { Dialog } from 'vant'
export default {
  props: {
    closeInfo: Function,
    searchItems: {
      default:[]
    },
    item: {
      default: []
    }
  },
  data () {
    return {
      params: {
        buyCount: '',
        checkPrice: this.item.price,
        goodsIds: [],
        purchaseOrderId: this.item.id,
        type: 2
      },
      allprice: ''
    }
  },
  // created () {
  //   console.log(this.item)
  // },
  methods: {
    chose (item, index) {
      if (this.searchItems.searchItems[index].chose) {
        this.$set(this.searchItems.searchItems[index], 'chose', false)
      } else {
        this.$set(this.searchItems.searchItems[index], 'chose', true)
      }
      this.params.goodsIds = []
      this.allprice = ''
      this.params.buyCount = 0
      for (let item of this.searchItems.searchItems) {
        if (item.chose) {
          this.params.goodsIds.push(item.id)
          this.params.buyCount++
          this.allprice = this.params.buyCount * this.item.price
        }
      }
    },
    publish () {
      if (this.params.buyCount < 1) {
        this.$toast('请先选择供应饰品')
        return
      }
      Dialog.confirm({
        title: '确定出售该饰品？',
        message: ' '
      }).then(() => {
        api.order.createdOrder(this.params).then((res) => {
          if (res && res.status === 200 && res.data) {
            this.$toast('出售成功')
            setTimeout(() => {
              window.location.reload()
            }, 2000)
        	}
        })
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>
