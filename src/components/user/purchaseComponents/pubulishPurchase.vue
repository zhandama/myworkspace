<template>
  <div>
    <div class="wanted-handler-search filter-block">
      <div class="search-box clearfix">
          <div class="box fl">
              <input class="fl" type="text" placeholder="请输入饰品关键字" v-model="queryParams.title" @keyup.enter="search">
          </div>
          <span class="fr icon-filter" :class="{'active':onFilter}" @click="onFilter = !onFilter">筛选</span>
      </div>
      <!-- 筛选具体展示块 -->
      <div class="filter-detail" v-if="onFilter">
          <!-- 默认三个筛选 -->
          <div class="filter-tab" :class="{'one-tab':queryParams.appId == '578080'||'570','two-tab':queryParams.appId == '730'}">
            <ul class="clearfix">
                <li class="fl" :class="{'active':filtersProcess.first == 1}" @click="filtersProcess.first = 1">
                    <span>{{queryParams.appId == '578080'?'类别':'属性'}}</span>
                    <i class="icon-arrow"></i>
                </li>
            </ul>
        </div>
        
      <!-- CSGO武器 -->
                    
                    <!-- 属性 -->
                    <div class="tab-item" v-if=" filtersProcess.first == 1">
                        <div class="item-box" v-if="queryParams.appId != 578080">
                            <div class="title">种类</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl " :class="{'active':queryParams.typeId <= 0}">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl " :class="{'active':queryParams.typeId == item.value}" v-for="item in filters.type" @click="queryParams.typeId = item.value">{{item.zhName}}</span>
                            </div>
                        </div>
                        <div class="item-box" v-if="queryParams.appId == 730">
                            <div class="title">外观</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.slotId == ''}" @click="queryParams.slotId = ''">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.slotId == item.value}" @click="queryParams.slotId = item.value"  v-for="item in filters.slot">{{item.zhName}}</span>
                            </div>
                        </div>
                        <div class="item-box" v-if="queryParams.appId == 578080">
                            <div class="title">部位</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == ''}" @click="queryParams.typeId = ''">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == item.id}" @click="queryParams.typeId = item.id"  v-for="item in filters.type" v-if="item.propertyName!='全部'">{{item.propertyName}}</span>
                            </div>
                        </div>
                        <div class="item-box" v-if="queryParams.appId == 570">
                            <div class="title">品质</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.qualityId == ''}" @click="queryParams.qualityId = ''">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.qualityId == item.value}" @click="queryParams.qualityId = item.value" v-for="item in filters.qualities">{{item.zhName}}</span>
                            </div>
                        </div>
                        <div class="item-box" v-if="queryParams.appId != 578080">
                            <div class="title">{{queryParams.appId == '570'?'稀有度':'品质'}}</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.rarityId == ''}">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl " :class="{'active':queryParams.rarityId == item.value}"  v-for="item in filters.rarity" @click="queryParams.rarityId = item.value">{{item.zhName}}</span>
                            </div>
                        </div>
                        <div class="item-box" v-if="queryParams.appId == 730">
                            <div class="title">类别</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.qualityId == ''}" @click="queryParams.qualityId = ''">不限</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.qualityId == item.value}" @click="queryParams.qualityId = item.value" v-for="item in filters.quality">{{item.zhName}}</span>
                            </div>
                        </div>
                        <!-- 确定或者重置 -->
                        <div class="select-confirm">
                            <span class="btn" @click="init()">重置</span>
                            <span class="btn active" @click="onFilter = false;search()">确定</span>
                        </div>
                    </div>
    
      </div>
  </div>
    <div class="shop" v-if="!onFilter">
      <div class="goods-list clearfix" v-waterfall-lower="loadMore" :waterfall-disabled="disabled" waterfall-offset="400">
          <router-link :to="{name:'goodsDetail',query:{appId:queryParams.appId, itemId:item.categoryResponseVO.itemId, searchType:1,onPurchase:true}}" class="" v-for="item in itemList" v-if="itemList && itemList.length > 0" :key="item.categoryResponseVO.itemId">
              <div class="goods-item fl">
                  <div class="img-box">
                      <img :class="{'dota':item.categoryResponseVO.appId=='570','pubg':item.categoryResponseVO.appId=='578080','cs':item.categoryResponseVO.appId=='730'}" :src="imgUrl + item.categoryResponseVO.imgUrl" alt="">
                      <span class="goods-tip color1" v-if="item.categoryResponseVO.slotName">{{item.categoryResponseVO.slotName}}</span>
                  </div>
                  <div class="goods-name">{{item.categoryResponseVO.title}}</div>
                  <div class="goods-price">
                      <span class="" >市场价<em class="price"><em v-if="item.categoryResponseVO.marketPrice">￥</em>{{item.categoryResponseVO.marketPrice || ' 无'}}</em></span>
                      <span class="fr">需求<em class="goods-count">{{item.categoryResponseVO.num || 0}}</em>件</span>
                  </div>
              </div>
          </router-link>
      </div>
    </div>
    <transition name="van-fade" v-if="!nomore">
      <div style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
    </transition>
    <div class="no-more" v-if="nomore">
      <img src="~img/icon/empty.png" alt="">
      <p>抱歉，没有更多记录~</p>
    </div>
  </div>
</template>
<script>
  import api from 'api'
  import { Waterfall } from 'vant';
export default {
  data () {
    return {
      infoItem:[],
      showTobuy:true,
      queryParams:{
        appId:this.gameList[0].appId,
        pageNum:1,
        pageSize:20,
        // searchParams:1,
        searchType:2,
        npcId:'',
        qualityId:'',
        typeId:'',
        secondaryId:'',
        slotId:'',
        rarityId:'',
        sortMap:{},
        title: ''
      },
      itemList: [],
      onFilter:false,
      totalCount: 0,
      filters:{},
      filtersProcess:{
        first:1,
        sec:1,
        trd:1
      },
      heroType:1,
      nomore: false,
      disabled: true
    }
  },
  directives: {
    WaterfallLower: Waterfall('lower')
  },
  components: {
    'to-buy': resolve => { require(['@/components/common/toBuy.vue'], resolve) },
  },
  created () {
    document.title = '求购管理-skins5173'
    this.queryParams.appId = this.$route.query.appId
    this.getItemList()
    this.getFilter()
  },
  watch: {
    '$route' (to, from) {
      this.queryParams.appId = to.query.appId
      this.queryParams.pageNum = 1
      this.init(1)
      this.getItemList()
      this.getFilter()
    }
  },
	methods: {
    toPurchase (item) {
      this.infoItem = item
      this.showTobuy = true
    },
    loadMore () {
      if (this.itemList.length < this.totalCount) {
        this.getItemList(1)
      } else {
        this.nomore = true
      }
    },
    init (a) {
      this.queryParams.pageNum = 1
      this.queryParams.npcId = ''
      this.queryParams.qualityId  = ''
      this.queryParams.typeId = ''
      this.queryParams.secondaryId = ''
      this.queryParams.slotId = ''
      this.queryParams.rarityId = ''
      if (a > 0) {
        this.onFilter = false
        return
      }
    },
    search () {
      this.queryParams.pageNum = 1
      this.getItemList()
    },
    getItemList (a) {
      this.nomore = false
      api.center.search(this.queryParams).then(
        res => {
          this.queryParams.pageNum ++ 
          if (a > 0) {
            this.itemList = this.itemList.concat(res.data.categoryList)
          } else {
            this.itemList = res.data.categoryList
          }
          this.nomore = false
          this.totalCount = res.data.totalCount
        }
      )
    },
    getFilter () {
      if (this.queryParams.appId == '578080') {
        api.goods.getPUBGCategoryList().then(
          res => {
            this.filters = res.data
          }
        )
      } else if (this.queryParams.appId == '730') {
        api.goods.getCSGOCategoryList().then(
          res => {
            this.filters = res.data
          }
        )
      } else if (this.queryParams.appId == '570') {
        api.goods.getDotaCategoryList().then(
          res => {
            this.filters = res.data
          }
        )
      }
    },
    clearFilter () {
      this.queryParams.npcId = '',
      this.queryParams.qualityId = '',
      this.queryParams.typeId = '',
      this.queryParams.secondaryId = '',
      this.queryParams.slotId = ''
      this.queryParams.pageNum = ''
    },
	}
}
</script>