<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onBeforeMount, reactive } from 'vue'
import { useUserStore } from './store/user'

const locale = zhCn
const config = reactive({ max: 1 })
const userStore = useUserStore()

onBeforeMount(() => {
  userStore.initialize()
})
</script>

<template>
  <el-config-provider :locale="locale" :message="config">
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
