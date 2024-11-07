<script setup>
import CloseButton from '../../components/base/CloseButton.vue'
import { ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import FunctionalInput from '../../components/input/FunctionalInput.vue'
import { useUserStore } from '../../store/user'
import api from '../../services/apis'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const headUrl = ref('/src/assets/pic/head/head.png')
const input = ref()
const password = ref()

async function register() {
  let res = await api.register({ nickname: input.value.text, password: password.value.text })
  if (res.data.code === 200) {
    userStore.updateLatestLoginedUser(res.data.data, password.value.text)
    window.api.createWindow('main', 970, 680, `/main?id=${res.data.data}`, {
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

function change_head() {
  headUrl.value =
    'img:///' +
    window.api.selectFile({
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
    <el-avatar class="head" :size="80" :src="headUrl" @click="change_head" />
    <FunctionalInput class="input" placeholder="输入昵称">
      <CloseBold />
    </FunctionalInput>
    <FunctionalInput class="password" placeholder="输入密码" type="password">
      <CloseBold />
    </FunctionalInput>
    <el-button class="register" color="dodgerblue" @click="register">注册</el-button>
    <div class="login" @click="change('/login')">已有账号</div>
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

.password {
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
  //text-align: center !important;
}

.register {
  .horizontal-center();
  top: 70%;
  width: 180px;
  height: 37px;
  border-radius: 5px;
}

.login {
  .horizontal-center();
  top: 90%;
  color: dodgerblue;
}
</style>
