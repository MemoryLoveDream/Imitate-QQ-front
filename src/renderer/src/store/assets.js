import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAssetsStore = defineStore(
  'assets',
  () => {
    const assetsLocation = ref('E:/project/Vue/easychat-front/assets/')
    const usersLocation = computed(() => assetsLocation.value + 'users/')
    const configLocation = computed(() => assetsLocation.value + 'config/')

    function toJsonUrl(tag, name) {
      return assetsLocation.value + tag + '/' + name + '.json'
    }

    function readJson(tag, name) {
      return JSON.parse(window.api.read(toJsonUrl(tag, name)))
    }

    function writeJson(tag, name, data) {
      window.api.write(toJsonUrl(tag, name), JSON.stringify(data))
    }

    return {
      assetsLocation,
      usersLocation,
      configLocation,
      readJson,
      writeJson
    }
  },
  { persist: true }
)
