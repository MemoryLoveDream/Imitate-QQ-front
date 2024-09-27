import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const latestLoginedUser = ref({
      id: 1000000000,
      nickname: '忆恋梦',
      headUrl: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg',
      password: '123456'
    })
    const currentUser = ref({
      id: 1000000000,
      nickname: '忆恋梦',
      headUrl: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg',
      email: '2274399174@qq.com',
      sex: 1,
      signature: '或许…等待…美好…',
      country: '中国',
      location: '江苏·南京',
      status: 1
    })
    const loginedUsers = ref([
      {
        id: 1000000000,
        nickname: '忆恋梦',
        headUrl: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg'
      },
      {
        id: 1000000001,
        nickname: '努力工作的小熊',
        headUrl: '/src/assets/pic/head/working_bear.png'
      }
    ])

    function updateLatestLoginedUser(info, password) {
      latestLoginedUser.value.id = info.id
      latestLoginedUser.value.nickname = info.nickname
      latestLoginedUser.value.headUrl = info.headUrl
      latestLoginedUser.value.password = password
    }

    function loginedUsersMap() {
      let map = new Map()
      for (let i of loginedUsers.value) {
        map.set(i.id, i)
      }
      console.log(map.get(1000000000))
      return map
    }

    function initialize() {}

    function read() {
      console.log(currentUser)
    }

    return {
      latestLoginedUser,
      currentUser,
      loginedUsers,
      updateLatestLoginedUser,
      loginedUsersMap,
      initialize,
      read
    }
  }
  // { persist: true }
)
