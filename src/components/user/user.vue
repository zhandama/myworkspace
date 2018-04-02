<template>
  <div id="wrapper" class="pb-96">
    <!-- <transition :name="transitionName"> -->
    <router-view class="child-view"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script type="text/javascript">
import shopcarticoncomponent from '../common/shopCartIocn.vue'
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    shopcarticoncomponent
  },
   created () {
    document.title = '我的背包-skins5173'
  },
  watch: {  
    '$route' (to, from) {
      if(to.path == '/user') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
  
}
</script>
<style>
.child-view {
  position: absolute;
  width: 100%;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%);
  transform: translate(100%);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%);
  transform: translate(-100%);
}
</style>