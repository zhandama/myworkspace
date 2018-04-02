<template>
<div id="wrapper" style="height:100%;overflow:scroll;">
    <div class="common-top">
        <a href="javascript:" @click="closeInfo">
            <div class="back"></div>
        </a>
        <h2 class="top-title">饰品详情</h2>
        <a href="">
            <div class="top-right"></div>
        </a>
    </div>
		<div class="detail mt-96">
				<div class="goods-info">
						<div class="img-box">
							<img :class="{'dota':item.app_id=='570','pubg':item.app_id=='578080','cs':item.app_id=='730'}" v-if="item.img_url" :src="imgUrl + item.img_url" />
						</div>
						<div class="goods-detail-info">
								<div class="title">{{item.title}}</div>
								<div class="tips">
										<span class="tips-item"  :class="'tip-theme'+ index" v-for="(item, index) in infoCategory" :key="item.name">{{item.name}}</span>
										<!-- <span class="tips-item tip-theme2">军规级</span>
										<span class="tips-item tip-theme3">微型冲锋枪</span> -->
								</div>
								<div class="description clearfix">
										<div class="title fl">卖家描述</div>
										<div class="content fl">
												<span class="item">{{item.sell_description||'暂无'}}</span>
										</div>
								</div>
						</div>
				</div>

				<div class="container clearfix">
						<div class="price-box fl">
								<span class="span-price fl">售价<em class="price">￥{{item.price}}</em></span>
								<span class="span-shell fl">{{(item.price * 0.95).toFixed(2)}}</span>
						</div>
						<div class="avatar-box fr">
								<img class="avatar fl" v-if="item.avatar" :src="item.avatar" alt="">
								<img class="avatar fl" v-else src="~img/icon/avatar-2x.png" alt="">
								<span class="avatar-name fl">{{item.user_name}}</span>
						</div>
				</div>

				<div class="container"  v-if="description">
						<div class="introduce" v-for="item in description" v-if="description && item.value && item.value!=' '" :key="item.value" v-html="item.value">
							
						</div>
				</div>
		</div>
		<!-- 底部支付按钮 -->
		<div class="select-confirm bottom-pay">
				<a class="shell-pay pay-btn" href="javascript:void(0)" @click="getshellpay(item,'SHELL')">贝壳支付</a>
				<a class="money-pay pay-btn" href="javascript:void(0)" @click="getshellpay(item,'MONEY')">金额支付</a>
		</div>
		<shell-pay-dialog v-if="shellpay" :payItem='payItem' :type="type" :pay="pay" :payclose='payclose'></shell-pay-dialog>
</div>
</template>
<script>
import api from 'api'
import {mapState} from 'vuex'
import {isLogin} from '@/common/index.js' 
export default {
	props: {
    closeInfo: Function,
    item: {
      default: []
		},
		infoCategory: {
      default: []
		}
  },
  data () {
    return {
			description: '',
			shellpay: false,
			payItem: [],
			type: ''
    }
	},
	components: {
    'shell-pay-dialog': resolve => { require(['@/components/common/shellPayDialog.vue'], resolve) }
	},
	computed: {
    ...mapState({
      isLogin: state => {
        return state.isLogin
      }
    })
  },
  created () {
		if (this.item.description.length > 0) {
			this.description = JSON.parse(this.item.description.replace('jsonp', ''))
		}
  },
  methods: {
		payclose () {
      this.shellpay = false
    },
		getshellpay (item, type) {
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
            }, 1000)
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
  }
}
</script>