import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRelationshipStore = defineStore(
  'relationship',
  () => {
    const type = ref('single')

    const grouping_types = ref([
      {
        value: '我',
        label: '我'
      },
      {
        value: '元老',
        label: '元老'
      }
    ])

    const single_grouping = ref([
      {
        name: '我',
        number: '1/1',
        members: [
          {
            type: 'single',
            id: 1000000000,
            nickname: '忆恋梦',
            head_url: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg',
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
            head_url: '/src/assets/pic/head/working_bear.png',
            signature: '努力拼搏，迎接美好的未来！'
          },
          {
            type: 'single',
            id: 1000000002,
            nickname: '萌萌的小雪人',
            head_url: '/src/assets/pic/head/girl_snowman.png',
            signature: '喜欢下雪的冬天，嘻嘻！'
          },
          {
            type: 'single',
            id: 1000000003,
            nickname: 'yearbook',
            head_url: '/src/assets/pic/head/yearbook.png',
            signature: 'yearbook！'
          },
          {
            type: 'single',
            id: 1000000004,
            nickname: '微风滚青草',
            head_url: '/src/assets/pic/head/wind_grass.png',
            signature: '享受风轻轻拂过身体的自由，享受躺在草地上的自在！'
          },
          {
            type: 'single',
            id: 1000000005,
            nickname: '逃离孤独',
            head_url: '/src/assets/pic/head/stones.png',
            signature: '习惯了一个人的孤独，是否还愿意再入喧嚣！'
          }
        ]
      }
    ])

    const group_grouping = ref([
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
            head_url: '/src/assets/pic/head/icon.png'
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

    const single_information = ref({
      id: 1000000001,
      nickname: '努力工作的小熊',
      head_url: '/src/assets/pic/head/working_bear.png',
      sex: 1,
      status: 1,
      note: '卷王熊',
      grouping: '元老',
      signature: '努力拼搏，迎接美好的未来！'
    })

    const group_information = ref({
      id: 1000000001,
      name: '元老会',
      head_url: '/src/assets/pic/head/icon.png',
      note: '',
      nickname: '开国大元帅',
      introduction: '',
      announcement: ''
    })

    return {
      type,
      grouping_types,
      single_grouping,
      group_grouping,
      single_information,
      group_information
    }
  },
  { persist: true }
)
