<template>
  <div id="wrapper" class="pb-96">
    <router-view></router-view>
    <footercomponent :active="2"></footercomponent>
    <shopcarticoncomponent :active="0"></shopcarticoncomponent>
    <to-top />
  </div>
</template>
<script type="text/javascript">
import footercomponent from '../Footer.vue'
import shopcarticoncomponent from '../common/shopCartIocn.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    footercomponent,
    shopcarticoncomponent,
    'to-top': resolve => { require(['@/components/common/toTop.vue'], resolve) },
  },
   created () {
    document.title = '我的背包-skins5173'
    }
}
</script>
