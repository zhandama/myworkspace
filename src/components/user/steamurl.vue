<template>
<div>
  <div class="common-top">
			<a href="javascript:history.go(-1)">
					<div class="back"></div>
			</a>
			<h2 class="top-title">交易链接</h2>
			<a href="javascript:" @click="saveUrl">
					<div class="top-right">
							<span>保存</span>
					</div>
			</a>
	</div>
	<div class="mt-96">
			<div class="textarea-box">
					<textarea v-model="params.dealUrl"></textarea>
					<span class="num-count">30</span>
			</div>
			<div class="exp-box">
					<div class="title">说明</div>
					<p class="word-p">1.讲游戏中饰品托管到5173平台前，您必须确认交易URL是否有效，同时STEAM库存是公开的。</p>
					<p class="word-p">2.<a class="link" :href="'https://steamcommunity.com/profiles/'+$store.state.accountInfo.steamId+'/tradeoffers/privacy'">点击查看STEAM交易URL</a>。</p>
			</div>
	</div>
</div>
</template>
<script>
import api from 'api'
export default {
  data () {
    return {
			params: {
				dealUrl: this.$store.state.accountInfo.dealUrl
			}
    }
  },
  components: {
  },
  created () {
		document.title = '交易链接-skins5173'
	},
	methods: {
		saveUrl () {
			if (this.$store.state.accountInfo.steamId === null) {
				this.$toast('请先绑定Steam账号')
			} else {
				if (this.params.dealUrl.length < 1) {
					this.$toast('交易链接不能为空')
				} else {
					api.center.saveDeal(this.params).then(res => {
						if (res.status == 200 && res.data) {
							this.$toast('设置成功')
						}
					}, error =>{
						this.$toast(error.message)
					})
				}
			}
		}
	}
}
</script>
