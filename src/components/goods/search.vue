<template>
<div id="wrapper" class="pb-96">
    <div class="header-search clearfix">
        <!-- <div class="search-input fl">
            <input type="text" placeholder="请输入关键字搜索" v-model="keyword" @keyup.enter="search">
        </div> -->
        <div class="search-input fl">
            <div class="select-game active fl">
                <span class="span-logo"
                :class="{'span-pubg':appId=='578080','span-dota':appId=='570','span-cs':appId=='730'}"
                 @click="choseGameShow = true">{{appName}}</span>
                <i class="icon-arrow"></i>
                <div class="model-select" v-if="choseGameShow">
                    <ul class="">
                        <li><span class="span-logo"
                        :class="{'span-pubg':item.appId=='578080','span-dota':item.appId=='570','span-cs':item.appId=='730'}"
                        @click="choseGame(item)"
                         v-for="item in gameList" :key="item.appId" :appName='item.appName'>{{item.appName}}</span></li>
                    </ul>
                </div>
            </div>
            <input class="fr" type="text" placeholder="请输入关键字搜索" v-model="keyword" @keyup.enter="search" ref="keyword">
        </div>
        <a class="search-cancel fr" href="javascript:history.go(-1)">取消</a>
    </div>
    <div class="search-history" v-if="hotLog && hotLog.length > 0">
        <div class="his-title">
            <h3 class="word">搜索历史</h3>
            <div class="icon-close" @click="clear"></div>
        </div>
        <div class="history-list">
            <ul class="">
                <li class="list-item clearfix" v-for="item in hotLog" :key="item" @click="togoodsList(item)">
                    <!-- icon-pc为电脑。icon-ph为手机 -->
                    <i class="icon-ph fl"></i>
                    <span class="name fl">{{item}}</span>
                    <!-- <img class="fr" src="~img/img-min.png" alt=""> -->
                </li>
            </ul>
        </div>
    </div>
		<div class="hot-search" v-if="hotList && hotList.length > 0">
				<div class="title">
						<span class="word">skins热搜</span>
				</div>
				<div class="hot-list">
						<ul class="clearfix">
								<li class="hot-item fl" v-for="item in hotList" :key="item.id" @click="hotSearch(item)">
										<div class="item-box">
												<span class="word fl">{{item.categoryName}}</span>
												<img class="fr" v-if="item.imgUrl" :src="imgUrl + item.imgUrl" alt="">
										</div>
								</li>
						</ul>
				</div>
		</div>
    <shopcarticoncomponent :active="0" ref='shoppingcart'></shopcarticoncomponent>
</div>
</template>
<style>
</style>
<script>
import api from 'api'
import shopcarticoncomponent from '../common/shopCartIocn.vue'
export default {
  data () {
    return {
      hotList: [],
      keyword: this.$route.query.keyword || '',
      appId:'578080',
      appName: '绝地求生',
      hotLog: [],
      choseGameShow: false
    }
  },
  components: {
    shopcarticoncomponent
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.keyword.focus()
    }) 
  },
  methods: {
    init () {
      api.goods.hotsearchlist().then(res => {
        if (res && res.status === 200) {
          this.hotList = res.data
        }
      })
      if (this.localStorageSupport(window.localStorage) && localStorage.hotLog) {
        this.hotLog = JSON.parse(localStorage.hotLog)
      }
    },
    choseGame (item) {
      this.appId = item.appId
      this.appName = item.appName
      this.choseGameShow = false
    },
    togoodsList (keyword) {
      this.$router.push({name:'goodsList', query:{appId: this.appId, keyword}})
    },
		search () {
      this.keyword = this.keyword.trim()
      if (this.hotLog.length >= 5) {
        this.hotLog.pop()
      } else if (this.hotLog.length <= 0) {
        this.hotLog = new Array()
      }
      this.hotLog.unshift(this.keyword)
      if (this.localStorageSupport(window.localStorage) && this.keyword !== '') {
        localStorage.hotLog = JSON.stringify(this.hotLog)
      }
      this.$router.push({name:'goodsList', query:{appId: this.appId, keyword: this.keyword}})
    },
    hotSearch (item) {
      if (this.hotLog.length >= 5) {
        this.hotLog.pop()
      }
      this.hotLog.unshift(item.categoryName)
      if (this.localStorageSupport(window.localStorage)) {
        localStorage.hotLog = JSON.stringify(this.hotLog)
      }
      this.$router.push({name:'goodsDetail', query:{appId:item.appId,itemId:item.itemId,searchType:1}})
    },
    clear () {
      this.hotLog = []
      if (this.localStorageSupport(window.localStorage)) {
        localStorage.removeItem('hotLog')
      }
    },
    localStorageSupport (storage) {
      if(!!storage){
        try {
          storage.setItem("key", "value");
          storage.removeItem("key");
          return true;
        } catch(e){
          return false;
        }
      }else{
        return false;
      }
    }
  }
}
</script>