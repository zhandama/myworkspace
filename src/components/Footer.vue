<template>
<div>
<div class="footer-nav">
    <ul class="clearfix">
        <li class="fl" :class="{'active':active==0}">
            <router-link class="" :to="{name:'Home'}">
                <span class="nav-item icon1">首页</span>
            </router-link>
        </li>
        <li class="fl" :class="{'active':active==1}">
            <router-link class="" :to="{name:'goodsList'}" replace>
                <span class="nav-item icon2">商城</span>
            </router-link>
        </li>
        <li class="fl" :class="{'active':active==2}">
            <router-link class="" :to="{name:'bag'}">
                <span class="nav-item icon3">我的背包</span>
            </router-link>
        </li>
        <li class="fl" :class="{'active':active==3}">
            <router-link class="" :to="{name:'user'}">
                <span class="nav-item icon4">我的</span>
            </router-link>
        </li>
    </ul>
</div>
</div>
</template>
<script>
export default {
  props:['active'],
}
</script>
