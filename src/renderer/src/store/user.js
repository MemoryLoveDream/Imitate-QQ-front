import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useAssetsStore } from './assets'

export const useUserStore = defineStore(
  'user',
  () => {
    const assetsStore = useAssetsStore()

    const latestLoginedUser = ref({
      id: 1000000000,
      password: '123456'
    })
    const currentUser = ref({
      id: 1000000000,
      nickname: '忆恋梦',
      headUrl: 'img:///E:/project/Vue/easychat-front/assets/users/1000000000/head.jpg',
      email: '2274399174@qq.com',
      sex: 1,
      signature: '或许…等待…美好…',
      country: '中国',
      location: '江苏·南京',
      status: 1
    })
    const loginedUsers = reactive(new Map())

    function readJson(name) {
      return assetsStore.readJson('users', name)
    }

    function writeJson(name, data) {
      assetsStore.writeJson('users', name, data)
    }

    function updateLatestLoginedUser(id, password) {
      latestLoginedUser.value.id = id
      latestLoginedUser.value.password = password
    }

    function initialize() {
      for (let i of readJson('logined_users')) {
        loginedUsers.set(i.id, i)
      }
    }

    function saveLoginedUser() {
      writeJson('logined_users', [...loginedUsers.values()])
    }

    return {
      latestLoginedUser,
      currentUser,
      loginedUsers,
      updateLatestLoginedUser,
      initialize,
      saveLoginedUser
    }
  }
  // { persist: true }
)
