import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const chatHistoryLocation = ref('E:/project/Vue/easychat-front/config/users/')

    return {
      chatHistoryLocation
    }
  },
  { persist: true }
)
