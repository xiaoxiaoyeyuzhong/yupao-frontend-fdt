<script setup lang="ts">
interface UserCardListProps {
  userList: API.CurrentUser[];
}
const props = withDefaults(defineProps<UserCardListProps>(),{
  //@ts-ignore
  userList : [] as API.CurrentUser[]
});
</script>

<template>
  <van-card
      v-for="user in props.userList"
      :desc="user.profile"
      :title="`姓名:${user.username} 星球编号:${user.planetCode}`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags">{{ tag }}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>