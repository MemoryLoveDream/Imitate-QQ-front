import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComponentsStore = defineStore(
  'components',
  () => {
    const tabs = ref()
    const chat_details = ref()

    function changeTab(index) {
      tabs.value.changeTab(index)
    }

    function addChat(chat) {
      chat_details.value.addChat(chat)
    }

    function sendChat(chat) {
      chat_details.value.sendChat(chat)
    }

    function refreshChatHistory() {
      chat_details.value.refresh()
    }

    return {
      tabs,
      chat_details,
      changeTab,
      addChat,
      sendChat,
      refreshChatHistory
    }
  },
  { persist: true }
)
