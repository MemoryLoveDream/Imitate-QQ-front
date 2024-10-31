import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import { SignalType } from '../constants/enums'
import { useRelationshipStore } from './relationship'

export const useWebSocketStore = defineStore('ws', () => {
  const ws = ref()
  const userStore = useUserStore()
  const relationshipStore = useRelationshipStore()

  async function webSocketOnMessage(e) {
    let signal = JSON.parse(e.data)
    console.log(e.data)
    if (signal.signalType === SignalType.SEND_CHAT) {
      let chat = JSON.parse(signal.content)
      delete chat.receiverId
      await relationshipStore.addChat(chat.messageType, chat.senderId, chat)
    } else if (signal.signalType === SignalType.REQUEST_PEER_ID) {
      let call = JSON.parse(signal.content)
      await window.api.createWindow('video_call', 700, 680, `/video_call/called/${call.callerId}`)
    } else if (signal.signalType === SignalType.SEND_PEER_ID) {
      let peer = JSON.parse(signal.content)
      window.api.setPeerId(peer.peerId)
    }
  }

  function anonymousInit() {
    ws.value = new WebSocket('ws://localhost:8888/ws')
    ws.value.onmessage = webSocketOnMessage
    ws.value.onerror = () => console.log('后端没开！')
    ws.value.onclose = () => console.log('断开连接！')
  }

  function initWebSocket() {
    anonymousInit()
    ws.value.onopen = () =>
      sendSignal({
        signalType: SignalType.FIRST_CONNECTION,
        content: `${userStore.currentUser.id}`
      })
    window.addEventListener('beforeunload', function () {
      sendSignal({ signalType: SignalType.DISCONNECTION, content: `${userStore.currentUser.id}` })
      ws.value.close()
    })
  }

  function sendSignal(object) {
    ws.value.send(JSON.stringify(object))
  }

  function sendChat(chat) {
    sendSignal({ signalType: SignalType.SEND_CHAT, content: JSON.stringify(chat) })
  }

  function requestPeerId(callerId, calleeId) {
    sendSignal({
      signalType: SignalType.REQUEST_PEER_ID,
      content: JSON.stringify({ callerId: callerId, calleeId: calleeId })
    })
  }

  function sendPeerId(callerId, peerId) {
    sendSignal({
      signalType: SignalType.SEND_PEER_ID,
      content: JSON.stringify({ callerId: callerId, peerId: peerId })
    })
  }

  return {
    ws,
    anonymousInit,
    initWebSocket,
    sendSignal,
    sendChat,
    requestPeerId,
    sendPeerId
  }
})
