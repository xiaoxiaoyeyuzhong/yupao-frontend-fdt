<script setup>
import {ref} from "vue";
import { showToast } from 'vant';
import {useRouter} from "vue-router";
import routes from "../config/routes.ts";
const router=useRouter();
const onClickLeft = () => {
  // 点击箭头返回时，跳转到上一个页面，因为有多级页面
  router.back()
};
const onClickRight = () => {
  router.push('/SearchPage')
};
// const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);

//根据路由切换标题
const DEFAULT_TITLE = '伙伴匹配';
const title =ref(DEFAULT_TITLE);
router.beforeEach((to,from)=>{
  const toPath = to.path;
  //在路由里寻找和要前往页面路径一样的配置，如果route的值不为空，则用title，如果是空，用默认的标题
  const route = routes.find((route)=>{
    return toPath === route.path;
  })
  title.value = route.title ?? DEFAULT_TITLE;
})
</script>

<template>
  <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

<!--&lt;!&ndash;  使用v-if判断active的值，当其发生改变的时候，跳转到对应页面&ndash;&gt;-->
<!--  <template v-if="active==='index'">-->
<!--  <Index />-->
<!--  </template>-->
<!--  <template v-if="active==='team'">-->
<!--    <Team />-->
<!--  </template>-->

<!--定义中间内容，加入路由-->
  <div id="content">
    <router-view />
  </div>
  <!--点击底部标签栏进行页面切换-->
  <van-tabbar route @change="onChange">
    <!--路由的to要加上/-->
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/TeamPage" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/UserPage" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

</style>