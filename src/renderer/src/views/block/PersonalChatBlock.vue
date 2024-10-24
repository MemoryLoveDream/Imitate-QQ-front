<script setup>
import WindowButtons from '../../components/base/WindowButtons.vue'
import ChatFunctionBar from '../../components/chat/ChatFunctionBar.vue'
import ChatDetails from '../../components/chat/ChatDetails.vue'
import ChatInput from '../../components/chat/ChatInput.vue'
import { inject, onMounted, ref } from 'vue'
import { useComponentsStore } from '../../store/components'
import { useRelationshipStore } from '../../store/relationship'
import { useWebSocketStore } from '../../store/webSocket'
import { now } from '../../utils/date'

const ws = useWebSocketStore()
const relationshipStore = useRelationshipStore()
const componentsStore = useComponentsStore()
const chatDetails = ref()
const userId = inject('userId')
const userHeadUrl = inject('userHeadUrl')

function sendChat(chat) {
  relationshipStore.addChatHistory(...relationshipStore.chatterUid, chat)
  ;[chat.messageType, chat.receiverId] = relationshipStore.chatterUid
  ws.sendMessage(chat)
}

function handleSend(text) {
  sendChat({
    senderId: userId.value,
    // headUrl: userHeadUrl.value,
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
    <ChatFunctionBar :chatter="relationshipStore.chatter" />
    <ChatDetails ref="chatDetails" :history="relationshipStore.history" />
    <ChatInput @handle-send="handleSend" />
    <WindowButtons />
  </div>
</template>

<style scoped lang="less">
.message-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
</style>
