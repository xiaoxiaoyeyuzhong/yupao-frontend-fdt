<script setup lang="ts">

import {teamStatusEnum} from "../constants/team/teamStatusEnum.ts";
import picture from "../assets/picture.png";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

interface TeamCardListProps{
  teamList: API.Team[];
}

//获取当前登录用户
const router = useRouter();
const currentUser = ref();

onMounted(async()=>{
  currentUser.value=await getCurrentUser();
})

const props= withDefaults(defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList: [] as API.Team[]
});

//加入队伍
const joinTeamId = ref(0);
const password = ref('');
const showPasswordDialog =ref(false);
const doJoinTeam = async () =>{
  if(!joinTeamId){
    return;
  }
  const res = await myAxios.post('/team/join',{
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0){
    showSuccessToast("加入队伍成功");
    doJoinCancel();
    await router.push({
      path: '/UserPage/TeamPage/UserTeamJoinPage',
      replace: true,
    });
  }else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''))
  }
}

//准备加入队伍
const preJoinTeam = (team:API.Team)=>{
  joinTeamId.value = team.id;
  if(team.status===0){
    doJoinTeam();
  }else {
    showPasswordDialog.value = true;
  }
}
//清空加入参数
const doJoinCancel =()=>{
  joinTeamId.value = 0;
  password.value = '';
}


/**
 * 跳转至更新队伍页面
 * @param id
 */
const doUpdateTeam=(id: number)=>{
  router.push({
    path: '/TeamPage/TeamUpdatePage',
    query:{
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');

  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete/id', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}
</script>

<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="picture"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <!-- 加入队伍： 仅非队伍创建人、且未加入队伍的人可见-->
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.data.id &&
!team.hasJoin"  plain
                    @click="preJoinTeam(team)">加入队伍</van-button>
        <!-- 更新队伍：仅创建人可见-->
        <van-button v-if="team.userId === currentUser?.data.id" size="small"  plain
                    @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <!-- 退出队伍：仅已加入队伍的人可见-->
        <van-button  size="small"  v-if="team.hasJoin"
                     plain
                     @click="doQuitTeam(team.id)">退出队伍</van-button>
        <!-- 解散队伍：仅创建人可见-->
        <van-button v-if="team.userId === currentUser?.data.id" size="small"  plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password"  placeholder="请输入密码" />
    </van-dialog>
  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>