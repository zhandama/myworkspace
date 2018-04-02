<template>
<div class="game-tab">
  <ul class="clearfix">
	  <router-link :to="{name:'bag'}"><li class="fl" :class="{'active':$route.name === 'bag'}" ><span>5173仓库</span></li></router-link>
	  <router-link :to="{name:'steambag'}"><li class="fl" :class="{'active':$route.name === 'steambag'}"><span>STEAM库存</span></li></router-link>
	  <router-link :to="{name:'recordbag'}"><li class="fl" :class="{'active':$route.name === 'recordbag'}"><span>背包记录</span></li></router-link>
  </ul>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
