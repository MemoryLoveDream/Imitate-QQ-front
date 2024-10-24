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
    const messages = reactive(new Set())
    const chatterUid = ref([0, 0])
    const infoUid = ref([0, 0])
    const personalGroupingTypes = ref(['我'])
    const chatter = ref()
    const history = ref()
    const info = ref()
    const relationships = reactive(new Map())
    const chatHistory = reactive(new Map())

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
      relationships.set(uid(MessageType.PERSON, userStore.currentUser.id), userStore.currentUser)
      let newMessages = (await api.getNewMessages(userStore.currentUser.id)).data.data
      newMessages.forEach((item) => messages.add(uid1(item)))
      let temp = [].concat(newMessages)
      readJson('message_list').forEach((item) => {
        if (!messages.has(uid1(item))) {
          messages.add(uid1(item))
          temp.push(item)
        }
      })
      for (let item of temp) {
        await getInfo(item.messageType, item.id)
        await getChatHistory(item.messageType, item.id)
        messageList.value.push(createMessage(item.messageType, item.id))
      }
      newMessages.forEach((item) => chatHistory.get(uid1(item)).push(...item.chats))

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
        let history = chatHistory.get(uuid)
        return history.length === 0 ? '' : history[history.length - 1].sendTime
      })
      message.chatType = computed(() => {
        let history = chatHistory.get(uuid)
        return history.length === 0 ? '' : history[history.length - 1].chatType
      })
      message.content = computed(() => {
        let history = chatHistory.get(uuid)
        return message.chatType.value === ChatType.PICTURE
          ? '[图片]'
          : history.length === 0
            ? ''
            : history[history.length - 1].content
      })
      message.unread = 0
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

    function getHeadUrl(id) {
      return relationships.get(uid(MessageType.PERSON, id)).headUrl
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
      getChatHistory,
      getHeadUrl
    }
  }
  // { persist: true }
)
