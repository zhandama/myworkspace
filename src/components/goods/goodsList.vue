<template>
<div>
  <div id="wrapper" class="pb-96">
        <div class="shop">
            <div class="shop-top">
              <div class="game-tab">
                    <ul class="clearfix">
                        <li class="fl" :class="{'active':queryParams.appId == item.appId}" v-for="item,index in gameList" @click="gameTabChange(index)"><span>{{item.appName}}</span></li>
                        
                    </ul>
                </div>
               <div class="buy-sell-tab" :class="{'active':tabFixed}" ref="tabFixed">
                    <ul class="clearfix">
                        <li class="fl" :class="{'active':queryParams.searchType ==1}" @click="searchTypeChange(0)">
                            <span>出售</span>
                        </li>
                        <li class="fl" :class="{'active':queryParams.searchType ==2}" @click="searchTypeChange(1)">
                            <span>求购</span>
                        </li>
                    </ul>
                </div>
                <div class="buy-sell-tab" v-if="tabFixed">
                  <ul class="clearfix">
                        <li class="fl" :class="{'active':queryParams.searchType ==1}" @click="searchTypeChange(0)">
                            <span>出售</span>
                        </li>
                        <li class="fl" :class="{'active':queryParams.searchType ==2}" @click="searchTypeChange(1)">
                            <span>求购</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 筛选 -->
            <div class="filter-block">
                <div class="filter-box">
                    <input class="search-filter" type="text" placeholder="请输入饰品关键字" v-model="queryParams.title" maxlength="" @keyup.enter="onSearch">
                    <span class="filter-item fr icon-filter" @click="onFilter = !onFilter" :class="{'active':onFilter}">筛选</span>
                    <span class="filter-item fr icon-sort" :class="{'active-up':queryParams.sortMap.price,'active-down':!queryParams.sortMap.price}"  @click="priceFliter()">价格</span>
                    
                </div>
                <!-- 筛选具体展示块 -->
                <div class="filter-detail" v-if="onFilter">
                    <!-- 有三项筛选的 -->
                    <div class="filter-tab" :class="{'two-tab':queryParams.appId == '578080'}">
                        <ul class="clearfix">
                            <li class="fl" :class="{'active':filtersProcess.first == 1}" @click="firstFilter()">
                                <!-- DOTA2游戏 -->
                                <span>{{queryParams.appId == '578080'?'类别':''}}{{queryParams.appId == '730'?'武器':''}}{{queryParams.appId == '570'?'英雄':''}}</span>
                                <!-- CS:GO -->
                                <!-- <span>武器</span> -->
                                <i class="icon-arrow"></i>
                            </li>
                            <li class="fl" :class="{'active':filtersProcess.first == 2}" @click="secFilter()" v-show="queryParams.appId != '578080'">
                                <span>属性</span>
                                <i class="icon-arrow"></i>
                            </li>
                            <li class="fl" :class="{'active':filtersProcess.first == 3}" @click="trdFilter()">
                                <span>排序</span>
                                <i class="icon-arrow"></i>
                            </li>
                        </ul>
                    </div>
                    <!-- 英雄 -->
                    <div class="tab-item" v-if="queryParams.appId == 570 && filtersProcess.first == 1">
                        <div class="king-tab">
                            <ul class="clearfix">
                                <li class="fl" :class="{'active':heroType == 1}" @click="heroType = 1"><span>敏捷</span></li>
                                <li class="fl" :class="{'active':heroType == 2}" @click="heroType = 2"><span>力量</span></li>
                                <li class="fl" :class="{'active':heroType == 3}" @click="heroType = 3"><span>智力</span></li>
                            </ul>
                        </div>
                        <div class="king-box">
                            <div class="king-list">
                                <ul class="clearfix">
                                    <li class="fl" :class="{'active':queryParams.npcId == item.id}" v-if="heroType == 1" v-for="item in filters.heros.agile" @click="queryParams.npcId = item.id;onFilter = false;onRefresh()" :key="item.goodsId">
                                        <img :src="imgUrl + item.image_url" alt="">
                                    </li>
                                    <li class="fl" :class="{'active':queryParams.npcId == item.id}" v-if="heroType == 2" v-for="item in filters.heros.power" @click="queryParams.npcId = item.id;onFilter = false;onRefresh()" :key="item.goodsId">
                                        <img :src="imgUrl + item.image_url" alt="">
                                    </li>
                                    <li class="fl" :class="{'active':queryParams.npcId == item.id}" v-if="heroType == 3" v-for="item in filters.heros.intelligence" @click="queryParams.npcId = item.id;onFilter = false;onRefresh()" :key="item.goodsId">
                                        <img :src="imgUrl + item.image_url" alt="">
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- CSGO武器 -->
                    <div class="tab-item" v-if="queryParams.appId == 730 && filtersProcess.first == 1">
                        <div class="item-box" >
                            <div class="title">武器</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == ''}" @click="queryParams.typeId = '';onFilter = false; onRefresh()">不限</span>
                            </div>
                            
                        </div>
                        <div class="item-box" v-for="item,index in filters.type">
                            <div class="title">{{item.zhName}}</div>
                            <div class="select-list clearfix" v-if="!item.children">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == item.value}" @click="queryParams.typeId = item.value;queryParams.secondaryId = '';onFilter = false;onRefresh()">{{item.zhName}}</span>
                            </div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == filters.type[index].value && queryParams.secondaryId == ''}" @click=" queryParams.typeId =filters.type[index].value;queryParams.secondaryId = '';onFilter = false;onRefresh()" v-if="item.children">不限</span>
                                <span class="select-item fl" :class="{'active':(queryParams.secondaryId == item.value && queryParams.typeId == filters.type[index].value)}" @click="queryParams.secondaryId = item.value; queryParams.typeId =filters.type[index].value;onFilter = false;onRefresh()"  v-for="item in filters.type[index].children">{{item.zhName}}</span>
                            </div>
                        </div>
                      </div>
                    <!-- 属性 -->
                    <div class="tab-item" v-if="(queryParams.appId == 578080 && filtersProcess.first == 1) || filtersProcess.first == 2">
                        <div class="item-box" v-if="queryParams.appId == 570">
                            <div class="title">种类</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl " :class="{'active':!queryParams.typeId}" @click="queryParams.typeId = ''">不限</span>
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
                            <!-- <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.typeId == ''}" @click="queryParams.typeId = ''">不限</span>
                            </div> -->
                            <div class="select-list clearfix">
                              <span class="select-item fl" :class="{'active':queryParams.typeId == ''}" @click="queryParams.typeId = ''"  v-for="item in filters.type" v-if="item.propertyName=='全部'">{{item.propertyName}}</span>
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
                            <div class="title">{{queryParams.appId == '570'?'属性':'品质'}}</div>
                            <div class="select-list clearfix">
                                <span class="select-item fl" :class="{'active':queryParams.rarityId == ''}" @click="queryParams.rarityId = ''">不限</span>
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
                            <span class="btn" @click="clearFilter()">重置</span>
                            <span class="btn active" @click="onFilter = false;onRefresh()">确定</span>
                        </div>
                        
                    </div>
                    
                    <!-- 排序 -->
                    <div class="tab-item" v-if="filtersProcess.first == 3">
                        <div class="sort-list clearfix">
                            <!-- <span class="sort-item fl" :class="{'acitve':queryParams.sortMap.length < 1}" @click="queryParams.sortMap = {}">默认</span> -->
                            <span class="sort-item fl" @click="queryParams.sortMap.price = true; queryParams.pageNum = 1;onFilter = false;onRefresh()" :class="{'active':queryParams.sortMap.price}">价格<em class="up-sort"></em></span>
                            <span class="sort-item fl" @click="queryParams.sortMap.price = false; queryParams.pageNum = 1;onFilter = false;onRefresh()" :class="{'active':!queryParams.sortMap.price}">价格<em class="down-sort"></em></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- loading动画 -->
            <!-- <div class="loading" style="display: ;">
                <div class="loading-container clearfix">
                    <div class="loading-box fl">
                        <img src="~img/icon/loading.png" alt="">
                    </div>
                    <div class="loading-time fr">
                        <p class="">正在刷新</p>
                        <p class="">更新于：<span>02-28 14:45</span></p>
                    </div>
                </div>
            </div> -->

            <!-- 商品列表 -->
            <div class="goods-list clearfix" v-if="!onFilter">
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="loadMore"
                >
                  <transition-group name="van-fade">
                  <router-link style="display:inline-block" v-if="goodsList && goodsList.length > 0" v-for="(item, index) in goodsList" :key="item.categoryResponseVO.itemId + index" :to="{name:'goodsDetail',query:{appId:item.categoryResponseVO.appId,itemId:item.categoryResponseVO.itemId,searchType:queryParams.searchType}}">
                    <div class="goods-item fl">
                            <div class="img-box">
                                <img :class="{'dota':item.categoryResponseVO.appId=='570','pubg':item.categoryResponseVO.appId=='578080','cs':item.categoryResponseVO.appId=='730'}" :src="imgUrl + item.categoryResponseVO.imgUrl " alt="">
                                <span class="goods-tip color1" v-show="item.categoryResponseVO.slotName">{{item.categoryResponseVO.slotName}}</span>
                            </div>
                            <div class="goods-name">{{item.categoryResponseVO.name}}</div>
                            <div class="goods-price">
                                <span class="">{{queryParams.searchType==1?'最低价':'最高价'}}<em class="price"><em v-if="item.categoryResponseVO.price">￥</em>{{item.categoryResponseVO.price?item.categoryResponseVO.price:'暂无'}}</em></span>
                                <span class="fr"><em class="goods-count">{{item.categoryResponseVO.num}}</em>件{{queryParams.searchType == 2?'求购':'在售'}}</span>
                            </div>
                        </div>
                  </router-link>
                  </transition-group>
                </van-list>
              </van-pull-refresh>
            </div>
        </div>
    <shopcarticoncomponent :active="0"></shopcarticoncomponent>
     <!-- <transition name="van-fade">
      <div class="loading" v-show="isLoadMore">
                <div class="loading-container clearfix">
                    <div class="loading-box">
                        <img src="~img/icon/loading.png" alt="">
                    </div>
                    
                </div>
            </div>
      <div  v-show="isLoadMore" style="text-align:center;font-size:12px;color:#bcbcbc;margin:0 auto;width:150px"><van-loading color="black" style="display:inline-block;height:20px" />加载中，请稍后...</div>
    </transition> -->
    <div class="no-more" v-if="nomore">
      <img src="~img/icon/empty.png" alt="">
      <p>抱歉，没有更多饰品了~</p>
    </div>
    </div>
    <footercomponent :active='1'></footercomponent>
    <to-top />
</div>
</template>
<style>
.van-tab {
  background: #0b284b;
}
.van-tab:active {
   background: #153a67;
}
.van-tabs__nav-bar {
  background-color: white
}
.van-tab--active {
  color: white
}
.van-ellipsis {
  color: white
}
.van-hairline--top-bottom::after {
  border-width: 0
}
.loading {
    border:0
}
</style>

<script>
// import {mapState, mapActions} from 'vuex'
import footercomponent from '../Footer.vue'
import shopcarticoncomponent from '../common/shopCartIocn.vue'
import api from 'api'
export default {
  data () {
    return {
      isLoading: false,
      isLoadMore:false,
      filters:{},
      goodsList:[],
      filtersProcess:{
        first:1,
        sec:1,
        trd:1
      },
      queryParams:{
        appId: this.$route.query.appId || '578080',
        pageNum:1,
        pageSize:40,
        searchParams:1,
        searchType:1,
        npcId:'',
        qualityId:'',
        typeId:'',
        secondaryId:'',
        slotId:'',
        rarityId:'',
        sortMap:{price: false},
        title:this.$route.query.keyword || ''
      },
      disabled: true,
      onFilter:false,
      heroType:1,
      nomore: false,
      totalCount: 0,
      top: 0,
      tabFixed: false,
      loading: false,
      finished: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.query.appId) {
        this.queryParams.appId = to.query.appId
      }
      if (to.query.keyword) {
        this.queryParams.title = to.query.keyword
        this.getGoodsList()
      }
    }
  },
  components: {
    footercomponent,
    shopcarticoncomponent,
    'to-top': resolve => { require(['@/components/common/toTop.vue'], resolve) },
  },
  created () {
    document.title = 'skins5173-steam电竞饰品交易平台'
    this.getGoodsList()
    this.getFilter()
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(()=>{
      this.top = this.$refs.tabFixed.getBoundingClientRect().top
    })
  },
  computed: {
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= this.top) {
        this.tabFixed = false
      } else if (this.$refs.tabFixed && this.$refs.tabFixed.getBoundingClientRect().top <= 0) {
        this.tabFixed = true
      }
    },
    firstFilter () {
      this.filtersProcess.first = 1
    },
    secFilter () {
      this.filtersProcess.first = 2
    },
    trdFilter () {
      this.filtersProcess.first = 3
    },
    onSearch () {
      this.queryParams.pageNum = 1
      this.getGoodsList('init')
    },
    priceFliter () {
      this.queryParams.sortMap.price = !this.queryParams.sortMap.price
      this.queryParams.pageNum = 1
      this.getGoodsList('init')
    },
    searchTypeChange (index) {
      window.scrollTo(0, 1)
      if (index == 0) {
        this.queryParams.pageNum = 1
        this.queryParams.searchType = 1
      } else {
        this.queryParams.pageNum = 1
        this.queryParams.searchType = 2
      }
      this.onFilter = false
      this.getGoodsList('init')
    },
    onRefresh() {
      this.queryParams.pageNum = 1
      this.isLoadMore = false
      this.getGoodsList('init')
    },
    gameTabChange (index) {
      window.scrollTo(0, 1)
      this.clearFilter()
      this.queryParams.pageNum = 1
      this.queryParams.appId = this.gameList[index].appId
      this.queryParams.title = ''
      this.onFilter = false
      this.getGoodsList('init')
      this.getFilter()
      this.$router.push({name:'goodsList', query:{appId: this.queryParams.appId}})
    },
    loadMore () {
      if (this.goodsList.length < this.totalCount) {
        if (this.$route.name === 'goodsList') {
          this.getGoodsList()
        }
      } else if (this.queryParams.pageNum !=1) {
        this.isLoadMore = false
        this.nomore = true
        this.finished = true
        this.loading = false
      }
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
    getGoodsList (item) {
      this.isLoadMore = true
      this.nomore = false
      api.goods.getItemsList(this.queryParams).then(
        res => {
          if (item === 'init') {
            this.goodsList = []
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.isLoadMore = false
          this.loading = false
          this.totalCount = res.data.totalCount
          if (res.data.categoryList && res.data.categoryList.length > 0) {
            this.goodsList = this.goodsList.concat(res.data.categoryList)
            this.queryParams.pageNum ++
          } else {
            this.finished = true
          }
        }
      )
    },
    clearFilter () {
      this.queryParams.npcId = '',
      this.queryParams.qualityId = '',
      this.queryParams.typeId = '',
      this.queryParams.secondaryId = '',
      this.queryParams.slotId = '',
      this.queryParams.rarityId = '',
      this.queryParams.keyWord = ''
    }
  }
}
</script>
<style scoped >

</style>

<style type="text/css" >
</style>
