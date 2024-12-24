<script setup>
import { ref, watch } from 'vue'
import CloseButton from '../../components/base/CloseButton.vue'
import Input from '../../components/input/Input.vue'
import SelectInput from '../../components/input/SelectInput.vue'
import { useUserStore } from '../../store/user'
import api from '../../service/api'
import { useRouter } from 'vue-router'
import { Icon } from '../../constants/assets'
import debug from '../../utils/debug'
import app from "../../utils/app";

const us = useUserStore()
const router = useRouter()
const avatarPath = ref(Icon.DefaultAvatar)
const id = ref()
const password = ref()
const disable = ref(true)

watch([() => id.value?.text, () => password.value?.text], ([newId, newPassword]) => {
  disable.value = newId === '' || newPassword === ''
})

async function login() {
  let res = await api.login({ id: id.value.text, password: password.value.text })
  if (res.data.code === 200) {
    us.updateLatestLoginedUser(id.value.text, password.value.text)
    app.createMainPageWindow(res.data.data, id.value.text)
  } else debug.warningMessage('账号或密码错误')
}

function change(url) {
  router.replace(url)
}

function handleChange(id) {
  if (us.loginedUsers.has(id)) avatarPath.value = us.getAvatarPath(id)
  else avatarPath.value = Icon.DefaultAvatar
}

function deleteItem(id) {
  us.loginedUsers.delete(id)
}
</script>

<template>
  <div class="background">
    <el-avatar class="avatar" :size="80" :src="avatarPath" />
    <SelectInput
      ref="id"
      class="id"
      placeholder="输入账号"
      :selectable-items="[...us.loginedUsers.values()]"
      @handle-change="handleChange"
      @delete-item="deleteItem"
    />
    <Input ref="password" class="password" placeholder="输入密码" type="password" />
    <el-button class="login" color="dodgerblue" :disabled="disable" @click="login">登录</el-button>
    <div class="register" @click="change('/register')">注册账号</div>
    <CloseButton control="login" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.background {
  .container();
  .user-cannot-select();
  background-color: aliceblue;
}

.avatar {
  .horizontal-center();
  top: 15%;
  background-color: white;
}

.id {
  .horizontal-center();
  top: 40%;
  width: 250px;
  height: 40px;
  z-index: 99;
}

.password {
  .horizontal-center();
  top: 55%;
  width: 250px;
  height: 40px;
}

.login {
  .horizontal-center();
  top: 70%;
  width: 180px;
  height: 37px;
  border-radius: 5px;
}

.register {
  .horizontal-center();
  top: 90%;
  color: dodgerblue;
}
</style>
