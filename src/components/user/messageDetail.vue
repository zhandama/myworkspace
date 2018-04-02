<template>
<div>
  <div class="common-top">
		<a href="javascript:history.go(-1)">
			<div class="back"></div>
		</a>
		<h2 class="top-title">{{title}}</h2>
		<a href="">
			<div class="top-right"></div>
		</a>
	</div>

	<div class="mt-96">
			<div class="msg-item">
					<div class="title-box">
							<div class="title">{{details.messageTitle}}</div>
							<div class="time"><span>{{details.updateTime}}</span></div>
					</div>
					<div class="content-box">
							<div class="content" v-html="content">
									<!-- <p>尊敬的用户您好！您购买的“<span class="goods-name">铭刻倾魔天下</span>”饰品由于审核未通过，现已将贝壳退还至您的“<span class="pay-style">我的贝壳</span>”之中，给您带来的不便尽请谅解。</p> -->
							</div>
					</div>
			</div>
	</div>
</div>
</template>
<script>
import api from 'api'
export default {
  data () {
    return {
			title: this.$route.query.title,
			id: this.$route.params.id,
			details: [],
      content: ''
    }
  },
  created () {
		document.title = this.title + '-skins5173'
		if (this.title === '私人信箱') {
			this.getMyMessage()
		} else {
			this.getDetail()
		}
	},
	methods: {
		getDetail () {
      api.gameInfor.helpDetail({id: this.id}).then((data) => {
        if (data.status === 200 && data.data) {
          this.details = data.data
          this.content = JSON.parse(data.data.messageContent).content
        }
      })
		},
		getMyMessage () {
			api.header.readPersonalMsg(this.id).then((data) => {
        if (data.status === 200 && data.data) {
          this.details = data.data
          this.content = JSON.parse(data.data.messageContent).content
        }
      })
		}
	}
}
</script>
<style>
.content img{
	max-width: 100%;
}
</style>

