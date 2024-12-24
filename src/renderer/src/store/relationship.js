import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from './user'
import { ChatType, MessageType } from '../constants/enums'
import api from '../services/api'
import { SetList } from '../utils/data'
import { readJson, writeJson } from '../utils/free'

export const useRelationshipStore = defineStore('relationship', () => {
  const us = useUserStore()
  //PersonalInfo
  //{id,nickname,sex,note,grouping,signature,country,location,status}
  //GroupInfo
  //{id,name,nickname,note,role,introduction,announcement,number,leaderHeadUrl,memberHeadUrls}
  //LatestMessage
  //{senderId,groupId,nickname,headUrl,sendTime,messageType,chatType,content,unread}
  //MemberInfo
  //{type,id,nickname,headUrl,signature}
  //Chat
  //{senderId,headUrl,sendTime,messageType,chatType,content}
  const relationships = reactive(new Map())
  const messageList = reactive(new SetList())
  const chatter = ref({ type: null, id: null, info: null, history: null })
  const displayer = ref({ type: null, id: null, info: null })
  const personalGroupingTypes = ref(['我'])

  function joinRelationshipJson(id) {
    return us.joinUsersJson(`${us.currentUser.id}/${id}`)
  }

  async function changeChatterUid(type, id) {
    chatter.value = getInfo(type, id)
  }

  async function changeInfoUid(type, id) {
    displayer.value = getInfo(type, id)
  }

  async function initialize() {
    relationships.set(us.currentUser.id, us.currentUser)
    let newMessages = (await api.listNewMessages(us.currentUser.id)).data.data
    let messages = new SetList()
    messages.load(newMessages)
    messages.soleLoad(readJson(joinRelationshipJson('message_list')))
    for (let item of messages.list) {
      await getInfo(item.messageType, item.id)
    }
    newMessages.forEach((item) => {
      relationships.get(item.id).history.unread += item.unread
      relationships.get(item.id).history.details.push(...item.chats)
    })
    messages.list.forEach((item) => messageList.push(createMessage(item.messageType, item.id)))
    personalGroupingTypes.value = (await api.listPersonalGroupingTypes(us.currentUser.id)).data.data
  }

  function createMessage(type, id) {
    let message = {}
    message.messageType = type
    message.id = id
    message.avatarPath = api.getAvatarPath(type, id)
    message.nickname = computed(() => {
      let chatter = relationships.get(id).info
      let note = chatter.note
      return note === ''
        ? message.messageType === MessageType.PERSON
          ? chatter.nickname
          : chatter.name
        : note
    })
    message.sendTime = computed(() => {
      let details = relationships.get(id).history.details
      return details.length === 0 ? '' : details[details.length - 1].sendTime
    })
    message.chatType = computed(() => {
      let details = relationships.get(id).history.details
      return details.length === 0 ? '' : details[details.length - 1].chatType
    })
    message.content = computed(() => {
      let details = relationships.get(id).history.details
      return message.chatType.value === ChatType.PICTURE
        ? '[图片]'
        : details.length === 0
          ? ''
          : details[details.length - 1].content
    })
    message.unread = computed({
      get() {
        return relationships.get(id).history.unread
      },
      set(value) {
        relationships.get(id).history.unread = value
      }
    })
    return message
  }

  async function addMessage(type, id) {
    if (!messageList.has(id)) {
      messageList.unshift(createMessage(type, id))
      return 0
    } else messageList.get(id)
  }

  async function getInfo(type, id) {
    if (!relationships.has(id)) {
      let relationship = { type: type, id: id, info: null, history: null }
      //getInfo
      let data = { i: us.currentUser.id, you: id }
      let res =
        type === MessageType.PERSON ? await api.getPersonalInfo(data) : await api.getGroupInfo(data)
      relationship.info = res.data.data
      //getHistory
      let history = readJson(joinRelationshipJson(id))
      if (Object.keys(history).length === 0) history = { unread: 0, details: [] }
      else {
        let record = history.details
        let details = []
        for (let piece of record) {
          let chat = {}
          for (let i = 0; i < 4; i++) {
            chat[['senderId', 'sendTime', 'chatType', 'content'][i]] = piece[i]
          }
          chat.senderId = chat.senderId === 1 ? us.currentUser.id : id
          details.push(chat)
        }
        history.details = details
      }
      relationship.history = history
      relationships.set(id, relationship)
    }
    return relationships.get(id)
  }

  function addChat(type, id, chat) {
    if (chatter.value.type !== type || chatter.value.id !== id) history.unread += 1
    history.details.push(chat)
  }

  function finalize() {
    writeJson(joinRelationshipJson('message_list'), messageList.list)
  }

  return {
    messageList,
    personalGroupingTypes,
    chatter,
    displayer,
    relationships,
    changeChatterUid,
    changeInfoUid,
    initialize,
    finalize,
    addMessage,
    getInfo,
    addChat
  }
})
