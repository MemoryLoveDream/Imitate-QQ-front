<script setup>
import Tabs from '../components/Tabs.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/user'
import { useComponentsStore } from '../store/components'

const userStore = useUserStore()
const componentsStore = useComponentsStore()
const tabs = ref()

onMounted(() => {
  componentsStore.tabs = tabs.value
})
</script>

<template>
  <div class="management-bar">
    <el-avatar
      class="avatar"
      :size="35"
      :src="userStore.currentUser.headUrl"
      style="user-select: none"
    />
    <Tabs ref="tabs" />
  </div>
</template>

<style scoped lang="less">
.management-bar {
  position: absolute;
  width: 65px;
  height: 100%;
  background-color: #eeeeee;
}

.avatar {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
