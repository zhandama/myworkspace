<template>
<div>
  <div class="common-top">
		<a href="javascript:history.go(-1)">
			<div class="back"></div>
		</a>
		<h2 class="top-title">消息中心</h2>
		<a href="">
			<div class="top-right"></div>
		</a>
	</div>

	<div class="mt-96">
		<div class="msg-tab">
				<ul class="clearfix">
						<li class="fl" :class="{'active':show==0}" @click="show=0;init()">
								<span>站内公告</span>
						</li>
						<li class="fl " :class="{'active':show==1}" @click="show=1;init()">
								<span>私人信箱</span>
						</li>
				</ul>
		</div>
		
		<div class="msg-list" v-if="show==0">
		<van-pull-refresh v-model="isLoading" @refresh="init">
    <div v-waterfall-lower="loadMore"  :waterfall-disabled="disabled" waterfall-offset="200">
				<ul>
						<router-link v-for="item in lists" v-if="lists.length > 0" :key="item.id" :to="{name:'messagedetail', params: {id:item.id}, query: {title:'站内公告'}}">
								<li>
										<span>{{item.messageTitle}}</span>
								</li>
						</router-link>
				</ul>
		</div>
    </van-pull-refresh>
		</div>
		<!-- 私信 -->
		<div class="msg-item" v-if="show==1">
				<div class="title-box">
					<router-link v-for="item in mailLists" v-if="mailLists.length > 0" :key="item.id" :to="{name:'messagedetail', params: {id:item.id}, query: {title:'私人信箱'}}">
						<div class="title">{{item.messageTitle}}</div>
					</router-link>
				</div>
		</div>

		<transition name="van-fade" v-if="!nomore">
			<div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
		</transition>
		<div class="no-more" v-if="nomore">
				<img src="~img/icon/empty.png" alt="">
				<p>没有更多了~</p>
		</div>
	</div>
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
			show: this.$route.query.show || 0,
			lists: [],
			mailLists: [],
			params: {
				pageNum: 1,
				pageSize: 10
			},
			isLoading: false,
      isLoadMore:false,
      nomore: false,
			disabled: true,
			total: 0
    }
  },
  created () {
		document.title = '帮助中心-skins5173'
		this.init()
		this.clearMessage()
	},
	methods: {
		loadMore () {
			if (this.lists.length < this.total) {
				this.getList()
      } else {
        this.nomore = true
      }
		},
		clearMessage () {
			api.header.clearMessage().then()
		},
		init () {
			this.params.pageNum = 1
			this.lists = []
			this.mailLists = []
			this.getList()
			this.getMailList()
			this.nomore = false
		},
		getList () {
      api.center.message(this.params).then((res) => {
        if (res.status === 200 && res.data) {
					this.isLoading = false
					this.isLoadMore = false
					if (res.data.data.length > 0) {
						this.params.pageNum ++
            this.lists = this.lists.concat(res.data.data)
            this.nomore = false
					}
					this.total = res.data.total
        }
      })
		},
		getMailList () {
      api.header.getMyMessageList(this.params).then((res) => {
        if (res.status === 200 && res.data) {
					this.mailLists = res.data.data
        }
      })
    }
	}
}
</script>
