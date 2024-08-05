<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";
const searchText = ref('');

// TreeSelect 分类选择
// activeIds-右侧选中的标签id
// activeIndex-左侧选中项索引
const activeIds = ref([]);
const activeIndex = ref(0);
// 后端传递过来的标签列表
// originList不需要定义为响应式变量
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '保密', id: '保密', disabled: true},
    ],
  },
  {
    text: '在读',
    children: [
      {text: '高中', id: '高中'},
      {text: '大学', id: '大学'},
      {text: '研究生', id: '研究生'},
      {text: '研究生1', id: '研究生1'},
      {text: '研究生2', id: '研究生2'},
      {text: '研究生3', id: '研究生3'},
      {text: '研究生4', id: '研究生4'},
    ],
  },
  {text: '福建', disabled: true}
];
let tagList =ref(originTagList)

const onSearch = () => {
  // originList不需要定义为响应式变量，就不需要写value，直接调用map
  tagList.value = originTagList.map(parentTag =>{
    // 复制原数组的父标签
    const tempParentTag = { ...parentTag };

    // 如果存在子标签，并且子标签是数组，才进行过滤
    if (Array.isArray(parentTag.children)) {
      tempParentTag.children = parentTag.children.filter((item) =>
          item.text.includes(searchText.value)
      );
    } else {
      // 如果没有子标签，确保 children 为 undefined
      tempParentTag.children = undefined;
    }

    return tempParentTag;
  })
};
// 取消搜索条件
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};
const activeNames = ref(['1']);
// 从已选择标签中移除标签函数
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}
const router=useRouter();
// 搜索用户列表函数
const doSearchUserList = () =>{
  router.push({
    path:'/UserPage/SearchResultPage',
    query:{
      // 跳转的时候才为tags赋值
      tags:activeIds.value
    }
      }
  )
}
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
  <!-- 占位div，当activeIds.length===0时显示-->
  <div v-if="activeIds.length===0">请选择标签</div>

<!-- 使用wrap自动为子标签换行 -->
  <van-space wrap>
    <!-- 关闭函数需要传入tag值，将tag值过滤掉 -->
    <van-tag v-for="tag in activeIds" closeable size="medium" type="primary" @close="doClose(tag)">
      {{ tag }}
    </van-tag>
  </van-space>
  <van-divider content-position="left">选择标签</van-divider>
  <!-- 分类选择组件 -->
  <!-- active-id 右侧选中项id 支持数组 -->
  <!-- main-active-index 左侧选中项索引 -->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-button type="primary" size="large" round="round" @click="doSearchUserList()">搜索</van-button>
</template>

<style scoped>

</style>