import { ElMessage } from 'element-plus'

export function ifEmpty(str, value) {
  if (str === undefined || str === null || str === '') return value
  else return str
}

export function isPhoneNumber(str) {
  return /^1[3-9]\d{9}$/.test(str)
}

export function isEmail(str) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
}

export function readJson(path) {
  return JSON.parse(window.api.read(path))
}

export function writeJson(path, data, space = '') {
  window.api.write(path, JSON.stringify(data, null, space))
}

export function warningMessage(message) {
  ElMessage({ type: 'warning', message: message })
}

export function selectImage() {
  return window.api.selectFile({
    filters: [
      {
        name: 'Images',
        extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp', 'avif', 'bmp', 'sharpp', 'apng']
      }
    ],
    properties: ['openFile']
  })
}
