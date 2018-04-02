<template>
<div  class="pb-200">
  <div class="common-top">
    <a href="javascript:" @click="closeInfo">
        <div class="back"></div>
    </a>
    <h2 class="top-title">批量购买</h2>
    <a href="">
        <div class="top-right"></div>
    </a>
  </div>
  <div class="mt-96">
      <div class="batch-item">
          <div class="box clearfix">
              <span class="item-name fl">最高价格<em class="unit">(￥)</em></span>
              <input type="number" maxlength="6" placeholder="请输入最高价格" v-model="price" @input="getSelectStock">
              <!-- <span class="btn fr" @click="getSelectStock">查询</span> -->
          </div>
      </div>
      <div class="batch-item clearfix">
          <div class="box clearfix">
              <span class="item-name fl">符合件数<em class="unit">(件)</em></span>
              <input type="number" :value="lists.length" disabled style="background:#fff">
          </div>
      </div>
      <div class="batch-item clearfix">
          <div class="box clearfix">
              <span class="item-name fl">购买数量<em class="unit">(件)</em></span>
            <!-- <input type="number" maxlength="6" placeholder="请输入购买件数" v-model="params.buyCount" @input="checkNo()" @focus="checkNo">    -->
            <div class="count-box fl clearfix">
                <span class="count-num icon-reduce fl" @click="params.buyCount > 1?params.buyCount--:params.buyCount;checkNo()"></span>
                <input class="count-input fl" type="tel"  maxlength="" v-model="params.buyCount" disabled style="background:#fff">
                <span class="count-num icon-add fl" @click="params.buyCount < 99 ?++params.buyCount:params.buyCount;checkNo()"></span>
            </div>
          </div>
      </div>
      <div class="batch-item clearfix">
          <div class="box clearfix">
              <span class="item-name fl">所需贝壳<em class="unit">(个)</em></span>
              <input type="number" :value="(allprice*0.95).toFixed(2)" disabled style="background:#fff">
          </div>
      </div>

      <div class="batch-my-shell clearfix">
          <span class="item-name fl">我的贝壳<em class="unit">(个)</em></span>
          <span class="num">{{$store.state.accountInfo.shell}}</span>
      </div>
  </div>
  <div class="fixed-bottom-pay bottom-pay clearfix">
      <div class="batch-total-money">
          <span class="span-name">预计总金额</span>
          <span class="price">￥{{allprice.toFixed(2)}}</span>
      </div>
      <div>
          <a class="shell-pay pay-btn" href="javascript:void(0)" @click="geyshellpay('','SHELL')">贝壳兑换</a>
          <a class="money-pay pay-btn" href="javascript:void(0)" @click="geyshellpay('','MONEY')">原价支付</a>
      </div>
  </div>
  <shell-pay-dialog v-if="shellpay" :payItem='payItem' :type="type" :pay="pay" :payclose='payclose'></shell-pay-dialog>
</div>
</template>
<script>
import api from 'api'
export default {
  props: {
    closeInfo: Function,
    appId: {
      default: ''
    },
    itemId:{
      default: ''
    }
  },
  data () {
    return {
      value: '',
      price: '',
      params: {
        buyCount: 0,
        goodsIds: [],
        type: 1 // 购买需要传1
      },
      lists: [],
      allprice: 0,
      payItem: [],
      shellpay: false,
      type: ''
    }
  },
  components: {
    'shell-pay-dialog': resolve => { require(['@/components/common/shellPayDialog.vue'], resolve) }
  },
  methods: {
    checkNo () {
      this.allprice = 0
      this.params.goodsIds = []
      if (this.lists.length === 0) {
        this.$toast('请输入正确的价格或购买数量')
      }
      if (this.params.buyCount > this.lists.length) {
        this.params.buyCount = this.lists.length
      }
      for (let a = 0 ; a < this.params.buyCount; a++) {
        this.allprice = this.allprice + this.lists[a].price
        this.params.goodsIds.push(this.lists[a].goodsId)
      }
    },
    getSelectStock () {
      let params = {
        appId: this.appId,
        itemId: this.itemId,
        price: this.price || 0
      }
      api.goods.selectStock(params).then(res => {
        if (res.status == 200 && res.data) {
          this.lists = res.data.list
        }
      })
    },
    geyshellpay (item, type) {
      if (this.params.buyCount === '' || this.params.buyCount <= 0 || this.price == '' || this.price == 0) {
        this.$toast('请输入正确的价格或购买数量')
        return
      }
      this.payItem.price = this.allprice
      this.type = type
      this.shellpay = true
    },
    payclose () {
      this.shellpay = false
    },
    pay (id, type) {
      if (this.params.buyCount === '' || this.params.buyCount <= 0 || this.price == '' || this.price == 0) {
        this.$toast('请输入正确的价格或购买数量')
        return
      }
			this.params.payType = type
      api.order.createdOrder(this.params).then(res => {
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
    }
  }
}
</script>
