<template>
<div>
<div class="shop">
    <div class="shop-top">
        <bagtopcomponent></bagtopcomponent>
    </div>
    <div style="clear:both">
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-waterfall-lower="loadMore"  :waterfall-disabled="disabled" waterfall-offset="200">
        <div class="store-recode-box clearfix">
          <div class="item" v-for="item in recordList" :key="item.id">
              <div class="number">
                  <span>{{item.goodsId}}</span>
              </div>
              <div class="box clearfix">
                  <div class="img-box fl">
                      <img :class="{'dota':item.appId=='570','pubg':item.appId=='578080','cs':item.appId=='730'}" :src="item.imgUrl | imgfer" >
                  </div>
                  <div class="detail fr">
                      <div class="above"><span :class="{'add':numState(item.state)>=1,'reduce':numState(item.state)<1}">{{item.state | state}}{{numState(item.state)}}</span></div>
                      <div class="below"><span>{{item.createTime}}</span></div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <transition name="van-fade" v-if="!nomore">
      <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
    </transition>
    <div class="no-more" v-if="nomore">
        <img src="~img/icon/empty.png" alt="">
        <p>嘤嘤嘤，没有更多了~</p>
    </div>
</div>
</div>
</template>
<script>
// import {mapState, mapActions} from 'vuex'
import bagtopcomponent from './bagTop'
import { Waterfall } from 'vant';
import api from 'api'
export default {
  directives: {
    WaterfallLower: Waterfall('lower') 
  },
  data () {
    return {
      params: {
        pageNum: 1,
        pageSize: 20
      },
      recordList: [],
      total: 0,
      isLoading: false,
      isLoadMore:false,
      nomore: false,
      disabled: true
    }
  },
  components: {
    bagtopcomponent
  },
  created () {
    this.getList()
  },
  computed: {
  },
  methods: {
    gameChange (appId) {
      this.params.appId = appId
      this.getList()
    },
    onRefresh () {
      this.params.pageNum = 1
      this.getList()
    },
    loadMore () {
      if (this.recordList.length < this.total) {
        this.getList()
      } else {
        this.nomore = true
      }
    },
    getList () { // 请求列表
      this.isLoadMore = true
      api.center.selectGoodsLogByUid(this.params).then(res => {
        this.isLoading = false
        this.isLoadMore = false
        this.disabled = false
        if (res.status == 200 && res.data) {
          this.params.pageNum ++
          this.recordList = this.recordList.concat(res.data.list)
          this.total = res.data.total
        }
      })
    },
    numState (value) {
      switch (value) {
        case 3:
          value = '-1'
          break
        case 4:
          value = '+1'
          break
        case 5:
          value = '+1'
          break
        case 8:
          value = '-1'
          break
        case 11:
          value = '+1'
          break
        case 12:
          value = '+1'
          break
        case 13:
          value = '+1'
          break
        case 14:
          value = '-'
          break
        case 19:
          value = '-1'
          break
        case 20:
          value = ''
          break
      }
      return value
    }
  },
  filters: {
    state (value) {
      switch (value) {
        case 3:
          value = '上架'
          break
        case 4:
          value = '下架'
          break
        case 8:
          value = '取回'
          break
        case 11:
          value = '存入'
          break
        case 12:
          value = '购买'
          break
        case 13:
          value = '求购'
          break
        case 14:
          value = '出售'
          break
        case 19:
          value = '上架中'
          break
        case 20:
          value = '上架失败'
          break
      }
      return value
    },
    imgfer (value) {
      return 'http://skins-image.5173.com' + value + '?x-oss-process=image/resize,m_fill,h_48,w_64/quality,q_70'
    }
  }
}
</script>
