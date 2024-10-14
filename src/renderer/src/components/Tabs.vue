<script setup>
import { onMounted, reactive, ref } from 'vue'
import ActivatableIcon from './base/ActivatableIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tabs = reactive([
  {
    name: '消息',
    inactive_url: '/src/assets/pic/tabs/message.svg',
    active_url: '/src/assets/pic/tabs/message_active.svg',
    click: () => {
      router.replace('/main/two/message_null')
    }
  },
  {
    name: '关系',
    inactive_url: '/src/assets/pic/tabs/relationship.svg',
    active_url: '/src/assets/pic/tabs/relationship_active.svg',
    click: () => {
      router.replace('/main/two/relationship_null')
    }
  },
  {
    name: '视频',
    inactive_url: '/src/assets/pic/tabs/video.svg',
    active_url: '/src/assets/pic/tabs/video_active.svg',
    click: () => {
      window.api.create_child('video', 970, 680, '/short')
    }
  },
  {
    name: '社区',
    inactive_url: '/src/assets/pic/tabs/community.svg',
    active_url: '/src/assets/pic/tabs/community_active.svg',
    click: () => {}
  },
  {
    name: '探索',
    inactive_url: '/src/assets/pic/tabs/explore.svg',
    active_url: '/src/assets/pic/tabs/explore_active.svg',
    click: () => {}
  }
])
const tabsRef = ref([])
const selected = ref(0)

function afterSelect(index) {
  if (selected.value !== index) {
    tabsRef.value[selected.value].setIsActive('inactive')
    selected.value = index
  }
}

function changeTab(index) {
  tabsRef.value[index].setIsActive('active')
  afterSelect(index)
}

defineExpose({ changeTab })

onMounted(() => {
  tabsRef.value[0].setIsActive('active')
})
</script>

<template>
  <div class="tabs">
    <ActivatableIcon
      v-for="(tab, index) in tabs"
      ref="tabsRef"
      :key="index"
      :n="index"
      :urls="tab"
      hoverable
      tip
      class="tab"
      @after-select="afterSelect"
    />
  </div>
</template>

<style scoped lang="less">
.tabs {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
}

.tab {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 37px;
  height: 37px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
