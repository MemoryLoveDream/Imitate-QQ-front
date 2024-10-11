<script setup>
import CloseButton from '../../components/base/CloseButton.vue'
import axios from 'axios'
import router from '../../router'
import { useUserStore } from '../../store/user'

const userStore = useUserStore()
const { id, password } = userStore.latestLoginedUser
const { nickname, headUrl } = userStore.loginedUsers.get(id)

function fastLogin() {
  axios.post('/user/login', { id: id, password: password }).then((response) => {
    if (response.data.code === 200) {
      router.replace('/main')
      window.api.change_size()
      axios.get('/user/user_info/' + id).then((response) => {
        userStore.currentUser = response.data.data
      })
    }
  })
}

function change(url) {
  router.replace(url)
}
</script>

<template>
  <div class="background">
    <CloseButton />
    <div class="logo">逛逛</div>
    <el-avatar class="head" :size="100" :src="headUrl" />
    <div class="nickname">{{ nickname }}</div>
    <el-button class="login" color="dodgerblue" @click="fastLogin">登录</el-button>
    <div class="add_account" @click="change('/login')">切换账号</div>
    <div class="divider">|</div>
    <div class="exit_account" @click="change('/register')">注册账号</div>
  </div>
</template>

<style scoped lang="less">
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: aliceblue;
  //-webkit-app-region: drag;
}

.logo {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 25px;
  font-weight: bold;
  background: linear-gradient(to right, dodgerblue, pink);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.head {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
}

.nickname {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  color: black;
}

.login {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 180px;
  height: 37px;
  border-radius: 5px;
  transform: translateX(-50%);
}

.add_account {
  position: absolute;
  top: 90%;
  left: 40%;
  color: dodgerblue;
  transform: translateX(-50%);
}

.divider {
  position: absolute;
  top: 90%;
  left: 50%;
  color: gainsboro;
  font-size: 12px;
  transform: translateX(-50%);
}

.exit_account {
  position: absolute;
  top: 90%;
  left: 60%;
  color: #0099ff;
  transform: translateX(-50%);
}
</style>
