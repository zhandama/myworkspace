<template>
<div>
  <router-link :to="{name:'shoppingCar'}">
    <div class="fixed-buyCar active">
        <span class="icon-buyCar"></span>
        <span class="buy-num" v-if="shoppingCount > 0">{{shoppingCount}}</span>
    </div>
  </router-link>

</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import api from 'api'
export default {
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState({
      shoppingCount: state => {
        return state.common.shoppingCount
      }
    })
  },
  methods: {
    init () {
      this.getShoppingCount()
    },
    ...mapActions({
      getShoppingCount: 'common/GET_SHOPPING_COUNT'
    })
  }
}
</script>
