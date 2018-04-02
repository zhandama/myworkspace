<template>
  <div style="height:100%;overflow:scroll;padding-bottom:1rem">
    <div class="common-top">
          <a href="javascript:" @click="closeSell('back')">
              <div class="back"></div>
          </a>
          <h2 class="top-title">饰品上架</h2>
          <a href="javascript:" @click="pricing">
              <div class="top-right">
                  <span>智能定价</span>
              </div>
          </a>
      </div>

      <div class="mt-96">
          <div class="update-item" v-for="item in goodsList" :key="item.id">
              <div class="box">
                  <div class="img-box">
                      <img :class="{'dota':item.appId=='570','pubg':item.appId=='578080','cs':item.appId=='730'}" :src="imgUrl + item.imgUrl" alt="" >
                      <!-- <div class="abrase-bar">
                          <span class="num">磨损：<em>0.435285255</em></span>
                      </div> -->
                  </div>
                  <div class="detail">
                      <div class="price-line">
                          <span>当前最低价：</span>
                          <span class="num"><em v-if="item.minPrice">￥</em>{{item.minPrice||'暂无'}}</span>
                      </div>
                      <div class="name-line clearfix">
                          <span class="fl">{{item.title}}</span>
                          <span class="fr">x1</span>
                      </div>
                      <div class="input-line clearfix">
                          <input class="fl" type="tel" @input="checkNo(item)" v-model="item.price" >
                      </div>
                  </div>
              </div>
              <div class="input-des">
                  <input type="text" placeholder="请输入您对饰品的描述（选填）" v-model="item.sellDescription">
              </div>
          </div>
      </div>
      <div class="update-bottom clearfix">
          <div class="update-money fl">
              <div class="front fl">
                  <div class="price-box">
                      <span>总价<em class="price">￥{{moneyNum}}</em></span>
                  </div>
                  <div class="total">
                      <span>共{{goodsList.length}}件</span>
                  </div>
              </div>
              <!-- 选中在behind加active -->
              <div class="behind fr clearfix" :class="{'active':isSimilarBatchChangePrice}" @click="handleSimilarBatchChangePriceSelect">
                  <i class="icon-circle fl"></i>
                  <span class="fl">同名饰品改价</span>
              </div>
          </div>
          <div class="update-btn fl" @click="readysell"><span>出售</span></div>
      </div>
    <div class="bomb pay-bomb" v-if="showDialog">
      <div class="content">
          <div class="no-center clearfix">
              <span class="">出售数量:&nbsp;</span>
              <span class="">{{goodsList.length}}</span>
          </div>
          <div class="line-span clearfix">
              <span class="word fl">出售金额:&nbsp;</span>
              <span class="fl">￥{{moneyNum}}</span>
          </div>
          <div class="line-span clearfix">
              <span class="word fl">手续费:&nbsp;</span>
              <span class="fl">￥{{(moneyNum * toSellConfig.poundage).toFixed(2)}}</span>
          </div>
          <div class="line-span special-color clearfix">
              <span class="word fl">实际可得:&nbsp;</span>
              <span class="fl">￥{{(moneyNum - moneyNum * toSellConfig.poundage).toFixed(2)}}</span>
          </div>
      </div>
      <div class="btn-box">
          <span class="btn cancel" @click="showDialog=false">取消</span>
          <span class="btn sure" @click="sell">确定</span>
      </div>
  </div>
  <div class="mask" v-if="showDialog"></div>
  </div>
</template>
<script type="text/javascript">
import api from 'api'

export default {
  props: {
    closeSell: Function,
    getList: Function,
    goodsList: {
      default: []
    },
    toSellConfig: {
      default: []
    }
  },
  data () {
    return {
      sellerBut: '确认出售',
      describe: false,
      baseNum: 100,
      similarBatchChangePriceIndeterminate: false,
      isSimilarBatchChangePrice: false,
      DesIndex: 0,
      sellDescription: '',
      showDialog: false
    }
  },
  watch: {
    baseNum (a, b) {
      for (var i = 0; i < this.goodsList.length; i++) {
        this.goodsList[i].price = (this.goodsList[i].marketPrice * this.baseNum / 100).toFixed(2)
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      for (var i = 0; i < this.goodsList.length; i++) {
        this.goodsList[i].price = ''
      }
    },
    pricing () {
      let self = this
      for (let i = 0; i < self.goodsList.length; i++) {
        self.goodsList[i].price = self.goodsList[i].intelligentPrice.toFixed(2)
      }
    },
    readysell () {
      if (this.goodsList.find(x => x.price <= 0)) {
        this.$toast('请输入正确的饰品价格')
      } else {
        this.showDialog = true
      }
    },
    sell () {
      let params = [], params2 = []
      for (let i = 0; i < this.goodsList.length; i++) {
        let obj = {}, obj2 = {}
        obj.goodsId = this.goodsList[i].goodsId
        obj.price = this.goodsList[i].price
        obj.sellDescription = this.goodsList[i].sellDescription
        obj2 = this.goodsList[i]
        if (obj.price === '') {
          this.$toast('请填写正确的价格');
          return
        }
        params.push(obj)
        params2.push(obj2)
      }
      if (this.toSellConfig.defaultPrice === 0 || this.toSellConfig.defaultPrice === '0') {
        api.center.groundingGoods(params).then(res => {
          if (res.status === 200 && res.data) {
            this.$toast('上架成功!');
            setTimeout(() => {
              this.closeSell()
            }, 2000)
          } else {
            this.$toast('上架失败!');
          }
        })
      } else {
        this.changePrice(params2)
      }
    },
    changePrice (params) {
      api.center.changgoodsPrice(params).then(res => {
        if (res.status === 200 && res.data) {
          this.$toast('改价成功!');
          setTimeout(() => {
            this.closeSell()
          }, 2000)
        } else {
          this.$toast('改价失败!');
        }
      })
    },
    handleSimilarBatchChangePriceSelect () {
      if (this.similarBatchChangePriceIndeterminate) {
        this.isSimilarBatchChangePrice = false
      } else {
        this.isSimilarBatchChangePrice = !this.isSimilarBatchChangePrice
      }
      this.similarBatchChangePriceIndeterminate = false
    },
    checkNo (item) {
      if (item.price.length > 7) {
        item.price = item.price.substring(0, 7)
      }
      if (item.price === '.') {
        item.price = ''
      }
      item.price = item.price.replace(/[^\d.]/g, '')
      .replace(/^\./g, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$').replace(/\./g, '')
      .replace('$#$', '.').replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.handleSimilarBatchChangePrice(item)
      return item
    },
    handleSimilarBatchChangePrice (currentGoods) {
      if (this.isSimilarBatchChangePrice) {
        if (this.goodsList.length > 0 ) {
          for (let i = 0; i < this.goodsList.length; i++) {
            let item = this.goodsList[i]
            if (item.appId === currentGoods.appId && item.itemId === currentGoods.itemId) {
              item.price = currentGoods.price
            }
          }
        }
      }
    },
    close () {
      this.baseNum = 100
      this.$store.commit(EDIT_PRICE_SHOW, false)
    },
    addDescribe (index) {
      this.DesIndex = index
      this.describe = true
      this.sellDescription = this.goodsList[index].sellDescription
    },
    sendDescribe () {
      this.goodsList[this.DesIndex].sellDescription = this.sellDescription
      this.closeDescribe()
    },
    closeDescribe () {
      this.describe = false
    }
  },
  computed: {
    moneyNum () {
      let price = 0
      this.goodsList.forEach(x => {
        if (x.price) {
          price = Number(price) + Number(x.price)
        };
      })
      return Number(price).toFixed(2)
    }
  },
  filters: {
    priceFloat (value) {
      if (value) {
        return value.toFixed(2)
      } else {
        return value
      }
    }
  }
}
</script>
