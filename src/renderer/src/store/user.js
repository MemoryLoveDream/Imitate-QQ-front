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
    const currentUser = ref()
    const loginedUsers = reactive(new Map())

    function initialize() {
      readJson('logined_users').forEach((user) => loginedUsers.set(user.id, user))
    }

    function toJsonUrl(name) {
      return `${assetsStore.usersLocation}${name}.json`
    }

    function readJson(name) {
      return JSON.parse(window.api.read(toJsonUrl(name)))
    }

    function writeJson(name, data, space = '') {
      window.api.write(toJsonUrl(name), JSON.stringify(data, null, space))
    }

    function updateLatestLoginedUser(id, password) {
      latestLoginedUser.value.id = id
      latestLoginedUser.value.password = password
    }

    function saveLoginedUser() {
      writeJson('logined_users', [...loginedUsers.values()])
    }

    return {
      latestLoginedUser,
      currentUser,
      loginedUsers,
      initialize,
      readJson,
      writeJson,
      updateLatestLoginedUser,
      saveLoginedUser
    }
  }
  // { persist: true }
)
