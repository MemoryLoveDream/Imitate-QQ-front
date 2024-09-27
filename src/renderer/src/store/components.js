import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useComponentsStore = defineStore(
  'components',
  () => {
    const tabs = ref()
    const chatDetails = ref()

    function changeTab(index) {
      tabs.value.changeTab(index)
    }

    function addChat(chat) {
      chatDetails.value.addChat(chat)
    }

    function sendChat(chat) {
      chatDetails.value.sendChat(chat)
    }

    function refreshChatHistory() {
      chatDetails.value.refresh()
    }

    return {
      tabs,
      chatDetails,
      changeTab,
      addChat,
      sendChat,
      refreshChatHistory
    }
  },
  { persist: true }
)
