<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts"
import { showSuccessToast, showFailToast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
const route =useRoute();
console.log(route.query.tags)

//默认不开启匹配模式
const isMatchMode = ref<boolean>(false);
const loading = ref();
//定义用户列表
const userList = ref([]);

const loadData = async () => {
  let userListData;

  loading.value = true;
  //心动模式：根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/recommend', response);
          showSuccessToast('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.log('/user/recommend', error);
          showFailToast('请求失败');
        })
  }else {
    //普通模式：直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend', response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend', error);
          showFailToast('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: API.CurrentUser) => {
      user.tags = JSON.parse(user.tags);
    })
    userList.value = userListData;
  }
  loading.value = false;
}
watchEffect(() => {
  loadData();
})


</script>

<template>
  <van-cell center title="心动模式">
    <van-switch v-model="isMatchMode" />
  </van-cell>
  <user-card-list class="card-component" :user-list="userList" :loading="loading"/>

  <van-empty v-if="!userList || userList.length<1" description="数据为空" />
</template>

<style scoped>

</style>