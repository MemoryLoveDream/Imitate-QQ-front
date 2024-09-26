<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import user from '../store/user'
import axios from 'axios'
// import Peer from "peerjs";

const ws = new WebSocket('ws://localhost:8888/ws')
const message = ref('hello')
const name = user()

const localCameraVideo = ref()
const remoteCameraVideo = ref()

function openWebSocket() {
  let actions = { test: '12345' }
  ws.send(JSON.stringify(actions))
}

function webSocketOnMessage(e) {
  // const data = JSON.parse(e.data)
  message.value = message.value + e.data
}

function closeWebsocket(e) {
  ElMessage('断开连接', e)
}

function initWebSocket() {
  ws.onmessage = webSocketOnMessage
  ws.onopen = openWebSocket
  ws.onerror = () => {
    ElMessage('后端没开！')
  }
  ws.onclose = closeWebsocket
}

function getUserMedia(constrains, success) {
  if (window.navigator.mediaDevices.getUserMedia) {
    return window.navigator.mediaDevices.getUserMedia(constrains).then(success)
  } else if (window.navigator.webkitGetUserMedia) {
    return window.navigator.webkitGetUserMedia(constrains, success)
  } else if (window.navigator.mozGetUserMedia) {
    return window.navigator.mozGetUserMedia(constrains, success)
  } else if (window.navigator.getUserMedia) {
    return window.navigator.getUserMedia(constrains, success)
  }
}

// function createPeerSendToWebSocketServer(webSocketConnection) {
//   const peer = new Peer()
//   //当peer被打开时被执行,peerId是全局唯一的
//   peer.on('open', (peerId) => {
//     console.log('peer opene, the peerId is:', peerId)
//
//     peer.on('close', () => {
//       console.log('peer close....')
//       //（呼叫方和接收方的ID都应该保存到服务器）
//       //此处应该发送一个JSON对象给服务器，方便判断，以下是伪代码，用于演示
//       webSocketConnection.send(peerId)
//     })
//     //（呼叫方和接收方的ID都应该保存到服务器）
//     //此处应该发送一个JSON对象给服务器，方便判断，以下是伪代码，用于演示
//     webSocketConnection.send(peerId)
//   })
//
//   //peerId是对方的peer id，localUserMedia是上面通过getUserMedia获取到的（promise调then）
//   const call = peer.call(peerId, localUserMedia);
//
//   //当得到流时调用，remoteUserMedia 是对方的流媒体，直接赋值给video的srcObject 属性，就可以看到对方的画面了
//   call.on('stream', (remoteUserMedia) => {
//     remoteCameraVideo.value.srcObject = remoteUserMedia;
//     remoteCameraVideo.value.play();
//   })
//
//   peer.on('call', (mediaConnection) => {
//     //通过mediaConnection相应给对方自己的媒体信息
//     mediaConnection.answer(localUserMedia);
//
//     //当得到流时调用，remoteUserMedia 是对方的流媒体
//     mediaConnection.on('stream', (remoteCameraStream) => {
//       remoteCameraVideo.value.srcObject = remoteCameraStream;
//       remoteCameraVideo.value.play();
//     })
//   })
//   return peer
// }


onBeforeMount(() => {
  initWebSocket()
  axios.get('/test').then((res) => {
    ElMessage(res.data)
  })
})

onMounted(() => {
  getUserMedia({ audio: true, video: true }).then((userMedia) => {
    //通过video对象的srcObject 赋值userMedia 就能预览到画面
    // let localCameraVideo = document.getElementById('localCameraVideo')
    // localCameraVideo.srcObject = userMedia
    // localCameraVideo.play()
    localCameraVideo.value.srcObject = userMedia
    localCameraVideo.value.play()
  })
})

onUnmounted(() => {
  ws.close()
})
</script>

<template class="container">
  <div>
    {{ name.username }}
  </div>
<!--  <video id="localCameraVideo" ref="localCameraVideo"></video>-->
<!--  <video id="remoteCameraVideo" ref="remoteCameraVideo"></video>-->
</template>

<style scoped lang="less">
video {
  position: relative;
  height: 200px;
  width: 200px;
  background-color: black;
}
</style>
