import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
  'config',
  () => {
    const chat_history_location = ref('E:/project/Vue/easychat-front/config/users/')

    return {
      chat_history_location
    }
  },
  { persist: true }
)
