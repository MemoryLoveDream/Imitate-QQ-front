<script setup>
import ChatInput from '../../components/chat/ChatInput.vue'
import { inject, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'
import { useWebSocketStore } from '../../store/webSocket'
import { now } from '../../utils/date'
import StatefulButton from '../../components/base/StatefulButton.vue'
import { StatefulIcon } from '../../constants/assets'
import Chat from '../../components/chat/Chat.vue'

const ws = useWebSocketStore()
const rs = useRelationshipStore()
const cs = useComponentsStore()
const chatDetails = ref()
const userId = inject('userId')
const scrollbar = ref()
const inner = ref()
const n = ref(0)

const clickFunctions = [
  () => {},
  () => {
    window.api.createWindow(
      'video_call',
      700,
      680,
      `/video_call/${inject('userId').value}/${rs.chatter.id}`
    )
  },
  () => {}
]

watch(
  () => rs.chatter.id,
  () => {
    refresh()
  }
)

watch(
  () => rs.chatter.history,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)

function sendChat(chat) {
  rs.addChat(rs.chatter.type, rs.chatter.id, chat)
  chat.messageType = rs.chatter.type
  chat.receiverId = rs.chatter.id
  delete chat.sendTime
  ws.sendChat(chat)
}

function handleSend(chatType, content) {
  sendChat({
    senderId: userId.value,
    sendTime: now(),
    chatType: chatType,
    content: content
  })
}

function scrollToBottom() {
  setTimeout(() => {
    let h = inner.value.clientHeight
    scrollbar.value.setScrollTop(h)
  }, 100)
}

function refresh() {
  n.value++
  scrollToBottom()
}

defineExpose({ refresh })

onBeforeMount(() => {
  StatefulIcon.ChatFunctionBar.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
  console.log(rs.chatter.info)
})

onMounted(() => {
  cs.chatDetails = chatDetails.value
})
</script>

<template>
  <div class="message-block">
    <!--    ChatFunctionBar  -->
    <div class="chat-function-bar">
      <div class="nickname">{{ rs.chatter.info.nickname }}</div>
      <StatefulButton
        v-for="(icon, index) in StatefulIcon.ChatFunctionBar"
        :key="index"
        class="icon"
        :paths="icon"
        tip
        hover-effect="icon"
      />
    </div>
    <!--    Divider  -->
    <div class="divider1"></div>
    <!--    ChatDetails  -->
    <div class="chat-details">
      <el-scrollbar ref="scrollbar">
        <div ref="inner" :key="n">
          <Chat
            v-for="(chat, index) in rs.chatter.history.details"
            :key="index"
            class="row"
            :chat="chat"
          />
        </div>
      </el-scrollbar>
    </div>
    <!--    Divider  -->
    <div class="divider2"></div>
    <!--    ChatInput  -->
    <ChatInput class="chat-input" @handle-send="handleSend" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';

.message-block {
  .container();
  .user-cannot-select();
  background-color: whitesmoke;
}

.chat-function-bar {
  position: absolute;
  width: 100%;
  height: 70px;
  .user-cannot-select();
  display: flex;
  justify-content: end;

  .nickname {
    position: absolute;
    top: 35px;
    left: 18px;
    font-size: 16px;
    color: black;
  }

  .icon {
    position: relative;
    width: 40px;
    height: 40px;
    top: 30px;
  }
}

.divider {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}

.divider1 {
  .divider();
  top: 70px;
}

.chat-details {
  position: absolute;
  top: 70px;
  height: calc(100% - 270px);
  width: 100%;

  .row {
    position: relative;
    width: 100%;
  }
}

.divider2 {
  .divider();
  top: calc(100% - 201px);
}

.chat-input {
  position: absolute;
  bottom: 0;
  height: 200px;
  width: 100%;
}
</style>
