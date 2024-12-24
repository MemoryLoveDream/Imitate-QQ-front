import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ifEmpty, readJson, writeJson } from '../utils/free'

export const useAssetsStore = defineStore('assets', () => {
  const config = ref()
  const assetsLocation = ref()
  const usersLocation = ref()

  function joinAssetsJson(name) {
    return `${assetsLocation.value}/${name}.json`
  }

  function initialize() {
    config.value = readJson(joinAssetsJson('config'))
    assetsLocation.value = `${window.api.getProjectPath()}/assets`
    usersLocation.value = ifEmpty(config.value.usersLocation, `${assetsLocation.value}/users`)
  }

  function finalize() {
    writeJson(joinAssetsJson('config'), config.value, '\t')
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
