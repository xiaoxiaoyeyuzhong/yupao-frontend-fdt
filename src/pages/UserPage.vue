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
    // showSuccessToast("获取用户信息成功")
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
  <van-cell title="昵称" is-link @click="doEdit('username','昵称',user.username)" :value="user.username" />
  <van-cell title="账号" is-link :value="user.userAccount" />
  <van-cell title="头像" is-link @click="doEdit('avatarUrl','用户头像',user.avatarUrl)">
    <img style="height: 48px" :src="user.avatarUrl"  alt="用户头像"/>
  </van-cell>
  <van-cell title="性别" is-link @click="doEdit('gender','性别',user.gender)" :value="user.gender" />
  <van-cell title="电话" is-link @click="doEdit('phone','电话',user.phone)" :value="user.phone" />
  <van-cell title="邮箱" is-link @click="doEdit('email','邮箱',user.email)" :value="user.email" />
  <van-cell title="用户创建时间" is-link :value="new Date(user.createTime).toLocaleDateString()" />
  <van-cell title="用户权限" is-link :value="user.userRole" />
  <van-cell title="星球编号" is-link :value="user.planetCode" />
  <van-cell title="标签" is-link to="/SearchPage"/>
  </template>
</template>

<style scoped>

</style>