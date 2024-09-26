<script setup>
import router from '../../router'
import CloseButton from '../../components/base/CloseButton.vue'
import { ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import FunctionalInput from '../../components/input/FunctionalInput.vue'
import { useUserStore } from '../../store/user'

const user = useUserStore()
const head_url = ref('/src/assets/pic/head/head.png')
// const file = ref()

function register() {
  router.replace('/main')
  window.api.change_size()
}

function change(url) {
  router.replace(url)
}

function change_head() {
  head_url.value =
    'img:///' +
    window.api.select_file({
      properties: ['openFile']
    })
  // window
  //   .showOpenFilePicker({
  //     types: [
  //       {
  //         accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  //       }
  //     ]
  //   })
  //   .then((result) => {
  //     result[0].getFile().then((result1) => {
  //       console.log(result1)
  //     })
  //     // console.log(result[0].getFile())
  //   })
}
</script>

<template>
  <div class="background">
    <CloseButton />
    <el-avatar class="head" :size="80" :src="head_url" @click="change_head" />
    <FunctionalInput class="select" placeholder="输入账号">
      <CloseBold />
    </FunctionalInput>
    <FunctionalInput class="input" placeholder="输入密码" type="password">
      <CloseBold />
    </FunctionalInput>
    <el-button class="register" color="dodgerblue" @click="register">注册</el-button>
    <div class="login" @click="change('/login')">已有账号</div>
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
  //text-align: center !important;
}

.register {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 180px;
  height: 37px;
  border-radius: 5px;
  transform: translateX(-50%);
}

.login {
  position: absolute;
  top: 90%;
  left: 50%;
  color: dodgerblue;
  transform: translateX(-50%);
}
</style>
