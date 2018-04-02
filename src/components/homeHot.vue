<template>
<div class="hot-block">
    <div class="top-line clearfix">
        <div class="hot-title fl">
            <i class="icon-logo fl" :class="{'icon-dota':appId=='570','icon-pubg':appId=='578080','icon-cs':appId=='730'}"></i>
            <span class="hot-name fl">{{appName}}热销</span>
        </div>
        <router-link class="word-right fr" :to="{name:'goodsList',query:{'appId':appId}}">更多</router-link>
    </div>
    <div class="hot-list clearfix">
        <router-link href="javascript:void(0)" :to="{name:'goodsDetail',query:{appId:item.appId,itemId:item.itemId,searchType:1}}" v-if="goodsList && goodsList.length > 0" v-for='item in goodsList' :key="item.itemId">
            <div class="goods-item fl">
                <div class="img-box">
                    <img :class="{'dota':appId=='570','pubg':appId=='578080','cs':appId=='730'}" :src="imgUrl + item.imgUrl" >
                    <!-- <div class="goods-tip color1">不朽</div> -->
                </div>
                <div class="goods-name">{{item.name}}</div>
                <div class="goods-price">
                    <span>最低价<em class="price">￥{{item.price}}</em></span>
                </div>
            </div>
        </router-link>
    </div>
</div>
</template>
<script>
// import {mapState, mapActions} from 'vuex'
import api from 'api'
import footercomponent from './Footer.vue'
export default {
  props: {
    appId: {
      default: 578080
    },
    appName: {
      default: 'PUBG'
    }
  },
  data () {
    return {
      goodsList: []
    }
  },
  created () {
    this.getHot()
  },
  computed: {
  },
  methods: {
    getHot () {
      let params = {
        size: '6', settingType: 1, appId: this.appId
      } 
      api.home.getGoodsList(params).then(res =>{
        if (res.status == 200 && res.data) {
          this.goodsList = res.data
        }
      })
    }
  }
}
</script>
<style type="text/css" >
</style>
