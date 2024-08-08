<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts"
import { showSuccessToast, showFailToast } from 'vant';
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
const route =useRoute();
console.log(route.query.tags)
const {tags} = route.query;
const mockUser={
  id: 12345,

  username: "fdt",

  userAccount: "123",

  avatarUrl: "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png",

  gender: 0,

  phone: "23123123213",

  email: "123123@qq.com",

  tags: ["java","python"],

  profile: "你好，我是tian",

  planetCode: "123",
}
const userList :API.CurrentUser[] =ref([mockUser]);
onMounted(async ()=>{
  const userListData=await myAxios({
    method: 'get',
    url: '/user/recommend',
    params: {
      pageNum: 1,
      pageSize: 8,
    },
    paramsSerializer: params => {
      // 参数不带索引-indices: false
      return qs.stringify(params,{indices: false})
    }
  })
      .then(function (response){
        console.log("/user/recommend",response);
        showSuccessToast('加载成功');
        // myAxios配置已经取了axios的data，这里只需要取后端封装的data,分页后还要取records
        return response.data.records;
      })
      .catch(function (error){
        console.log("/user/recommend error",error);
        showFailToast('加载失败');
      })
  // JSON处理
  if(userListData){
    userListData.forEach(user=>{
      if(user.tags){
        user.tags=JSON.parse(user.tags);
      }
    })
  }
  // 处理完后要赋值
  userList.value=userListData
})


</script>

<template>
  <user-card-list :user-list="userList" />

  <van-empty v-if="!userList || userList.length<1" description="数据为空" />
</template>

<style scoped>

</style>