<template>
<div>
  <div class="common-top">
		<a href="javascript:history.go(-1)">
			<div class="back"></div>
		</a>
		<h2 class="top-title">帮助中心</h2>
		<a href="">
			<div class="top-right"></div>
		</a>
	</div>

	<div class="mt-96">
			<div class="set-item clearfix" v-for="(item, index) in lists" v-if="lists.length > 0" :key="item.id">
					<div class="box clearfix" @click="show(item, index)">
							<span class="front fl">{{item.typeName}}</span>
							<i class="icon-right"></i>
					</div>
					<div class="item-detail" v-if="item.chose">
							<ul class="">
								<router-link v-for="itemList in item.messages" v-if="item.messages.length > 0" :key="itemList.id" :to="{name:'messagedetail', params: {id:itemList.id}, query: {title:'帮助中心'}}">
									<li class="detail-item">
											<span class="front fl">{{itemList.messageTitle}}</span>
											<i class="icon-right"></i>
									</li>
								</router-link>
							</ul>
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
			lists: []
    }
  },
  components: {
  },
  created () {
		document.title = '帮助中心-skins5173'
		this.getList()
	},
	methods: {
		getList () {
      api.gameInfor.helpList().then((data) => {
        if (data.status === 200 && data.data) {
          this.lists = data.data
        }
      })
		},
		show (item, index) {
			if (this.lists[index].chose) {
				this.$set(this.lists[index], 'chose', false)
			} else {
				this.$set(this.lists[index], 'chose', true)
			}
		}
	}
}
</script>
