<script setup>
import CloseButton from '../../components/base/CloseButton.vue'
import api from '../../service/api'
import { useUserStore } from '../../store/user'
import { useRouter } from 'vue-router'
import app from '../../utils/app'

const us = useUserStore()
const router = useRouter()
const { id, password } = us.latestLoginedUser
const { nickname, avatarPath } = us.loginedUsers.get(id)

async function fastLogin() {
  let res = await api.login({ id: id, password: password })
  if (res.data.code === 200) {
    app.createMainPageWindow(res.data.data, id)
  }
}

function change(url) {
  router.replace(url)
}
</script>

<template>
  <div class="fast-login">
    <div class="logo">逛逛</div>
    <el-avatar class="avatar" :size="100" :src="avatarPath" />
    <div class="nickname">{{ nickname }}</div>
    <el-button class="login" color="dodgerblue" @click="fastLogin">登录</el-button>
    <div class="add_account" @click="change('/login')">切换账号</div>
    <div class="divider">|</div>
    <div class="exit_account" @click="change('/register')">注册账号</div>
    <CloseButton control="login" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.fast-login {
  .container();
  .user-cannot-select();
  background-color: aliceblue;
}

.logo {
  .horizontal-center();
  top: 10%;
  font-size: 25px;
  font-weight: bold;
  background: linear-gradient(to right, dodgerblue, pink);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.avatar {
  .horizontal-center();
  top: 25%;
}

.nickname {
  .horizontal-center();
  top: 55%;
  font-size: 18px;
  color: black;
}

.login {
  .horizontal-center();
  top: 70%;
  width: 180px;
  height: 37px;
  border-radius: 5px;
}

.add_account {
  position: absolute;
  top: 90%;
  left: 40%;
  color: dodgerblue;
  transform: translateX(-50%);
}

.divider {
  .horizontal-center();
  top: 90%;
  color: gainsboro;
  font-size: 12px;
}

.exit_account {
  position: absolute;
  top: 90%;
  left: 60%;
  color: #0099ff;
  transform: translateX(-50%);
}
</style>
