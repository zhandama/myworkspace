<template>
<div>
 <div id="wrapper" class="pb-96">
        <div class="common-top">
            <a href="javascript:history.go(-1)">
                <div class="back"></div>
            </a>
            <h2 class="top-title">出售记录</h2>
            <a href="">
                <div class="top-right"></div>
            </a>
        </div>

        <div class="mt-96">
            <div class="sell-recode-tab">
                <ul class="clearfix">
                    <li class="fl tab-item" :class="{'active':!queryParams.appId}" @click="tabChange()">
                        <span>全部</span>
                    </li>
                    <li class="fl tab-item" v-for="item in gameList" :class="{'active':queryParams.appId == item.appId}" @click="tabChange(item.appId)">
                        
                        <span>{{item.appName}}</span>
                    </li>
                    
                </ul>
            </div>
            <div class="sell-recode-sort">
                <div class="sort-box">
                    <span class="icon-sort " :class="{'active-up':queryParams['orderBy[0].asc'],'active-down':!queryParams['orderBy[0].asc']}" @click="queryParams['orderBy[0].asc']=!queryParams['orderBy[0].asc'] ; queryParams['orderBy[0].field']='price' ; tabChange(queryParams.appId)">价格</span>
                </div>
            </div>

            <div class="sell-recode-list" v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400">
              <transition-group name="van-fade">
                <div class="list-item" v-for="(item, index) in logList" :key="item.goodsId+index">
                    <div class="num-box">
                        <span>编号:<em>{{item.goodsId}}</em></span>
                    </div>
                    <div class="detail clearfix">
                        <div class="img-box fl">
                            <img  :class="{'dota':item.appId == 570, 'cs': item.appId == 730}" :src="imgUrl + item.goodsImg" alt="">
                        </div>
                        <div class="price-box fl">
                            <div class="real-price">
                                <span>实际所得：<span>￥<em>{{item.obtain}}</em></span></span>
                            </div>
                            <div class="other-price">
                                <span>手续费：<span>￥<em>{{item.serviceCharge}}</em></span></span>
                            </div>
                            <div class="other-price">
                                <span>售价：<span>￥<em>{{item.goodsPrice||item.price}}</em></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="time-box">
                        <div class="avatar-box fl clearfix">
                            <img class="avatar fl" v-if="item.avatar" :src="item.avatar" alt="">
                            <img class="avatar fl" v-else src="~img/icon/avatar-2x.png" alt="">
                            <span class="avatar-name fl">{{item.buyerName}}</span>
                        </div>
                        <div class="time fr">
                            <span>{{item.createTime}}</span>
                        </div>
                    </div>
                </div>
                </transition-group>
            </div>


            <!-- 暂无数据 -->
            <div class="empty" v-show="logList.length < 1">
                <img src="~img/icon/empty-buyCar.png" alt="">
                <p class="word">暂无数据</p>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import api from 'api'
import { Waterfall } from 'vant';
export default {
  data () {
    return {
      queryParams:{
        'orderBy[0].field': 'price',
        'orderBy[0].asc': false,
        'startDate': '',
        'endDate': '',
        'appId': '',
        'pageQuery.pageNum': 1,
        'pageQuery.pageSize': 10
      },
      logRes:{},
      logList:[]
    }
  },
  directives: {
    WaterfallLower: Waterfall('lower')
  },
  components: {
  },
  created () {
    document.title = '出售记录-skins5173'
    this.getLogList()
  },
  watch: {

  },
	methods: {
    tabChange (appId) {
      this.queryParams.appId = appId
      this.queryParams['pageQuery.pageNum'] = 1
      this.logRes = {}
      this.logList = []
      this.getLogList()
    },
    loadMore () {
      if ((this.queryParams['pageQuery.pageNum'] * 10) < this.logRes.total) {
        this.queryParams['pageQuery.pageNum'] ++ 
        this.getLogList()
      }
    },
    getLogList () {
      api.center.saleRecord(this.queryParams).then(
        res => {
          this.logRes = res.data
          this.logList = this.logList.concat(res.data.list)
        }
      )
    }
	}
}
</script>
