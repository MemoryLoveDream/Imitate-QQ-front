<script setup>
import ManagementBar from './ManagementBar.vue'
import { onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWebSocketStore } from '../store/webSocket'
import { useRelationshipStore } from '../store/relationship'

const ws = useWebSocketStore()
const relationshipStore = useRelationshipStore()
const router = useRouter()

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
