import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import { useComponentsStore } from './components'

export const useWebSocketStore = defineStore(
  'ws',
  () => {
    const user = useUserStore()
    const components = useComponentsStore()
    const ws = ref()

    function webSocketOnMessage(e) {
      const data = JSON.parse(e.data)
      data.user_id = user.current_partner.id
      data.head_url = user.current_partner.head_url
      components.addChat(data)
    }

    function initWebSocket() {
      ws.value = new WebSocket('ws://localhost:8888/ws?id=' + user.current_user.id)
      ws.value.onmessage = webSocketOnMessage
      ws.value.onopen = () => console.log('连接')
      ws.value.onerror = () => console.log('后端没开！')
      ws.value.onclose = () => console.log('断开连接')
    }

    function sendMessage(object) {
      ws.value.send(JSON.stringify(object))
    }

    function closeWebSocket() {
      ws.value.send(user.current_user.nickname + '已下线！')
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
