<template>
<div>
  <div class="">
    <div class="tab-item" >
        <ul class="item-list">
            <van-list
              v-model="loading"
              :finished="disabled"
              @load="loadMore"
            >
              <li class="list-item" style="border-bottom: 0" v-for="item in logList" :key="item.id">
                <div class="number-line clearfix">
                    <div class="num fl">
                        <span>订单号:</span>
                        <span>{{item.orderId}}</span>
                    </div>
                    <div class="time fr">
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
                <div class="goods-box">
                    <div class="img-box">
                        <img class="dota" :src="imgUrl + item.imgUrl" alt="">
                    </div>
                    <div class="detail">
                        <div class="above clearfix">
                            <span class="name fl">{{item.title}}</span>
                            <span class="color fr">{{item.status | statusType(item.dealNum)}}</span>
                        </div>
                        <div class="below clearfix">
                            <span class="price fl">￥{{item.totalPrice}}</span>
                            <span class="count fr">{{item.dealNum}}/{{item.num}}</span>
                        </div>
                    </div>
                </div>
            </li>
            </van-list>
        </ul>
        <div class="no-more" v-if="nomore">
            <img src="~img/icon/empty.png" alt="">
            <p>没有更多了~</p>
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
      queryParams: {
        appId:'',
        pageNum:1,
        pageSize:10
      },
      logList:[],
      disabled: false,
      nomore: false,
      total: 0,
      loading: false
    }
  },
  components: {
  },
  created () {
    document.title = '求购历史-skins5173'
    this.queryParams.appId = this.$route.query.appId
    this.getPurchaseLogList()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.queryParams.appId = to.query.appId
      this.queryParams.pageNum = 1
      this.logList = []
      this.getPurchaseLogList()
    }
  },
	methods: {
    loadMore () {
      if (this.logList.length < this.total) {
        this.getPurchaseLogList()
      } else if (this.queryParams.pageNum !=1) {
        this.nomore = true
        this.disabled = true
        this.loading = false
      }
    },
    getPurchaseLogList () {
      api.center.page(this.queryParams).then(
        res => {
          this.loading = false
          if (res && res.status === 200) {
            this.nomore = false
            this.queryParams.pageNum ++
            this.logList = this.logList.concat(res.data.list)
            this.total = res.data.total
          } else {
            this.disabled = true
          }
        }
      )
    }
  },
  filters: {
    statusType (value, dealNum) {
      if (value === 20) {
        value = '正在交易'
      } else {
        if (dealNum === 0) {
          value = '已取消'
        } else {
          value = '已结单'
        }
      }
      return value
    }
  }
}
</script>
