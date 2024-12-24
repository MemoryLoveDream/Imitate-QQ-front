import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'
import { SignalType } from '../constants/enums'
import { useRelationshipStore } from './relationship'

export const useWebSocketStore = defineStore('ws', () => {
  const ws = ref()
  const us = useUserStore()
  const rs = useRelationshipStore()

  async function webSocketOnMessage(e) {
    let signal = JSON.parse(e.data)
    console.log(e.data)
    if (signal.signalType === SignalType.MESSAGE) {
      let chat = JSON.parse(signal.content)
      delete chat.receiverId
      await rs.addChat(chat.messageType, chat.senderId, chat)
    } else if (signal.signalType === SignalType.PEER_ID_REQUEST) {
      let call = JSON.parse(signal.content)
      await window.api.createWindow('video_call', 700, 680, `/video_call/called/${call.callerId}`)
    } else if (signal.signalType === SignalType.PEER_ID_SENDING) {
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
        signalType: SignalType.CONNECTION,
        content: `${us.currentUser.id}`
      })
    window.addEventListener('beforeunload', function () {
      sendSignal({ signalType: SignalType.DISCONNECTION, content: `${us.currentUser.id}` })
      ws.value.close()
    })
  }

  function sendSignal(object) {
    ws.value.send(JSON.stringify(object))
  }

  function sendChat(chat) {
    sendSignal({ signalType: SignalType.MESSAGE, content: JSON.stringify(chat) })
  }

  function requestPeerId(callerId, calleeId) {
    sendSignal({
      signalType: SignalType.PEER_ID_REQUEST,
      content: JSON.stringify({ callerId: callerId, calleeId: calleeId })
    })
  }

  function sendPeerId(callerId, peerId) {
    sendSignal({
      signalType: SignalType.PEER_ID_SENDING,
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
