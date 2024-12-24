<script setup>
import ManagementBar from './bar/ManagementBar.vue'
import { computed, onBeforeMount, onMounted, provide, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWebSocketStore } from '../store/webSocket'
import { useRelationshipStore } from '../store/relationship'
import { useUserStore } from '../store/user'
import api from '../service/api'
import WindowButtons from '../components/base/WindowButtons.vue'

const ws = useWebSocketStore()
const us = useUserStore()
const rs = useRelationshipStore()
const router = useRouter()
const route = useRoute()
const managementBar = ref()

provide(
  'userId',
  computed(() => us.currentUser.id)
)
provide(
  'chatterType',
  computed(() => rs.chatter.relationshipType)
)
provide(
  'chatterId',
  computed(() => rs.chatter.id)
)

onBeforeMount(async () => {
  us.currentUser = (await api.getUserInfo(route.query.id)).data.data
  ws.initWebSocket()
  await rs.initialize()
})

onMounted(() => {
  router.replace('/main/two')
})
</script>

<template>
  <div class="main-page">
    <ManagementBar ref="managementBar" />
    <div class="zone"><router-view /></div>
    <WindowButtons class="window-buttons" />
  </div>
</template>

<style scoped lang="less">
@import '../assets/css/base';

.main-page {
  .container();
  border: 1.5px solid #aaa;
  border-radius: 5px;
  overflow: hidden;
}

.zone {
  position: absolute;
  top: 0;
  left: 65px;
  width: calc(100% - 65px);
  height: 100%;
  background-color: white;
}
</style>
