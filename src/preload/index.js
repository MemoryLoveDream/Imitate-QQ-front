import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  quit: (name) => {
    ipcRenderer.invoke('quit', name).then(() => {})
  },
  change_size: () => {
    ipcRenderer.invoke('change_size').then(() => {})
  },
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
  create_child: (name, width, height, router) => {
    ipcRenderer.invoke('create_child', name, width, height, router).then(() => {})
  },
  write: (path, data) => {
    ipcRenderer.invoke('write', path, data).then(() => {})
  },
  read: (path) => {
    return ipcRenderer.sendSync('read', path)
  },
  select_file: (options) => {
    return ipcRenderer.sendSync('select_file', options)
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
