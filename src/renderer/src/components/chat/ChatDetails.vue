<script setup>
import { onMounted, ref } from 'vue'
import Chat from './Chat.vue'
import { useRelationshipStore } from '../../store/relationship'
import { useWebSocketStore } from '../../store/webSocket'

const relationshipStore = useRelationshipStore()
const ws = useWebSocketStore()
const scrollbar = ref()
const inner = ref()
const n = ref(0)

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

function addChat(chat) {
  chat.addChatHistory(chat)
  scrollToBottom()
}

function sendChat(chat) {
  addChat(chat)
  chat.receiver_id = relationshipStore.singleInformation.id
  ws.sendMessage(chat)
}

defineExpose({ addChat, sendChat, refresh })

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="chat-details">
    <el-scrollbar ref="scrollbar">
      <div ref="inner" :key="n">
        <Chat
          v-for="(chat1, index) in relationshipStore.getChatHistory()"
          :key="index"
          class="row"
          :chat="chat1"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="less">
.chat-details {
  position: absolute;
  top: 70px;
  height: calc(100% - 270px);
  width: 100%;
  background-color: transparent;
}

.row {
  position: relative;
  width: 100%;
}
</style>
