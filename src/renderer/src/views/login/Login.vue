<script setup>
import { onMounted, ref } from 'vue'
import CloseButton from '../../components/base/CloseButton.vue'
import FunctionalInput from '../../components/input/FunctionalInput.vue'
import SelectInput from '../../components/input/SelectInput.vue'
import { CloseBold } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import router from '../../router'
import axios from 'axios'

const userStore = useUserStore()
const head_url = ref('/src/assets/pic/head/head.png')
const select = ref()
const password = ref()

function login() {
  axios
    .post('/user/login', { id: select.value.text, password: password.value.text })
    .then((response) => {
      if (response.data.code === 200) {
        router.replace('/main')
        window.api.change_size()
        axios.get('/user/info?id=1000000000').then((response) => {
          console.log(response.data.data)
        })
        // userStore.latest_logined_user =
      }
    })
}

function change(url) {
  router.replace(url)
}

function change_head(text) {
  head_url.value = text
}
</script>

<template>
  <div class="background">
    <CloseButton />
    <el-avatar class="head" :size="80" :src="head_url" />
    <SelectInput ref="select" class="select" placeholder="输入账号" :handle-change="change_head" />
    <FunctionalInput ref="password" class="input" placeholder="输入密码" type="password">
      <CloseBold />
    </FunctionalInput>
    <el-button class="login" color="dodgerblue" @click="login">登录</el-button>
    <div class="register" @click="change('/register')">注册账号</div>
  </div>
</template>

<style scoped lang="less">
.background {
  //-webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  background-color: aliceblue;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 25px;
  background-color: transparent;
  border-width: 0;
  :hover {
    background-color: red;
  }
}

.head {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}

.select {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 250px;
  height: 40px;
  transform: translateX(-50%);
  text-align: center !important;
  z-index: 10;
}

.input {
  position: absolute;
  top: 55%;
  left: 50%;
  width: 250px;
  height: 40px;
  transform: translateX(-50%);
  z-index: 1;
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

.register {
  position: absolute;
  top: 90%;
  left: 50%;
  color: dodgerblue;
  transform: translateX(-50%);
}
</style>
