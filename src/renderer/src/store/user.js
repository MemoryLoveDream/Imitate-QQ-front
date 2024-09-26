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
    const current_user = ref({
      id: 1000000000,
      nickname: '忆恋梦',
      head_url: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg',
      sex: 1,
      status: 1,
      location: '江苏·南京',
      signature: '或许…等待…美好…'
    })
    const current_partner = ref({
      id: 1000000001,
      nickname: '努力工作的小熊',
      head_url: '/src/assets/png/working_bear.png'
    })
    const logined_users = ref([
      {
        id: 1000000000,
        nickname: '忆恋梦',
        head_url: 'img:///E:/project/Vue/easychat-front/config/users/1000000000/head.jpg'
      },
      {
        id: 1000000001,
        nickname: '努力工作的小熊',
        head_url: '/src/assets/png/working_bear.png'
      }
    ])
    const users = ref()

    function change_user(id) {
      current_user.value = users.value.get(id)
    }

    function change_partner(id) {
      current_partner.value = users.value.get(id)
    }

    function initialize() {
      users.value = new Map()
      users.value.set(1000000001, {
        id: 1000000001,
        nickname: '努力工作的小熊',
        head_url: '/src/assets/png/working_bear.png'
      })
      users.value.set(999999999, {
        id: 999999999,
        nickname: 'electron',
        head_url: '/src/assets/png/icon.png'
      })
      // current_partner.value.id = 0
    }

    function read() {
      console.log(current_user)
    }

    return {
      latestLoginedUser,
      current_user,
      current_partner,
      logined_users,
      users,
      change_user,
      change_partner,
      initialize,
      read,
    }
  },
  { persist: true }
)
