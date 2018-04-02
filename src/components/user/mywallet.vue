<template>
<div>
  <div class="common-top">
		<a href="javascript:history.go(-1)">
			<div class="back"></div>
		</a>
		<h2 class="top-title">我的钱包</h2>
		<a href="">
			<div class="top-right"></div>
		</a>
	</div>

	<div class="mt-96">
		<div class="set-item wallet-item ">
			<div class="box clearfix">
				<span class="front fl">我的余额<em> (￥)</em></span>
				<span class="price fl">{{info.balance}}</span>
				<a href="http://user.5173.com/m/withdrawals/blance" ><span class="btn fr">提现</span></a>
			</div>
		</div>
		<div class="set-item wallet-item">
			<div class="box clearfix">
				<span class="front fl">求购冻结金<em> (￥)</em></span>
				<span class="word fl">{{info.frozenMoney}}</span>
				<i class="icon-pro fr" @click="showtips=true"></i>
			</div>
		</div>
		<!-- <div class="set-item wallet-item">
			<div class="box clearfix">
				<span class="front fl">我的押金<em> (￥)</em></span>
				<span class="word fl">{{info.balance}}</span>
				<i class="icon-pro fr"></i>
			</div>
		</div> -->
		<div class="set-item wallet-item " >
			<div class="box clearfix">
				<span class="front fl">我的贝壳<em> (￥)</em></span>
				<span class="word fl">{{$store.state.accountInfo.shell || 0}}</span>
			</div>

		</div>
	</div>
	<div class="bomb problem-bomb" style="margin-top: -2.5rem;" v-if="showtips">
			<div class="content">
					<div class="title">求购冻结金</div>
					<div class="tip">
							冻结金额是您发起求购时缴纳的总金额，求得一件饰品，则减少这件饰品的冻结金，直到求购完成，冻结金额减为0，若求购撤销，则将未得到饰品的冻结金额自动原路返回。
					</div>
			</div>
			<div class="btn-box">
					<span class="know" @click="showtips=false">
							朕知道了
					</span>
			</div>
	</div>
	<!-- 弹框背景 -->
	<div class="mask" v-show="showtips"></div>
</div>
</template>
<script>
import api from 'api'
export default {
  data () {
    return {
			showtips: false,
			info: {}
    }
  },
  components: {
  },
  created () {
		document.title = '我的钱包-skins5173'
		this.getInfo()
	},
	methods: {
		getInfo () {
			api.center.brief().then(res => {
				if (res.status == 200 && res.data) {
					this.info = res.data
				}
			})
		}
	}
}
</script>
