import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssetsStore = defineStore('assets', () => {
  const assetsLocation = ref()
  const config = ref()
  const usersLocation = ref()

  function initialize() {
    assetsLocation.value = `${window.api.getProjectPath()}/assets/`
    config.value = readJson('config')
    if (config.value.usersLocation === '') usersLocation.value = `${assetsLocation.value}users/`
  }

  function toJsonUrl(name) {
    return `${assetsLocation.value}${name}.json`
  }

  function readJson(name) {
    return JSON.parse(window.api.read(toJsonUrl(name)))
  }

  function writeJson(name, data, space = '') {
    window.api.write(toJsonUrl(name), JSON.stringify(data, null, space))
  }

  function finalize() {
    writeJson('config', config.value, '\t')
  }

  return {
    assetsLocation,
    usersLocation,
    config,
    initialize,
    readJson,
    writeJson,
    finalize
  }
})
