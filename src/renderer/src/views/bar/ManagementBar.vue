<script setup>
import Tabs from '../../components/Tabs.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../store/user'
import { useComponentsStore } from '../../store/components'

const userStore = useUserStore()
const componentsStore = useComponentsStore()
const tabs = ref()

onMounted(() => {
  componentsStore.tabs = tabs.value
})
</script>

<template>
  <div class="management-bar">
    <div class="background"></div>
    <el-avatar class="avatar" :size="35" :src="userStore.currentUser?.headUrl" @dragstart.prevent />
    <Tabs ref="tabs" class="tabs" />
  </div>
</template>

<style scoped lang="less">
@import '../../assets/css/base';
.management-bar {
  position: absolute;
  width: 65px;
  height: 100%;
  //background-color: #eeeeee;
  background-color: whitesmoke;
  opacity: 95%;
  backdrop-filter: blur(8px);
  //filter: blur(8px);
  .user-cannot-select();
}

.background {
  .container();
  background-color: whitesmoke;
  opacity: 95%;
  filter: blur(8px);
}

.avatar {
  .horizontal-center();
  top: 25px;
}

.tabs {
  position: absolute;
  top: 75px;
  width: 100%;
}
</style>
