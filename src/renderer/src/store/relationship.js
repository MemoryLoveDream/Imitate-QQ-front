import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useAssetsStore } from './assets'
import { useUserStore } from './user'
import axios from 'axios'
import { MessageType } from './constants'

export const useRelationshipStore = defineStore(
  'relationship',
  () => {
    const assetsStore = useAssetsStore()
    const userStore = useUserStore()

    const messageList = ref([])
    const chatterUid = ref([0, 0])
    const infoUid = ref([0, 0])
    const singleGroupingTypes = ref(['我'])
    const chatter = ref()
    const history = ref()
    const info = ref()
    const messages = reactive(new Map())
    const relationships = reactive(new Map())
    const chatHistory = reactive(new Map())

    function readJson(name) {
      return assetsStore.readJson('users', `${userStore.currentUser.id}/${name}`)
    }

    function writeJson(name, data) {
      assetsStore.writeJson('users', `${userStore.currentUser.id}/${name}`, data.value)
    }

    function uid(type, id) {
      return `${type === MessageType.SINGLE ? 's' : 'g'}${id}`
    }

    function changeChatterUid(type, id) {
      chatterUid.value[0] = type
      chatterUid.value[1] = id
      chatter.value = getInfo(type, id)
      history.value = getChatHistory(type, id)
    }

    function changeInfoUid(type, id) {
      infoUid.value[0] = type
      infoUid.value[1] = id
      info.value = getInfo(type, id)
    }

    function initialize() {
      axios.post(`/message/latest_messages/${userStore.currentUser.id}`).then((response) => {
        messageList.value = response.data.data
        for (let message of messageList.value)
          messages.set(uid(message.messageType, message.senderId), message)
        for (let message of readJson('message_list')) {
          if (!messages.has(uid(message.messageType, message.senderId))) {
            messages.set(uid(message.messageType, message.senderId), message)
            messageList.value.push(message)
          }
        }
        relationships.set(uid(MessageType.SINGLE, userStore.currentUser.id), userStore.currentUser)
        for (let message of messageList.value) getChatHistory(message.messageType, message.senderId)
      })
      axios.post(`/relationship/grouping/${userStore.currentUser.id}`).then((response) => {
        singleGroupingTypes.value.push(...response.data.data)
      })
    }

    function addMessage(type, id) {
      let uuid = uid(type, id)
      if (!messages.has(uuid)) {
        let history = getChatHistory(type, id)
        let message = history[history.length - 1]
        message.messageType = type
        message.receiverId = id
        message.nickname = getInfo(type, id).nickname
        message.unread = 0
        messages.set(uuid, message)
        messageList.value.unshift(message)
      }
    }

    function addInfo(type, id, action = () => {}) {
      let uuid = uid(type, id)
      if (!relationships.has(uuid)) {
        axios
          .post(`/${type === MessageType.SINGLE ? 'user/single_info' : 'group/group_info'}`, {
            i: userStore.currentUser.id,
            you: id
          })
          .then((response) => {
            relationships.set(uuid, response.data.data)
            action()
          })
      } else action()
    }

    function getInfo(type, id) {
      return relationships.get(uid(type, id))
    }

    function getChatHistory(type, id) {
      let uuid = uid(type, id)
      if (!chatHistory.has(uuid)) {
        let chats = readJson(uuid)
        if (Object.keys(chats).length !== 0) {
          for (let chat of chats) {
            getInfo(type, id)
            chat.senderId = chat.a === 1 ? userStore.currentUser.id : id
            chat.headUrl = relationships.get(uid(MessageType.SINGLE, chat.senderId)).headUrl
            chat.sendTime = chat.b
            chat.chatType = chat.c
            chat.content = chat.d
            delete chat.a
            delete chat.b
            delete chat.c
            delete chat.d
          }
        }
        return chatHistory.set(uuid, chats).get(uuid)
      } else return chatHistory.get(uuid)
    }

    function addChatHistory(t, i, chat) {
      getChatHistory(t, i).push(chat)
    }

    function finalize() {
      writeJson('message_list', messageList)
    }

    return {
      messageList,
      singleGroupingTypes,
      chatterUid,
      infoUid,
      chatter,
      history,
      info,
      relationships,
      chatHistory,
      uid,
      changeChatterUid,
      changeInfoUid,
      initialize,
      finalize,
      addMessage,
      addInfo,
      getInfo,
      addChatHistory,
      getChatHistory
    }
  }
  // { persist: true }
)
