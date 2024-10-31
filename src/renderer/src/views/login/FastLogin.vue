<script setup>
import CloseButton from '../../components/base/CloseButton.vue'
import api from '../../services/apis'
import { useUserStore } from '../../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const { id, password } = userStore.latestLoginedUser
const { nickname, headUrl } = userStore.loginedUsers.get(id)

async function fastLogin() {
  if ((await api.login({ id: id, password: password })).data.code === 200) {
    window.api.createWindow('main', 970, 680, `/main?id=${id}`, {
      transparent: true,
      minWidth: 395,
      minHeight: 550
    })
    window.api.close('login')
  }
}

function change(url) {
  router.replace(url)
}
</script>

<template>
  <div class="fast-login">
    <div class="logo">逛逛</div>
    <el-avatar class="head" :size="100" :src="headUrl" />
    <div class="nickname">{{ nickname }}</div>
    <el-button class="login" color="dodgerblue" @click="fastLogin">登录</el-button>
    <div class="add_account" @click="change('/login')">切换账号</div>
    <div class="divider">|</div>
    <div class="exit_account" @click="change('/register')">注册账号</div>
    <CloseButton control="login" />
  </div>
</template>

<style scoped lang="less">
.fast-login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: aliceblue;
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
