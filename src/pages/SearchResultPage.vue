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
const userList : API.CurrentUser[]=ref([mockUser]);
onMounted(async ()=>{
  const userListData=await myAxios({
    method: 'get',
    url: '/user/search/tags',
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      // 参数不带索引-indices: false
      return qs.stringify(params,{indices: false})
    }
  })
    .then(function (response){
        console.log("/user/search/tags success",response);
        showSuccessToast('搜索成功');
        // myAxios配置已经取了axios的data，这里只需要取后端封装的data
        return response.data;
  })
      .catch(function (error){
        console.log("/user/search/tags error",error);
        showFailToast('搜索失败');
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
</template>

<style scoped>

</style>