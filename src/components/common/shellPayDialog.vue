<template>
<div>
  <div class="bomb pay-bomb">
      <div class="content">
          <div class="should-pay line-span clearfix">
              <span class="word fl" v-if="type=='MONEY'">应付金额:&nbsp;</span>
              <span class="price-num fl" v-if="type=='MONEY'">￥{{payItem.price}}</span>
              <!-- 贝壳支付 -->
              <span class="word fl" v-if="type=='SHELL'">应付贝壳:&nbsp;</span>
              <span class="shell-num fl" v-if="type=='SHELL'">{{(payItem.price*0.95).toFixed(2)}}</span>
          </div>
          <div class="actual-pay line-span clearfix">
              <span class="word fl" v-if="type=='MONEY'">实付金额:&nbsp;</span>
              <span class="price-num fl" v-if="type=='MONEY'">￥{{payItem.price}}</span>
              <!-- 贝壳支付 -->
              <span class="word fl" v-if="type=='SHELL'">实付贝壳:&nbsp;</span>
              <span class="shell-num fl" v-if="type=='SHELL'">{{(payItem.price*0.95).toFixed(2)}}</span>
          </div>
      </div>
      <div class="btn-box">
          <span class="btn cancel" @click="payclose">取消</span>
          <span class="btn sure" @click="pay(payItem, type)">确定</span>
      </div>
  </div>
  <div class="mask"></div>
</div>
</template>
<script>
export default {
   props: {
    payclose: Function,
    pay: Function,
    type: {
      default: 'SHELL'
    },
    payItem: {
      default: []
    }
  }
}
</script>
