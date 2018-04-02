<template>
<div>
<div id="wrapper" class="pb-200">
        <div class="common-top">
            <a href="javascript:history.go(-1)">
                <div class="back"></div>
            </a>
            <h2 class="top-title">购物车</h2>
            <a >
                <div class="top-right" style="color:white" @click="deleteAllitem()">清空购物车</div>
            </a>
        </div>
        <div class="mt-96">
          <transition-group name="van-fade">
            <div class="buyCar-item" v-for="item,index in carList" :key="item.id">
                <i class="icon-select" :class="{'active':item.checked,'unable':item.state !== 1}" @click="shopItemCheck(item,index)" ></i>
                <div class="box clearfix">
                    <div class="img-box fl">
                        <img class="cs" :src="imgUrl + item.img">
                    </div>
                    <div class="detail fl">
                        <div class="title"><span>{{item.title}}</span></div>
                        <div class="tips-box clearfix">
                            <div class="tips fl">
                                <span class="item" v-for="prop in item.properties">{{prop.name}}</span>
                            </div>
                            <div class="fr">
                              <!-- <span @click="deleteItem(item)">删除</span> -->
                                <span class="price">￥{{item.price}}</span>
                            </div>
                        </div>
                        <!-- 售罄显示 -->
                        <i class="sell-out" v-if="item.state !== 1"></i>
                    </div>
                </div>
                <div class="handler-box clearfix">
                   <span class="btn fr" @click="deleteItem(item)">删除</span>
                </div>
            </div>
          </transition-group>
            <!-- 空购物车 -->
            <div class="empty-buyCar" v-show="carList.length < 1">
                <span class="icon-empty"></span>
                <span class="empty-word">购物车暂无饰品</span>
                <router-link :to="{name:'goodsList',query:{appId:578080}}">
                  <span class="empty-btn">去商城</span>
                </router-link>
            </div>
        </div>
        <!-- 底部支付按钮 -->
        <!-- 底部支付的话加fixed-bottom-pay类名 -->
        <div class="fixed-bottom-pay bottom-pay clearfix">
            <div class="buyCar-total-money">
                <!-- 选中加active -->
                <span class="select-all fl" :class="{'active':checkedAll}" @click="shopItemCheck('all')">全选</span>
                 <!-- <span style="margin-left:0.2rem" @click="onEdit = !onEdit">{{onEdit?'编辑中':'编辑'}}</span> -->
                <div class="money-box fr" v-show="!onEdit">
                    <span class="shell">
                        <em class="word">所需贝壳</em>
                        <span class="icon-shell num">{{(totalPrice * 0.95).toFixed(2)}}</span>
                    </span>
                    <span class="money">
                        <em class="word">合计</em>
                        <span class="num">￥{{(totalPrice).toFixed(2)}}</span>
                    </span>
                </div>
            </div>
            <div v-show="!onEdit">
                <a class="shell-pay pay-btn" @click="showPayDialog('SHELL')">贝壳兑换</a>
                <a class="money-pay pay-btn" @click="showPayDialog('MONEY')">现金结算</a>
            </div>
            <div v-show="onEdit">
                <a class="shell-pay pay-btn">删除选中</a>
                <a class="money-pay pay-btn">清空购物车</a>
            </div>
        </div>
    </div>
    <shell-pay-dialog v-if="shellpay" :payItem='payItem' :pay="pay" :type="type" :payclose='payclose'></shell-pay-dialog>
</div>
</template>
<script>
import api from 'api'
import { Dialog } from 'vant';
export default {
  data () {
    return {
      carList:{},
      totalPrice:0.00,
      checkedAll:false,
      onEdit:false,
      buyParams:{
        type:1
      },
      shellpay:false,
      payItem:{
        id:[],
        price:''
      },
      params: {
        buyCount: 0,
				goodsIds: [],
				payType: '',
				type: 1
      },
      type: ''
    }
  },
  components: {
    'shell-pay-dialog': resolve => {require(['@/components/common/shellPayDialog.vue'], resolve)}
  },
  created () {
    this.getCarList()
  },
  methods: {
    payclose () {
      this.shellpay = false
      this.payItem.price = 0
      this.payItem.default = []
    },
    showPayDialog (type) {
      var price = 0
      this.params.buyCount = 0
      this.params.goodsIds = []
      for (var i = 0; i<this.carList.length; i++) {
        if (this.carList[i].checked) {
          this.payItem.id.push(this.carList[i].goodsId)
          price = this.payItem.price -1 +1
          price += this.carList[i].price
          this.params.goodsIds.push(this.carList[i].goodsId)
          this.params.buyCount ++
          this.payItem.price = price
        }
      }
      if (this.params.buyCount <= 0) {
        this.$toast('请选择饰品')
        return
      }
      this.type = type
      this.shellpay = true
    },
    pay (item, type) {
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
    },
    getCarList () {
        api.buyCar.getCarList().then(
        (res) => {
          this.carList = res.data
        }
      )
    },
    deleteItem (item) {
      api.buyCar.deleteCart(item.id).then(
        res => {
          if (res.data == true) {
            this.getCarList()
            this.checkedAll = false
          }
        }
      )
    },
    deleteAllitem () {
      Dialog.confirm({
        // title: '标题',
        message: '是否清空购物车？'
      }).then(() => {
        api.buyCar.deleteCartAll().then(
          res => {
            if (res.data) {
              this.getCarList()
            }
          }
        )
      }).catch(() => {
        // on cancel
      });
      
    },
    shopItemCheck (item,index) {
      if (item === 'all') { // 全选
        if (this.checkedAll) {
          for (let i in this.carList) {
            if (this.carList[i].state == 1) {
              this.$set(this.carList[i], 'checked', false)
            }
          }
          this.checkedAll = false
        } else {
          for (let i in this.carList) {
            if (this.carList[i].state == 1) {
              this.$set(this.carList[i], 'checked', true)
            }
          }
           this.checkedAll = true
        }
      } else {
        if (item.state !== 1) {
        } else {
          if (this.carList[index].checked) {
            this.$set(this.carList[index], 'checked', false)
          } else {
            this.$set(this.carList[index], 'checked', true)
          }
          if (this.carList.find(x => x.checked !== true)) {
            this.checkedAll = false
          } else {
            this.checkedAll = true
          }
        }
      }
      if(item.state == 1 || item == 'all') {
        this.totalPrice = 0
        for (var i = 0; i<this.carList.length; i ++) {
          if (this.carList[i].checked) {
            this.totalPrice += this.carList[i].price
          }
        }
      } else {
        return
      }
    } 
  }
}
</script>
