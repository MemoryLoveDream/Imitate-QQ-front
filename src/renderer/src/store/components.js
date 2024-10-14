import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRelationshipStore } from './relationship'
import { MessageType } from './constants'

export const useComponentsStore = defineStore('components', () => {
  const relationshipStore = useRelationshipStore()

  const tabs = ref()
  const messageBar = ref()
  const chatDetails = ref()
  const personalInformationKey = ref(0)
  const groupInformationKey = ref(0)

  function changeTab(index) {
    tabs.value.changeTab(index)
  }

  function addChat(type, id, chat) {
    chatDetails.value.addChat(type, id, chat)
  }

  function sendChat(chat) {
    chatDetails.value.sendChat(chat)
  }

  function refreshChatHistory() {
    chatDetails.value.refresh()
  }

  function refreshInformationBlock() {
    if (relationshipStore.infoUid[0] === MessageType.PERSON) personalInformationKey.value++
    else if (relationshipStore.infoUid[0] === MessageType.GROUP) groupInformationKey.value++
  }

  return {
    tabs,
    messageBar,
    chatDetails,
    personalInformationKey,
    groupInformationKey,
    changeTab,
    addChat,
    sendChat,
    refreshChatHistory,
    refreshInformationBlock
  }
})
