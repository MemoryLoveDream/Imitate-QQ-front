<script setup>
import StatefulButton from '../base/StatefulButton.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { chatInputIcons } from '../../constants/assets'

const emit = defineEmits(['handle-send'])
const clickFunctions = [
  (event) => {
    frameVisible.value = !frameVisible.value
    console.log(event.clientX)
    console.log(event.clientY)
    console.log()
  },
  () => {},
  () => {},
  () => {}
]
const text = ref('')
const btnClickable = ref(true)
const frameVisible = ref(false)

watch(text, (value) => {
  btnClickable.value = value === ''
})

function sendChat() {
  emit('handle-send', text.value)
  text.value = ''
}

onBeforeMount(() => {
  chatInputIcons.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})
</script>

<template>
  <div class="chat-input">
    <StatefulButton
      v-for="(icon, index) in chatInputIcons"
      :key="index"
      class="icon"
      :urls="icon"
      tip
      hover-effect="icon"
    />
    <textarea v-model="text" class="text" spellcheck="false"></textarea>
    <el-button class="btn" color="dodgerblue" :disabled="btnClickable" @click="sendChat">
      发送
    </el-button>
    <div v-show="frameVisible" class="frame">
      <el-scrollbar>
        <div class="emojis"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.chat-input {
  display: flex;
  justify-content: start;

  .icon {
    position: relative;
    width: 35px;
    height: 35px;
    top: 0;
    left: 0;
    margin: 5px;
  }
}

.text {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 40px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: transparent;
  border: none;
  resize: none;
  outline: none;
  font-size: 16px;
}

.btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100px;
}

.frame {
  position: fixed;
  width: 400px;
  height: 300px;
  bottom: 200px;
  left: 400px;
  border-radius: 5px;
  box-shadow: 3px 3px 20px 2px #aaa;
  overflow: hidden;
  //overflow: scroll;
  //scrollbar-width: none;
  //scrollbar-color: transparent #aaa;

  .emojis {
    position: absolute;
    width: 100%;
    height: 400px;
    background-color: pink;
  }
}
</style>
