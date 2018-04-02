<template>
    <div id="wrapper"  style="height:auto;">
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
import footercomponent from '../Footer.vue'
// import Header from '@/components/commonComponents/Header.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    footercomponent
  }
}
</script>
