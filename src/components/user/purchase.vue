<template>
<div>
  <div id="wrapper" class="pb-96">
        <div class="common-top">
            <router-link :to="{name:'user'}">
                <div class="back"></div>
            </router-link>
            <h2 class="top-title">求购管理</h2>
            <a href="">
                <div class="top-right"></div>
            </a>
        </div>

        <div class="mt-96">
            <div class="wanted-handler-tab">
                <ul class="clearfix">
                    <li class="fl tab-item" :class="{'active':item.appId == queryParams.appId}" @click="gameChange(item.appId)" v-for="item in gameList" :key="item.appId">
                        <span>{{item.appName}}</span>
                    </li>
                </ul>
            </div>
            <div class="common-tab">
                <ul class="clearfix">
                    <li class="fl" :class="{'active':tab == 1}" @click="tabChange(1)">
                        <span>正在求购</span>
                    </li>
                    <li class="fl " :class="{'active':tab == 2}" @click="tabChange(2)">
                        <span>求购历史</span>
                    </li>
                    <li class="fl " :class="{'active':tab == 3}" @click="tabChange(3)">
                        <span>发布求购</span>
                    </li>
                </ul>
            </div>
            <div class="tab-item-block">
            <router-view></router-view>
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
      queryParams:{
        appId:578080,
      },
      tab:1
    }
  },
  components: {
  },
  created () {
    document.title = '求购管理-skins5173'
    if (this.$route.query.appId) {
      this.queryParams.appId = this.$route.query.appId
    }
    if (this.$route.name == 'onPurchase') {
      this.tab = 1
    } else if (this.$route.name == 'purchaseLog') {
      this.tab = 2
    } else if (this.$route.name == 'pubulishPurchase') {
      this.tab = 3
    }
  },
  mounted () {
  },
  watch: {
    
  },
	methods: {
    gameChange (appId) {
      this.queryParams.appId = appId
      if (this.tab == 1) {
        this.$router.push({name:'onPurchase',query:{appId:this.queryParams.appId}})
      } else if (this.tab == 2) {
        this.$router.push({name:'purchaseLog',query:{appId:this.queryParams.appId}})
      } else {
        this.$router.push({name:'pubulishPurchase',query:{appId:this.queryParams.appId}})
      }
      
    },
    tabChange (tab) {
      this.tab = tab
      if (this.tab == 1) {
        this.$router.push({name:'onPurchase',query:{appId:this.queryParams.appId}})
      } else if (this.tab == 2) {
        this.$router.push({name:'purchaseLog',query:{appId:this.queryParams.appId}})
      } else {
        this.$router.push({name:'pubulishPurchase',query:{appId:this.queryParams.appId}})
      }
    }
	}
}
</script>
