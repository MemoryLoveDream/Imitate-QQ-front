<script setup>
import StatefulButton from './base/StatefulButton.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { tabIcons } from '../constants/assets'

const router = useRouter()
const clickFunctions = [
  () => {
    router.replace('/main/two/message_null')
  },
  () => {
    router.replace('/main/two/relationship_null')
  },
  () => {
    window.api.createWindow('video', 970, 680, '/short')
  },
  () => {},
  () => {}
]

const tabsRef = ref([])
const selected = ref(0)

function afterClick(index) {
  if (selected.value !== index) {
    tabsRef.value[selected.value].setIsActive(false)
    selected.value = index
  }
}

function changeTab(index) {
  tabsRef.value[index].setIsActive(true)
  afterClick(index)
}

defineExpose({ changeTab })

onBeforeMount(() => {
  tabIcons.forEach((icon, index) => {
    icon.click = clickFunctions[index]
  })
})

onMounted(() => {
  tabsRef.value[0].setIsActive(true)
})
</script>

<template>
  <div class="tabs">
    <StatefulButton
      v-for="(tab, index) in tabIcons"
      :key="index"
      ref="tabsRef"
      class="tab"
      :index="index"
      :urls="tab"
      tip
      tip-place="right"
      hover-effect="background"
      @after-click="afterClick"
    />
  </div>
</template>

<style scoped lang="less">
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
