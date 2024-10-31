<script setup>
import ManagementBar from './bar/ManagementBar.vue'
import { computed, onBeforeMount, onMounted, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWebSocketStore } from '../store/webSocket'
import { useRelationshipStore } from '../store/relationship'
import { useUserStore } from '../store/user'
import api from '../services/apis'
import WindowButtons from '../components/base/WindowButtons.vue'

const ws = useWebSocketStore()
const userStore = useUserStore()
const relationshipStore = useRelationshipStore()
const router = useRouter()
const route = useRoute()

provide(
  'userId',
  computed(() => userStore.currentUser.id)
)
provide('getHeadUrl', relationshipStore.getHeadUrl)
provide(
  'chatterType',
  computed(() => relationshipStore.chatter.type)
)
provide(
  'chatterId',
  computed(() => relationshipStore.chatter.id)
)

onBeforeMount(async () => {
  userStore.currentUser = (await api.getUserInfo(route.query.id)).data.data
  ws.initWebSocket()
  await relationshipStore.initialize()
})

onMounted(() => {
  router.replace('/main/two')
})
</script>

<template>
  <div class="main-page">
    <ManagementBar />
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
}
</style>
