import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useAssetsStore } from './assets'
import { readJson, writeJson } from '../utils/free'
import api from '../services/api'

export const useUserStore = defineStore('user', () => {
  const as = useAssetsStore()

  const loginedUsers = reactive(new Map())
  const latestLoginedUser = ref()
  const currentUser = ref()

  function joinUsersJson(name) {
    return `${as.usersLocation}/${name}.json`
  }

  function getAvatarPath(id) {
    return `img:///${as.usersLocation}/${id}/avatar.jpg`
  }

  function initialize() {
    let record = readJson(joinUsersJson('logined_users'))
    record.had.forEach((user) => {
      user.avatarPath = getAvatarPath(user.id)
      loginedUsers.set(user.id, user)
    })
    latestLoginedUser.value = record.latest
  }

  function updateLatestLoginedUser(id, password) {
    latestLoginedUser.value.id = id
    latestLoginedUser.value.password = password
  }

  function login(id) {
    window.api.downloadFile(api.getAvatarPath({ type: 1, id: id }), getAvatarPath(id))
  }

  function register() {
    login()
    window.api.mkdir(`${as.usersLocation}/${currentUser.value.id}`)
  }

  function saveLoginedUser() {
    writeJson(joinUsersJson('logined_users'), {
      latest: latestLoginedUser.value,
      had: [...loginedUsers.values()]
    })
  }

  return {
    latestLoginedUser,
    currentUser,
    loginedUsers,
    joinUsersJson,
    getAvatarPath,
    initialize,
    updateLatestLoginedUser,
    login,
    register,
    saveLoginedUser
  }
})
