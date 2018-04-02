<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> 
  </div>
</template>
<script>
export default {
  name: 'app',
  created () {
  }
}
</script>

<style>
@import '~css/common.css';
@import '~css/index.css';
</style>
