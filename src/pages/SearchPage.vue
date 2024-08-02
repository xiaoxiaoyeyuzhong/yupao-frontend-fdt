<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

    const searchText = ref('');
    const onSearch = (val) => showToast(val);
    const onCancel = () => showToast('取消');

</script>

<template>
<!--  在 van-search 外层增加 form 标签，且 action 不为空，
      即可在 iOS 输入法中显示搜索按钮
  -->
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <van-tag :show="true" closeable size="medium" type="primary" @close="close">
    男
  </van-tag>
  <van-divider content-position="left">选择标签</van-divider>
</template>

<style scoped>

</style>