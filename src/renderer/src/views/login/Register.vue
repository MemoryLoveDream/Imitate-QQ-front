<script setup>
import CloseButton from '../../components/base/CloseButton.vue'
import { ref, watch } from 'vue'
import Input from '../../components/input/Input.vue'
import { useUserStore } from '../../store/user'
import api from '../../services/api'
import { useRouter } from 'vue-router'
import { Icon } from '../../constants/assets'
import { isEmail, isPhoneNumber, selectImage, warningMessage } from "../../utils/free";
import VerifyInput from '../../components/input/VerifyInput.vue'

const us = useUserStore()
const router = useRouter()
let avatar = Icon.DefaultAvatar
const avatarPath = ref(Icon.DefaultAvatar)
const id = ref()
const nickname = ref()
const password = ref()
const verify = ref()
const disable = ref(true)

watch(
  [
    () => id.value?.text,
    () => nickname.value?.text,
    () => password.value?.text,
    () => verify.value?.text
  ],
  ([newId, newNickname, newPassword, newVerify]) => {
    disable.value = newId === '' || newNickname === '' || newPassword === '' || newVerify === ''
  }
)

function handleClick() {
  api.verify({ id: id.value.text, verify: verify.value.text })
}

async function register() {
  if (!isPhoneNumber(id.value.text) && !isEmail(id.value.text)) warningMessage('号码或邮箱格式错误')
  else if (password.value.text.length < 6 || password.value.text.length > 20)
    warningMessage('密码长度应该6到20位')
  else {
    let res = await api.register({
      id: id.value.text,
      nickname: nickname.value.text,
      password: password.value.text,
      verify: verify.value.text
    })
    if (res.data.code === 200) {
      us.updateLatestLoginedUser(res.data.data, password.value.text)
      window.api.createWindow('main', 970, 680, `/main?id=${res.data.data}`, {
        transparent: true,
        minWidth: 395,
        minHeight: 550
      })
      window.api.close('login')
    } else warningMessage('号码邮箱不存在或验证码错误')
  }
}

function change(url) {
  router.replace(url)
}

function hover_avatar() {
  if (avatarPath.value !== Icon.ChangeAvatar) {
    avatarPath.value = Icon.ChangeAvatar
  } else {
    avatarPath.value = avatar
  }
}

function change_avatar() {
  avatar = `img:///${selectImage()}`
  avatarPath.value = avatar
}
</script>

<template>
  <div class="background">
    <el-avatar
      class="avatar"
      :size="80"
      :src="avatarPath"
      @mouseover="hover_avatar"
      @mouseout="hover_avatar"
      @click="change_avatar"
    />
    <Input ref="id" class="id" placeholder="输入注册邮箱或号码" />
    <Input ref="nickname" class="nickname" placeholder="输入昵称" />
    <Input ref="password" class="password" placeholder="输入密码" type="password" />
    <VerifyInput ref="verify" class="verify" placeholder="输入验证码" @handle-click="handleClick" />
    <el-button class="register" color="dodgerblue" :disabled="disable" @click="register">
      注册
    </el-button>
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

  .input {
    .horizontal-center();
    width: 250px;
    height: 40px;
  }

  .id {
    .input();
    top: 30%;
  }

  .nickname {
    .input();
    top: 42%;
  }

  .password {
    .input();
    top: 54%;
  }

  .verify {
    .input();
    top: 66%;
  }
}

.avatar {
  .horizontal-center();
  top: 10%;
  background-color: white;
}

.register {
  .horizontal-center();
  top: 78%;
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
