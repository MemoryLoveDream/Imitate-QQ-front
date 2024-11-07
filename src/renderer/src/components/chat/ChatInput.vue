<script setup>
import StatefulButton from '../base/StatefulButton.vue'
import { onBeforeMount, ref, watch } from 'vue'
import { chatInputIcons } from '../../constants/assets'
import { ChatType } from '../../constants/enums'
import apis from '../../services/apis'

const emit = defineEmits(['handle-send'])
const clickFunctions = [
  (event) => {
    frameVisible.value = !frameVisible.value
    console.log(event.clientX)
    console.log(event.clientY)
    console.log()
  },
  () => {
    input.value.click()
  },
  () => {
    content.value =
      'img:///' +
      window.api.selectFile({
        filters: [
          {
            name: 'Images',
            extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp', 'avif', 'bmp', 'sharpp', 'apng']
          }
        ],
        properties: ['openFile']
      })
    chatType.value = ChatType.PICTURE
  },
  () => {}
]
const chatType = ref(ChatType.TEXT)
const content = ref('')
const btnClickable = ref(true)
const frameVisible = ref(false)
const input = ref()

watch(content, (value) => {
  btnClickable.value = value === ''
})

function sendChat() {
  emit('handle-send', chatType.value, content.value)
  content.value = ''
}

onBeforeMount(() => {
  chatInputIcons.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})
</script>

<template>
  <div class="chat-input">
    <input id="input" ref="input" class="file" type="file" @change="apis.upload" />
    <StatefulButton
      v-for="(icon, index) in chatInputIcons"
      :key="index"
      class="icon"
      :urls="icon"
      tip
      hover-effect="icon"
    />
    <textarea
      v-show="chatType === ChatType.TEXT"
      v-model="content"
      class="text"
      spellcheck="false"
    />
    <img v-show="chatType === ChatType.PICTURE" class="pic" alt="" :src="content" />
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

.file {
  width: 20px;
  height: 20px;
  display: none;
}

.text {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 40px;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  resize: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
}

.pic {
  position: absolute;
  width: auto;
  height: 80px;
  top: 40px;
  margin-left: 15px;
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
