<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import Peer from 'peerjs'
import WindowButtons from '../components/base/WindowButtons.vue'
import { useWebSocketStore } from '../store/webSocket'
import { useRoute } from 'vue-router'

const ws = useWebSocketStore()
const route = useRoute()

const localCameraVideo = ref()
const remoteCameraVideo = ref()
let localMediaStream, callerId, calleeId, peer, call, peerId
let anotherPeerId = ''
const text = ref('')

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

async function startCaller() {
  localMediaStream = await getUserMedia({ audio: true, video: true })
  localCameraVideo.value.srcObject = localMediaStream
  localCameraVideo.value.play()
  peer = new Peer({
    config: {
      iceServers: [
        {
          username: 'wy',
          credential: '25252525',
          url: 'stun:stun.l.google.com:19302'
        },
        {
          username: 'wy',
          credential: '25252525',
          url: 'turn:turn.bistri.com:80'
        }
      ]
    }
  })
  peer.on('open', (id) => {
    peerId = id
    console.log('My peer ID is: ' + peerId)
  })
  peer.on('call', (call) => {
    call.answer(localMediaStream)
    call.on('stream', (stream) => {
      remoteCameraVideo.value.srcObject = stream
      remoteCameraVideo.value.play()
    })
  })
}

function startCall() {
  anotherPeerId = text.value
  call = peer.call(anotherPeerId, localMediaStream)
  call.on('stream', (stream) => {
    remoteCameraVideo.value.srcObject = stream
    remoteCameraVideo.value.play()
  })
  call.on('close', () => {
    console.log('结束')
  })
  call.on('error', (err) => {
    console.log(err)
  })
}

function endCall() {
  if (call) {
    call.close()
    call = null
  }
}

onBeforeMount(() => {
  ws.anonymousInit()
})

onMounted(async () => {
  setInterval(() => {
    if (window.api.getPeerId() !== '') {
      anotherPeerId = window.api.getPeerId()
      window.api.setPeerId('')
      startCall()
    }
  }, 2000)
  await startCaller()
  if (route.params.c1 !== 'none') {
    if (route.params.c1 === 'called') {
      callerId = Number(route.params.c2)
      ws.sendPeerId(callerId, peerId)
    } else {
      callerId = Number(route.params.c1)
      calleeId = Number(route.params.c2)
    }
  }
  // remoteCameraVideo.value.srcObject = localMediaStream
  // remoteCameraVideo.value.play()
  // ws.requestPeerId(callerId, calleeId)
  console.log(localCameraVideo.value.srcObject)
  console.log(remoteCameraVideo.value.srcObject)
})
</script>

<template>
  <div class="video-call">
    <video ref="remoteCameraVideo" class="you"></video>
<!--    <video ref="remoteCameraVideo" class="you" src="http://192.168.0.104:4747/video"></video>-->
<!--    <video ref="remoteCameraVideo" class="you" src="E:/铭冥/2023/冬日散步.mp4" autoplay></video>-->
<!--    <img ref="remoteCameraVideo" class="you" alt="" src="http://192.168.0.104:4747/video" />-->
    <video ref="localCameraVideo" class="i"></video>
    <el-button circle class="call" color="dodgerblue" @click="startCall">Call</el-button>
    <input v-model="text" class="input" />
    <WindowButtons control="video_call" />
  </div>
</template>

<style scoped lang="less">
.you {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
}

.i {
  position: absolute;
  height: 250px;
  width: 300px;
  top: 0;
  left: 0;
  background-color: black;
}

.call {
  position: absolute;
  top: 70%;
  left: 50%;
  height: 50px;
  width: 50px;
  transform: translateX(-50%);
}

.input {
  position: absolute;
  top: 80%;
  left: 50%;
  height: 30px;
  width: 200px;
  transform: translateX(-50%);
}
</style>
