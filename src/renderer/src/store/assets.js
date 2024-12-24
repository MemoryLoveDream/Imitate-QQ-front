import { defineStore } from 'pinia'
import { ref } from 'vue'
import string from '../utils/string'
import file from '../utils/file'

export const useAssetsStore = defineStore('assets', () => {
  const config = ref()
  const assetsLocation = ref()
  const usersLocation = ref()

  function joinAssetsJson(name) {
    return `${assetsLocation.value}/${name}.json`
  }

  function initialize() {
    config.value = file.readJson(joinAssetsJson('config'))
    assetsLocation.value = `${window.api.getProjectPath()}/assets`
    usersLocation.value = string.ifEmpty(
      config.value.usersLocation,
      `${assetsLocation.value}/users`
    )
  }

  function finalize() {
    file.writeJson(joinAssetsJson('config'), config.value, '\t')
  }

  return {
    config,
    assetsLocation,
    usersLocation,
    joinAssetsJson,
    initialize,
    finalize
  }
})
