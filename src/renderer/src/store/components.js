import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComponentsStore = defineStore('components', () => {
  const tabs = ref()
  const messageBar = ref()
  const videoCall = ref()

  function changeTab(index) {
    tabs.value.changeTab(index)
  }

  return {
    tabs,
    messageBar,
    videoCall,
    changeTab
  }
})
