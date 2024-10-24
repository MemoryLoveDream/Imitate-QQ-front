<script setup>
import ManagementBar from './bar/ManagementBar.vue'
import { computed, onBeforeMount, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useWebSocketStore } from '../store/webSocket'
import { useRelationshipStore } from '../store/relationship'
import { useUserStore } from '../store/user'

const ws = useWebSocketStore()
const userStore = useUserStore()
const relationshipStore = useRelationshipStore()
const router = useRouter()

provide(
  'userId',
  computed(() => userStore.currentUser.id)
)

provide('getHeadUrl', relationshipStore.getHeadUrl)

onBeforeMount(() => {
  ws.initWebSocket()
  relationshipStore.initialize()
})

onMounted(() => {
  router.replace('/main/two')
})
</script>

<template class="container">
  <ManagementBar />
  <div class="zone"><router-view /></div>
</template>

<style scoped lang="less">
.zone {
  position: absolute;
  top: 0;
  left: 65px;
  width: calc(100% - 65px);
  height: 100%;
}
</style>
