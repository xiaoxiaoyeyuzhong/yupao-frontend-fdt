<script setup lang="ts">
interface UserCardListProps {
  loading: boolean;
  userList: API.CurrentUser[];
}
const props = withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  //@ts-ignore
  userList : [] as API.CurrentUser[]
});
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
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
  </van-skeleton>
</template>

<style scoped>

</style>