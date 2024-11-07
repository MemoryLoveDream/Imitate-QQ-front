<script setup>
import { ref } from 'vue'
import CloseButton from '../../components/base/CloseButton.vue'
import FunctionalInput from '../../components/input/FunctionalInput.vue'
import SelectInput from '../../components/input/SelectInput.vue'
import { CloseBold } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import api from '../../services/apis'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const headUrl = ref('/src/assets/pic/head/head.png')
const select = ref()
const password = ref()

async function login() {
  let res = await api.login({ id: select.value.text, password: password.value.text })
  if (res.data.code === 200) {
    userStore.updateLatestLoginedUser(select.value.text, password.value.text)
    window.api.createWindow('main', 970, 680, `/main?id=${select.value.text}`, {
      transparent: true,
      minWidth: 395,
      minHeight: 550
    })
    window.api.close('login')
  } else ElMessage({ type: 'warning', message: '账号或密码错误' })
}

function change(url) {
  router.replace(url)
}

function handleChange(id) {
  if (userStore.loginedUsers.has(Number(id)))
    headUrl.value = userStore.loginedUsers.get(Number(id)).headUrl
  else headUrl.value = '/src/assets/pic/head/head.png'
}

function deleteItem(id) {
  userStore.loginedUsers.delete(id)
}
</script>

<template>
  <div class="background">
    <el-avatar class="head" :size="80" :src="headUrl" />
    <SelectInput
      ref="select"
      class="select"
      placeholder="输入账号"
      :selectable-items="[...userStore.loginedUsers.values()]"
      @handle-change="handleChange"
      @delete-item="deleteItem"
    />
    <FunctionalInput ref="password" class="input" placeholder="输入密码" type="password">
      <CloseBold />
    </FunctionalInput>
    <el-button class="login" color="dodgerblue" @click="login">登录</el-button>
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

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 25px;
  border-width: 0;
  :hover {
    background-color: red;
  }
}

.head {
  .horizontal-center();
  top: 15%;
  background-color: white;
}

.select {
  .horizontal-center();
  top: 40%;
  width: 250px;
  height: 40px;
  text-align: center !important;
  z-index: 10;
}

.input {
  .horizontal-center();
  top: 55%;
  width: 250px;
  height: 40px;
  z-index: 1;
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
