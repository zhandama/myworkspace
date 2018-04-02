<template>
<div>
  <div class="toTop" @click="gotoTop" v-if="top > (clientHeight / 2)">
      <span class="icon-toTop"></span>
  </div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import api from 'api'
export default {
  data () {
    return {
      top: 0,
      clientHeight: 0
    }
  },
  mounted () {
    this.clientHeight = document.documentElement.clientHeight === 0 ? document.body.clientHeight : document.documentElement.clientHeight
    window.addEventListener('scroll',this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.top = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop
    },
    gotoTop () {
      window.scrollTo(0, 1)
    }
  }
}
</script>
