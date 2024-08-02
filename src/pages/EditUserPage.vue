<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey as string,
  editName: route.query.editName as string,
  currentValue: route.query.currentValue as string | undefined
})
const imagesUrl = ref([
      {url: editUser.value.currentValue}
    ]
)
const onSubmit = () => {
  console.log('submit', editUser.value.editKey, ":", editUser.value.currentValue);
//  todo 把editKey、editName、currentValue传递到后端
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-if="editUser.editName!=='用户头像'"
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-if="editUser.editName==='用户头像'"
          :name="editUser.editKey"
          :label="editUser.editName">
        <template #input>
          <van-uploader
              v-model="imagesUrl"
              :max-count="1"
          />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>