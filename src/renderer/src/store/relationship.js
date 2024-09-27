import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useConfigStore } from './config'
import { useUserStore } from './user'

export const useRelationshipStore = defineStore(
  'relationship',
  () => {
    const configStore = useConfigStore()
    const userStore = useUserStore()

    const messageList = ref([])
    const relationshipType = ref('single')
    const singleGroupingTypes = ref([
      {
        value: '我',
        label: '我'
      },
      {
        value: '元老',
        label: '元老'
      }
    ])
    const singleGrouping = ref([
      {
        name: '我',
        number: '1/1',
        members: [
          {
            type: 'single',
            id: 1000000000,
            nickname: '忆恋梦',
            headUrl: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg',
            signature: '欢迎使用逛逛！'
          }
        ]
      },
      {
        name: '元老',
        number: '5/5',
        members: [
          {
            type: 'single',
            id: 1000000001,
            nickname: '努力工作的小熊',
            headUrl: '/src/assets/pic/head/working_bear.png',
            signature: '努力拼搏，迎接美好的未来！'
          },
          {
            type: 'single',
            id: 1000000002,
            nickname: '萌萌的小雪人',
            headUrl: '/src/assets/pic/head/girl_snowman.png',
            signature: '喜欢下雪的冬天，嘻嘻！'
          },
          {
            type: 'single',
            id: 1000000003,
            nickname: 'yearbook',
            headUrl: '/src/assets/pic/head/yearbook.png',
            signature: 'yearbook！'
          },
          {
            type: 'single',
            id: 1000000004,
            nickname: '微风滚青草',
            headUrl: '/src/assets/pic/head/wind_grass.png',
            signature: '享受风轻轻拂过身体的自由，享受躺在草地上的自在！'
          },
          {
            type: 'single',
            id: 1000000005,
            nickname: '逃离孤独',
            headUrl: '/src/assets/pic/head/stones.png',
            signature: '习惯了一个人的孤独，是否还愿意再入喧嚣！'
          }
        ]
      }
    ])
    const groupGrouping = ref([
      {
        name: '置顶群',
        number: '0/0',
        members: []
      },
      {
        name: '我创建的群',
        number: '1/1',
        members: [
          {
            type: 'group',
            id: 1000000001,
            name: '元老会',
            headUrl: '/src/assets/pic/head/icon.png'
          }
        ]
      },
      {
        name: '我管理的群',
        number: '0/0',
        members: []
      },
      {
        name: '我加入的群',
        number: '0/0',
        members: []
      }
    ])
    const singleInformation = ref({
      id: 1000000001,
      nickname: '努力工作的小熊',
      headUrl: '/src/assets/pic/head/working_bear.png',
      email: '2274399174@qq.com',
      sex: 1,
      note: '卷王熊',
      grouping: '元老',
      signature: '努力拼搏，迎接美好的未来！',
      country: '中国',
      location: '江苏·南京',
      status: 1
    })
    const groupInformation = ref({
      id: 1000000001,
      name: '元老会',
      headUrl: '/src/assets/pic/head/icon.png',
      note: '',
      nickname: '开国大元帅',
      introduction: '',
      announcement: ''
    })
    const singleChatHistory = reactive(new Map())
    const groupChatHistory = reactive(new Map())

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
        if (message.type === 'single') singleChatHistory.set(message.id, readJson('s' + message.id))
        else if (message.type === 'group')
          singleChatHistory.set(message.id, readJson('g' + message.id))
      }
    }

    function getChatHistory() {
      if (relationshipType.value === 'single')
        return singleChatHistory.get(singleInformation.value.id)
      else if (relationshipType.value === 'group')
        return groupChatHistory.get(groupInformation.value.id)
    }

    function addChatHistory(chat) {
      if (relationshipType.value === 'single')
        singleChatHistory.get(singleInformation.value.id).push(chat)
      else if (relationshipType.value === 'group')
        return groupChatHistory.get(groupInformation.value.id).push(chat)
    }

    function initialize() {
      url.value = configStore.chatHistoryLocation + userStore.currentUser.id + '/'
      messageList.value = readJson('message_list')
      loadChatHistory()
    }

    function save() {
      writeJson('message_list', messageList)
    }

    return {
      messageList,
      relationshipType,
      singleGroupingTypes,
      singleGrouping,
      groupGrouping,
      singleInformation,
      groupInformation,
      singleChatHistory,
      groupChatHistory,
      initialize,
      save,
      addChatHistory,
      getChatHistory
    }
  },
  // { persist: true }
)
