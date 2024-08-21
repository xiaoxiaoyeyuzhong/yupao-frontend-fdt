<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

// const user : API.CurrentUser = {
//     id: 1,
//
//     username: 'dogFdt',
//
//     userAccount: 'qq321',
//
//     avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
//
//     gender: 0,
//
//     phone: '123321123',
//
//     email: '123@qq.com',
//
//     createTime: new Date(),
//
//     userRole: 0,
//
//     planetCode: '12',
//
//     tags: ['大学']
// }
// 格式化日期
// const formattedCreateTime = user.createTime.toLocaleDateString();
// 格式化标签
// const formattedTags = user.tags.join(',');
const user=ref();
onMounted(async ()=>{
  const res = await getCurrentUser();
  console.log(res);
  if(res.code === 0){
    user.value=res.data;
    showSuccessToast("获取用户信息成功")
  }else{
    user.value=null;
    showFailToast("获取用户信息失败")
    await router.push('/UserPage/UserLoginPage')
  }
})
const router=useRouter();
const doEdit = (editKey: string,editName: string|number,currentValue: string|undefined) =>{
  router.push({
    path: '/UserPage/EditUserPage',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}
</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/UserPage/UserUpdatePage" />
    <van-cell title="我创建的队伍" is-link to="/UserPage/TeamPage/UserTeamCreatePage" />
    <van-cell title="我加入的队伍" is-link to="/UserPage/TeamPage/UserTeamJoinPage" />
  </template>
</template>

<style scoped>

</style>