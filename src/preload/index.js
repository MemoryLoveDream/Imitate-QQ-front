import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  close: (name) => {
    ipcRenderer.invoke('close', name).then(() => {})
  },
  // changeSize: () => {
  //   ipcRenderer.invoke('change_size').then(() => {})
  // },
  maximize: (name) => {
    ipcRenderer.invoke('maximize', name).then(() => {})
  },
  unmaximize: (name) => {
    ipcRenderer.invoke('unmaximize', name).then(() => {})
  },
  minimize: (name) => {
    ipcRenderer.invoke('minimize', name).then(() => {})
  },
  show: (name) => {
    ipcRenderer.invoke('show', name).then(() => {})
  },
  hide: (name) => {
    ipcRenderer.invoke('hide', name).then(() => {})
  },
  createWindow: (name, width, height, router, others) => {
    ipcRenderer.invoke('create-window', name, width, height, router, others).then(() => {})
  },
  write: (path, data) => {
    ipcRenderer.invoke('write', path, data).then(() => {})
  },
  readFile: (path) => {
    return ipcRenderer.invoke('read-file', path)
  },
  read: (path) => {
    return ipcRenderer.sendSync('read', path)
  },
  selectFile: (options) => {
    return ipcRenderer.sendSync('select-file', options)
  },
  getProjectPath: () => {
    return ipcRenderer.sendSync('get-project-path')
  },
  makeDir: (name) => {
    ipcRenderer.sendSync('make-dir', name)
  },
  downloadFile: (url, path) => {
    ipcRenderer.invoke('download-file', url, path).then(() => {})
  },
  setPeerId: (id) => {
    ipcRenderer.sendSync('set-peer-id', id)
  },
  getPeerId: () => {
    return ipcRenderer.sendSync('get-peer-id')
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
