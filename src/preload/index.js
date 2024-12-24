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
  mkdir: (name) => {
    ipcRenderer.sendSync('mkdir', name)
  },
  downloadFile: (request, path) => {
    ipcRenderer.invoke('download-file', request, path).then(() => {})
  },
  connectDatabase: (path) => {
    ipcRenderer.invoke('connect-database', path).then(() => {})
  },
  databaseRun: (sql, param) => {
    ipcRenderer.sendSync('database-run', sql, param)
  },
  databaseGet: (sql, param) => {
    return ipcRenderer.sendSync('database-get', sql, param)
  },
  databaseAll: (sql, param) => {
    return ipcRenderer.sendSync('database-all', sql, param)
  },
  databaseEach: (sql, param, callback) => {
    ipcRenderer.sendSync('database-each', sql, param, callback)
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
