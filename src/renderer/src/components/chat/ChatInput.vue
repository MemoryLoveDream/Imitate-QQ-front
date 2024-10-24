<script setup>
import HoverableIcon from '../base/HoverableIcon.vue'
import { ref, watch } from 'vue'

const emit = defineEmits(['handle-send'])

const icons = [
  {
    name: 'emoji',
    inactive_url: '/src/assets/pic/chat_input/emoji.svg',
    hover_url: '/src/assets/pic/chat_input/emoji_hover.svg'
  },
  {
    name: 'folder',
    inactive_url: '/src/assets/pic/chat_input/folder.svg',
    hover_url: '/src/assets/pic/chat_input/folder_hover.svg'
  },
  {
    name: 'picture',
    inactive_url: '/src/assets/pic/chat_input/picture.svg',
    hover_url: '/src/assets/pic/chat_input/picture_hover.svg'
  },
  {
    name: 'voice',
    inactive_url: '/src/assets/pic/chat_input/voice.svg',
    hover_url: '/src/assets/pic/chat_input/voice_hover.svg'
  }
]
const text = ref('')
const disabled = ref(true)

function sendChat() {
  emit('handle-send', text.value)
  text.value = ''
}

watch(text, (value) => {
  disabled.value = value === ''
})
</script>

<template>
  <div class="chat-input">
    
    <div class="divider"></div>
    <div class="icons">
      <HoverableIcon v-for="icon in icons" :key="icon.name" class="icon" :urls="icon" />
    </div>
    <textarea v-model="text" class="text" spellcheck="false"></textarea>
    <el-button class="btn" color="dodgerblue" :disabled="disabled" @click="sendChat">
      发送
    </el-button>
  </div>
</template>

<style scoped lang="less">
.chat-input {
  position: absolute;
  top: calc(100% - 200px);
  height: 200px;
  width: 100%;
  background-color: transparent;
}

.divider {
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}

.icons {
  position: absolute;
  top: 10px;
  right: 0;
  padding-left: 10px;
  height: 20px;
  width: 100%;
  background-color: transparent;
}

.icon {
  position: relative;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 15px;
}

.text {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 100px;
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
</style>
