import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserStore } from './user'
import { ChatType, MessageType, RelationshipType } from '../constants/enums'
import api from '../service/api'
import { SetList } from '../utils/struct'
import sql from '../service/sql'
import file from '../utils/file'
import array from '../utils/array'

export const useRelationshipStore = defineStore('relationship', () => {
  const us = useUserStore()
  //PersonalInfo
  //{id,nickname,sex,note,grouping,signature,country,location,status}
  //GroupInfo
  //{id,name,nickname,note,role,introduction,announcement,number,leader,members}
  //LatestMessage
  //{senderId,groupId,nickname,sendTime,messageType,chatType,content,unread}
  //Chat
  //{senderId,sendTime,messageType,chatType,content}
  const relationships = reactive(new Map())
  const messageList = reactive(new SetList())
  const chatter = ref({ relationshipType: null, id: null, info: null, history: null })
  const displayer = ref({ relationshipType: null, id: null, info: null })

  function joinRelationshipJson(id) {
    return us.joinUsersJson(`${us.currentUser.id}/${id}`)
  }

  function getDatabase() {
    return us.joinDatabase(`${us.currentUser.id}/message`)
  }

  async function initialize() {
    window.api.connectDatabase(getDatabase())
    relationships.set(us.currentUser.id, us.currentUser)
    let newMessages = (await api.listNewMessages(us.currentUser.id)).data.data
    let messages = new SetList()
    messages.load(newMessages)
    messages.soleLoad(file.readJson(joinRelationshipJson('message_list')))
    for (let item of messages.list) {
      await getInfo(item.messageType, item.id)
    }
    newMessages.forEach((item) => {
      relationships.get(item.id).history.unread += item.unread
      relationships.get(item.id).history.chats.push(...item.chats)
    })
    messages.list.forEach((item) => messageList.push(createMessage(item.messageType, item.id)))
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
        ? message.messageType === MessageType.FRIEND
          ? chatter.nickname
          : chatter.name
        : note
    })
    message.sendTime = computed(() => {
      let chats = relationships.get(id).history.chats
      return chats.length === 0 ? '' : chats[chats.length - 1].sendTime
    })
    message.chatType = computed(() => {
      let chats = relationships.get(id).history.chats
      return chats.length === 0 ? '' : chats[chats.length - 1].chatType
    })
    message.content = computed(() => {
      let chats = relationships.get(id).history.chats
      return message.chatType.value === ChatType.PICTURE
        ? '[图片]'
        : chats.length === 0
          ? ''
          : chats[chats.length - 1].content
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

  function addMessage(type, id) {
    if (!messageList.has(id)) {
      messageList.unshift(createMessage(type, id))
      return 0
    } else return messageList.getIndex(id)
  }

  async function getInfo(type, id) {
    if (!relationships.has(id)) {
      let relationship = { relationshipType: type, id: id, info: null, history: null }
      //getInfo
      let data = { i: us.currentUser.id, you: id }
      let res =
        type === RelationshipType.FRIEND
          ? await api.getFriendInfo(data)
          : await api.getGroupInfo(data)
      relationship.info = res.data.data
      //getHistory
      let history = file.readJson(joinRelationshipJson(id))
      if (Object.keys(history).length === 0) history = { unread: 0, chats: [] }
      else {
        let chats = sql.listFriendMessages(array.becomePalindrome([id, us.currentUser.id]))
        for (let item of chats) {
          if (item['chatType'] === ChatType.FILE) {
            item['content'] = {
              name: item['content'].split(',')[0],
              size: item['content'].split(',')[1]
            }
          }
        }
        console.log(chats)
        history.chats = chats
      }
      relationship.history = history
      relationships.set(id, relationship)
    }
    return relationships.get(id)
  }

  function addChat(type, id, chat) {
    if (chatter.value.relationshipType !== type || chatter.value.id !== id)
      relationships.get(id).history.unread += 1
    relationships.get(id).history.chats.push(chat)
  }

  function finalize() {
    file.writeJson(joinRelationshipJson('message_list'), messageList.list)
  }

  return {
    relationships,
    messageList,
    chatter,
    displayer,
    initialize,
    finalize,
    addMessage,
    getInfo,
    addChat
  }
})
