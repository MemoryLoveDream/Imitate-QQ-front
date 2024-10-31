<script setup>
import ChatFunctionBar from '../../components/chat/ChatFunctionBar.vue'
import ChatDetails from '../../components/chat/ChatDetails.vue'
import ChatInput from '../../components/chat/ChatInput.vue'
import { inject, onMounted, ref } from 'vue'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'
import { useWebSocketStore } from '../../store/webSocket'
import { now } from '../../utils/date'

const ws = useWebSocketStore()
const rs = useRelationshipStore()
const componentsStore = useComponentsStore()
const chatDetails = ref()
const userId = inject('userId')

function sendChat(chat) {
  rs.addChat(rs.chatter.type, rs.chatter.id, chat)
  chat.messageType = rs.chatter.type
  chat.receiverId = rs.chatter.id
  ws.sendMessage(chat)
}

function handleSend(text) {
  sendChat({
    senderId: userId.value,
    sendTime: now(),
    chatType: 1,
    content: text
  })
}

onMounted(() => {
  componentsStore.chatDetails = chatDetails.value
})
</script>

<template>
  <div class="message-block">
    <ChatFunctionBar class="chat-function-bar" :chatter="rs.chatter.info" />
    <div class="divider1"></div>
    <ChatDetails ref="chatDetails" class="chat-details" :history="rs.chatter.history.details" />
    <div class="divider2"></div>
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
