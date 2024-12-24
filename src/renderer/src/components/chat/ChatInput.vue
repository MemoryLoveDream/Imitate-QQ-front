<script setup>
import StatefulButton from '../base/StatefulButton.vue'
import { inject, onBeforeMount, ref, watch } from 'vue'
import { StatefulIcon } from '../../constants/assets'
import { ChatType, RelationshipType } from '../../constants/enums'
import api from '../../service/api'
import { useRelationshipStore } from '../../store/relationship'
import { now } from '../../utils/date'
import { useWebSocketStore } from '../../store/webSocket'

const rs = useRelationshipStore()
const ws = useWebSocketStore()
const userId = inject('userId')
const chatType = ref(ChatType.TEXT)
const content = ref()
const format = ref('*')
const btnClickable = ref(true)
const frameVisible = ref(false)
const fileSelector = ref()

const clickFunctions = [
  (event) => {
    frameVisible.value = !frameVisible.value
    console.log(event.clientX)
    console.log(event.clientY)
  },
  () => {
    format.value = '*'
    setTimeout(() => {
      fileSelector.value.click()
    }, 0)
    chatType.value = ChatType.FILE
  },
  () => {
    format.value = 'image/*'
    setTimeout(() => {
      fileSelector.value.click()
    }, 0)
    chatType.value = ChatType.PICTURE
  },
  () => {
    chatType.value = ChatType.VOICE
  }
]

watch(content, (value) => {
  btnClickable.value = value === ''
})

function handleFile(event) {
  let file = event.target.files[0]
  content.value = { name: file.name, size: file.size }
  api.upload(file, RelationshipType.FRIEND, rs.chatter.id, '')
}

function sendChat() {
  let chat = {
    senderId: userId.value,
    sendTime: now(),
    chatType: chatType.value,
    content: content.value
  }
  rs.addChat(rs.chatter.relationshipType, rs.chatter.id, chat)
  chat.messageType = rs.chatter.relationshipType
  chat.receiverId = rs.chatter.id
  delete chat.sendTime
  ws.sendChat(chat)
  content.value = ''
}

onBeforeMount(() => {
  StatefulIcon.ChatInput.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})
</script>

<template>
  <div class="chat-input">
    <input ref="fileSelector" class="file" type="file" :accept="format" @change="handleFile" />
    <StatefulButton
      v-for="(icon, index) in StatefulIcon.ChatInput"
      :key="index"
      class="icon"
      :paths="icon"
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
