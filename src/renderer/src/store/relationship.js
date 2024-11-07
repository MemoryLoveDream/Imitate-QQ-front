import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from './user'
import { ChatType, MessageType } from '../constants/enums'
import api from '../services/apis'

export const useRelationshipStore = defineStore(
  'relationship',
  () => {
    const userStore = useUserStore()
    //PersonalInfo
    //{id,nickname,headUrl,email,sex,note,grouping,signature,country,location,status}
    //GroupInfo
    //{id,name,headUrl,nickname,note,role,introduction,announcement,number,leaderHeadUrl,memberHeadUrls}
    //LatestMessage
    //{senderId,groupId,nickname,headUrl,sendTime,messageType,chatType,content,unread}
    //MemberInfo
    //{type,id,nickname,headUrl,signature}
    //Chat
    //{senderId,headUrl,sendTime,messageType,chatType,content}
    const messageList = ref([])
    const relationships = reactive(new Map())
    const chatHistory = reactive(new Map())
    const messages = reactive(new Set())
    const chatter = ref({ type: null, id: null, info: null, history: null })
    const displayer = ref({ type: null, id: null, info: null })
    const personalGroupingTypes = ref(['我'])

    function readJson(name) {
      return userStore.readJson(`${userStore.currentUser.id}/${name}`)
    }

    function writeJson(name, data, space = '') {
      window.api.write(`${userStore.currentUser.id}${name}`, JSON.stringify(data, null, space))
    }

    function uid(type, id) {
      return `${type === MessageType.PERSON ? 's' : 'g'}${id}`
    }

    function uid1(item) {
      return uid(item.messageType, item.id)
    }

    async function changeChatterUid(type, id) {
      chatter.value.type = type
      chatter.value.id = id
      chatter.value.info = await getInfo(type, id)
      chatter.value.history = await getChatHistory(type, id)
    }

    async function changeInfoUid(type, id) {
      displayer.value.type = type
      displayer.value.id = id
      displayer.value.info = await getInfo(type, id)
    }

    async function initialize() {
      relationships.set(uid(MessageType.PERSON, userStore.currentUser.id), userStore.currentUser)
      let newMessages = (await api.getNewMessages(userStore.currentUser.id)).data.data
      newMessages.forEach((item) => messages.add(uid1(item)))
      let temp = [].concat(newMessages)
      let oldMessages = readJson('message_list')
      if (Array.isArray(oldMessages)) {
        oldMessages.forEach((item) => {
          if (!messages.has(uid1(item))) {
            messages.add(uid1(item))
            temp.push(item)
          }
        })
      }
      for (let item of temp) {
        await getInfo(item.messageType, item.id)
        await getChatHistory(item.messageType, item.id)
        messageList.value.push(createMessage(item.messageType, item.id))
      }
      newMessages.forEach((item) => {
        chatHistory.get(uid1(item)).unread += item.unread
        chatHistory.get(uid1(item)).details.push(...item.chats)
      })

      personalGroupingTypes.value = (
        await api.getPersonalGroupingTypes(userStore.currentUser.id)
      ).data.data
    }

    function createMessage(type, id) {
      let uuid = uid(type, id)
      let message = {}
      message.messageType = type
      message.id = id
      message.headUrl = computed(() => relationships.get(uuid).headUrl)
      message.nickname = computed(() => {
        let chatter = relationships.get(uuid)
        let note = chatter.note
        return note === ''
          ? message.messageType === MessageType.PERSON
            ? chatter.nickname
            : chatter.name
          : note
      })
      message.sendTime = computed(() => {
        let details = chatHistory.get(uuid).details
        return details.length === 0 ? '' : details[details.length - 1].sendTime
      })
      message.chatType = computed(() => {
        let details = chatHistory.get(uuid).details
        return details.length === 0 ? '' : details[details.length - 1].chatType
      })
      message.content = computed(() => {
        let details = chatHistory.get(uuid).details
        return message.chatType.value === ChatType.PICTURE
          ? '[图片]'
          : details.length === 0
            ? ''
            : details[details.length - 1].content
      })
      message.unread = computed({
        get() {
          return chatHistory.get(uuid).unread
        },
        set(value) {
          chatHistory.get(uuid).unread = value
        }
      })
      return message
    }

    async function addMessage(type, id) {
      let uuid = uid(type, id)
      if (!messages.has(uuid)) {
        await getInfo(type, id)
        await getChatHistory(type, id)
        let message = createMessage(type, id)
        messages.add(uuid)
        messageList.value.unshift(message)
        return 0
      } else
        for (let index in messageList.value)
          if (messageList.value[index].messageType === type && messageList.value[index].id === id)
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
        if (Object.keys(chats).length === 0) chats = { unread: 0, details: [] }
        else {
          let details = chats.details
          let newDetails = []
          for (let chat of details) {
            await getInfo(type, id)
            let newChat = {}
            for (let i = 0; i < 4; i++) {
              newChat[['senderId', 'sendTime', 'chatType', 'content'][i]] = chat[i]
            }
            newChat.senderId = newChat.senderId === 1 ? userStore.currentUser.id : id
            newDetails.push(newChat)
          }
          chats.details = newDetails
        }
        chatHistory.set(uuid, chats)
      }
      return chatHistory.get(uuid)
    }

    async function addChat(type, id, chat) {
      let history = await getChatHistory(type, id)
      if (chatter.value.type !== type || chatter.value.id !== id) history.unread += 1
      history.details.push(chat)
    }

    function getHeadUrl(id) {
      return relationships.get(uid(MessageType.PERSON, id)).headUrl
    }

    function finalize() {
      writeJson('message_list', messageList)
    }

    return {
      messageList,
      personalGroupingTypes,
      chatter,
      displayer,
      relationships,
      chatHistory,
      uid,
      changeChatterUid,
      changeInfoUid,
      initialize,
      finalize,
      addMessage,
      getInfo,
      addChat,
      getChatHistory,
      getHeadUrl
    }
  }
  // { persist: true }
)
