import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import { useComponentsStore } from './components'
import { useRelationshipStore } from './relationship'

export const useWebSocketStore = defineStore(
  'ws',
  () => {
    const userStore = useUserStore()
    const relationshipStore = useRelationshipStore()
    const componentsStore = useComponentsStore()
    const ws = ref()

    function webSocketOnMessage(e) {
      const data = JSON.parse(e.data)
      data.sendId = relationshipStore.singleInformation.id
      data.headUrl = relationshipStore.singleInformation.headUrl
      componentsStore.addChat(data)
    }

    function initWebSocket() {
      ws.value = new WebSocket('ws://localhost:8888/ws?id=' + userStore.currentUser.id)
      ws.value.onmessage = webSocketOnMessage
      ws.value.onopen = () => console.log('连接')
      ws.value.onerror = () => console.log('后端没开！')
      ws.value.onclose = () => console.log('断开连接')
    }

    function sendMessage(object) {
      ws.value.send(JSON.stringify(object))
    }

    function closeWebSocket() {
      ws.value.send(userStore.currentUser.nickname + '已下线！')
      ws.value.close()
    }

    return {
      initWebSocket,
      sendMessage,
      closeWebSocket
    }
  },
  { persist: true }
)
