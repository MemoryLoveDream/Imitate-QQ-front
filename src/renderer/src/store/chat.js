import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useUserStore } from './user'
import { useConfigStore } from './config'

export const useChatStore = defineStore(
  'chat',
  () => {
    const config = useConfigStore()
    const user = useUserStore()

    const messageList = ref([])
    const chatHistory = reactive(new Map())

    const url = ref()

    function toJsonUrl(filename) {
      return url.value + filename + '.json'
    }

    function readJson(filename) {
      return JSON.parse(window.api.read(toJsonUrl(filename)))
    }

    function writeJson(filename, data) {
      window.api.write(toJsonUrl(filename), JSON.stringify(data.value))
    }

    function loadChatHistory() {
      for (let message of messageList.value) {
        chatHistory.set(message.id, readJson(message.id))
      }
    }

    function getChatHistory() {
      return chatHistory.get(user.current_partner.id)
    }

    function addChatHistory(chat) {
      chatHistory.get(user.current_partner.id).push(chat)
    }

    function initialize() {
      url.value = config.chat_history_location + user.current_user.id + '/'
      messageList.value = readJson('message_list')
      loadChatHistory()
    }

    function save() {
      writeJson('message_list', messageList)
    }

    return {
      messageList,
      chatHistory,
      initialize,
      save,
      addChatHistory,
      getChatHistory
    }
  },
  { persist: true }
)
