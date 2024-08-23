<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue"
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showToast} from "vant";
const router = useRouter();
const searchText = ref([]);
//跳转到加入队伍页面
const doAddTeam = () => {
  router.push({
    path: '/TeamPage/TeamAddPage',
  })
}
const teamList = ref([]);
/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = ' ',status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status
    }
  });
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("获取队伍列表失败，请刷新重试");
  }
}
//只会在页面加载时触发一次
onMounted(() => {
  listTeam();
})
const onSearch = (val) => {
  listTeam(val);
}

/**
 * 根据队伍状态切换队伍页面
 * @param name
 */
const active = ref('public')
const onTableChange = (name) =>{
  //查询公开队伍
  if(name === 'public'){
    listTeam(searchText.value,0);
  }else{//查加密队伍
    listTeam(searchText.value,2);
  }
}
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTableChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="secret" />
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doAddTeam()" />
    <team-card-list class="card-component" :team-list="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>
#teamPage {
}
</style>