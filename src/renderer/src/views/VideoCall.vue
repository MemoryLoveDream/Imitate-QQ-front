<script setup>
import { onMounted, ref } from 'vue'
import Peer from 'peerjs'
import WindowButtons from '../components/base/WindowButtons.vue'
import { useComponentsStore } from '../store/components'
import { useWebSocketStore } from '../store/webSocket'

const componentsStore = useComponentsStore()
const ws = useWebSocketStore()

const localCameraVideo = ref()
const remoteCameraVideo = ref()
const localMediaStream = ref()
const peer = ref()
const call = ref()
const peerId = ref()

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
  localMediaStream.value = await getUserMedia({ audio: true, video: true })
  localCameraVideo.value.srcObject = localMediaStream.value
  localCameraVideo.value.play()
  peer.value = new Peer({
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
  peer.value.on('open', (id) => {
    peerId.value = id
    componentsStore.peerId = id
    console.log('My peer ID is: ' + peerId.value)
  })
  peer.value.on('call', (call) => {
    call.answer(localMediaStream.value)
    call.on('stream', (stream) => {
      remoteCameraVideo.value.srcObject = stream
      remoteCameraVideo.value.play()
    })
  })
}

function startCall() {
  call.value = peer.value.call(ws.othersPeerId, localMediaStream.value)
  call.value.on('stream', (stream) => {
    remoteCameraVideo.value.srcObject = stream
    remoteCameraVideo.value.play()
  })
  call.value.on('close', () => {
    console.log('结束')
  })
  call.value.on('error', (err) => {
    console.log(err)
  })
}

function endCall() {
  if (call.value) {
    call.value.close()
    call.value = null
  }
}

onMounted(async () => {
  await startCaller()
  startCall()
})
</script>

<template>
  <div class="video-call">
    <video ref="remoteCameraVideo" class="you"></video>
    <video ref="localCameraVideo" class="i"></video>
    <WindowButtons name="video_call" />
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
</style>
