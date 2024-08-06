<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";
import {getCurrentUser, updateUser} from "../services/user.ts";
import {showFailToast, showSuccessToast, UploaderFileListItem} from "vant/es";
import {useRouter} from "vue-router";

const router = useRouter();
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
console.log("未改变之前，imagesUrl=",imagesUrl.value);
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser.data) {
    showFailToast("用户未登录")
    return;
  }

  const updateData = {
    'id': currentUser.data.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  }
  const res = await updateUser(updateData);
  console.log("改变之后，imagesUrl=",imagesUrl.value);
  if (res.code === 0) {
    showSuccessToast("用户信息更新成功")
  } else {
    showFailToast("用户信息更新失败")
  }
  await router.push('/UserPage')
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