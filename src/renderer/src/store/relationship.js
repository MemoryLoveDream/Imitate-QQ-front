import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useUserStore } from './user'
import { MessageType } from './constants'
import api from '../services/apis'

export const useRelationshipStore = defineStore(
  'relationship',
  () => {
    const userStore = useUserStore()

    const messageList = ref([])
    const messages = reactive(new Map())
    const chatterUid = ref([0, 0])
    const infoUid = ref([0, 0])
    const personalGroupingTypes = ref(['我'])
    const chatter = ref()
    const history = ref()
    const info = ref()
    const relationships = reactive(new Map())
    const chatHistory = reactive(new Map())

    function readJson(name) {
      return userStore.readJson(`${userStore.currentUser.id}${name}`)
    }

    function writeJson(name, data, space = '') {
      window.api.write(`${userStore.currentUser.id}${name}`, JSON.stringify(data, null, space))
    }

    function uid(type, id) {
      return `${type === MessageType.PERSON ? 's' : 'g'}${id}`
    }

    function uid1(item) {
      return uid(item.messageType, item.senderId)
    }

    async function changeChatterUid(type, id) {
      chatterUid.value[0] = type
      chatterUid.value[1] = id
      chatter.value = await getInfo(type, id)
      history.value = await getChatHistory(type, id)
    }

    async function changeInfoUid(type, id) {
      infoUid.value[0] = type
      infoUid.value[1] = id
      info.value = await getInfo(type, id)
    }

    async function initialize() {
      let res = await api.getLatestMessages(userStore.currentUser.id)
      messageList.value = res.data.data
      messageList.value.forEach((item) => messages.set(uid1(item), item))
      readJson('message_list').forEach((item) => {
        if (!messages.has(uid1(item))) {
          messages.set(uid1(item), item)
          messageList.value.push(item)
        }
      })
      relationships.set(uid(MessageType.PERSON, userStore.currentUser.id), userStore.currentUser)
      for (const item of messageList.value) {
        await getInfo(item.messageType, item.senderId)
        await getChatHistory(item.messageType, item.senderId)
      }

      res = await api.getPersonalGroupingTypes(userStore.currentUser.id)
      personalGroupingTypes.value = res.data.data
    }

    async function addMessage(type, id) {
      let uuid = uid(type, id)
      if (!messages.has(uuid)) {
        let history = await getChatHistory(type, id)
        let message
        if (history.length === 0) message = {}
        else message = history[history.length - 1]
        message.messageType = type
        message.nickname = await getInfo(type, id).nickname
        message.unread = 0
        messages.set(uuid, message)
        messageList.value.unshift(message)
        return 0
      } else
        for (let index in messageList.value)
          if (
            messageList.value[index].messageType === type &&
            messageList.value[index].senderId === id
          )
            return index
    }

    async function getInfo(type, id) {
      let uuid = uid(type, id)
      if (!relationships.has(uuid)) {
        let data = { i: userStore.currentUser.id, you: id }
        let res =
          type === MessageType.PERSON
            ? await api.getPersonalInfo(data)
            : await api.getGroupInfo(data)
        relationships.set(uuid, res.data.data)
      }
      return relationships.get(uuid)
    }

    async function getChatHistory(type, id) {
      let uuid = uid(type, id)
      if (!chatHistory.has(uuid)) {
        let chats = readJson(uuid)
        if (Object.keys(chats).length !== 0) {
          for (let chat of chats) {
            await getInfo(type, id)
            let src = ['a', 'b', 'c', 'd']
            for (let i = 0; i < 4; i++) {
              chat[['senderId', 'sendTime', 'chatType', 'content'][i]] = chat[src[i]]
              delete chat[src[i]]
            }
            chat.senderId = chat.senderId === 1 ? userStore.currentUser.id : id
            chat.headUrl = relationships.get(uid(MessageType.PERSON, chat.senderId)).headUrl
          }
        }
        return chatHistory.set(uuid, chats).get(uuid)
      } else return chatHistory.get(uuid)
    }

    async function addChatHistory(type, id, chat) {
      ;(await getChatHistory(type, id)).push(chat)
    }

    function finalize() {
      writeJson('message_list', messageList)
    }

    return {
      messageList,
      personalGroupingTypes,
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
      getInfo,
      addChatHistory,
      getChatHistory
    }
  }
  // { persist: true }
)
