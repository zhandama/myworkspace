<template>
<div>
  <div class="common-top">
		<a href="javascript:history.go(-1)">
			<div class="back"></div>
		</a>
		<h2 class="top-title">个人设置</h2>
		<a href="">
			<div class="top-right"></div>
		</a>
	</div>

	<div class="mt-96">
		<div class="mine-set">
			<!-- <div class="set-item clearfix">
				<div class="box">
					<span class="front fl">默认游戏</span>
					<span class="behind fr">Dota2</span>
					<i class="icon-right"></i>
				</div>
			</div> -->
			<div class="set-item clearfix">
				<div class="box">
					<span class="front fl">Steam绑定</span>
					<span class="behind fr" v-if="this.$store.state.accountInfo.steamId">已绑定</span>
					<a class="behind fr" :href="steUrl" v-else>未绑定</a>
					<i class="icon-right"></i>
				</div>
			</div>
			<div class="set-item clearfix" @click="bindingUrl">
				<div class="box">
					<span class="front fl">Steam交易链接</span>
					<i class="icon-right"></i>
				</div>
			</div>
		</div>
		<div class="select-confirm">
			<span class="btn active" @click="loginOut()" style="width:100%">退出登录</span>
		</div>
	</div>
</div>
</template>
<script>
import api from 'api'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
			steUrl: ''
    }
  },
  created () {
		document.title = '我的背包-skins5173'
		this.steamUrl()
	},
	methods: {
		...mapActions({
			getUserInfo: 'GET_USER'
		}),
		steamUrl () {
			api.center.steamId().then(res => {
				if (res && res.status === 200) {
					this.steUrl = res.data
				}
			})
		},
		bindingUrl () {
			if (this.$store.state.accountInfo.steamId === null) {
				this.$toast('请先绑定steam帐号')
				return
			}
			this.$router.push({name: 'steamurl'})
		},
		loginOut () {
			api.logout(new Date().getTime()).then((res) => {
        if (res && res.status === 200) {
					this.getUserInfo()
          this.$toast('退出成功')
          this.$router.push({name: 'Home'})
        } else {
          this.$router.push({name: 'Home'})
        }
      }, () => {
        this.$router.push({name: 'Home'})
      })
		}
	}
}
</script>
