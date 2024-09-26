<script setup>
import ManagementBar from './ManagementBar.vue'
import { onMounted } from 'vue'
import router from '../router'

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
