<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onBeforeMount, reactive } from 'vue'
import { useUserStore } from './store/user'
import { useWebSocketStore } from './store/webSocket'
import { useRelationshipStore } from './store/relationship'

const locale = zhCn
const config = reactive({ max: 1 })
const userStore = useUserStore()
const relationshipStore = useRelationshipStore()
const ws = useWebSocketStore()

onBeforeMount(() => {
  userStore.initialize()
  relationshipStore.initialize()
  ws.initWebSocket()
})
</script>

<template>
  <el-config-provider :locale="locale" :message="config" class="container">
    <router-view />
  </el-config-provider>
</template>

<style lang="less">
.container {
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
