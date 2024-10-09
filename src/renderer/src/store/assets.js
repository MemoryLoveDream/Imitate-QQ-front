import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAssetsStore = defineStore(
  'assets',
  () => {
    const assetsLocation = ref('E:/project/Vue/easychat-front/assets/')
    const usersLocation = computed(() => assetsLocation.value + 'users/')
    const configLocation = computed(() => assetsLocation.value + 'config/')

    function toJsonUrl(tag, filename) {
      return assetsLocation.value + tag + filename + '.json'
    }

    function readJson(filename) {
      return JSON.parse(window.api.read(toJsonUrl(filename)))
    }

    function writeJson(filename, data) {
      window.api.write(toJsonUrl(filename), JSON.stringify(data.value))
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
