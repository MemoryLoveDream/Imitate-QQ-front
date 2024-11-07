import { app, shell, BrowserWindow, ipcMain, globalShortcut, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { dialog } from 'electron'

const path = require('path')
const axios = require('axios')
const windowMap = new Map()
let peerId = ''

const consoleShortcutKeys = ['A', 'Q', 'W', 'E', 'R', 'T']
const keySet = new Set()
function getKey() {
  for (let key of consoleShortcutKeys) {
    if (!keySet.has(key)) {
      keySet.add(key)
      return key
    }
  }
}

function createWindow(name, width, height, router, others = {}) {
  let newWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    minWidth: others.minWidth === undefined ? 0 : others.minWidth,
    minHeight: others.minHeight === undefined ? true : others.minHeight,
    resizable: others.resizable === undefined ? true : others.resizable,
    transparent: others.transparent === undefined ? false : others.transparent,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  let key = getKey()
  newWindow.on('ready-to-show', () => {
    globalShortcut.register(`CommandOrControl+${key}`, () => {
      newWindow.webContents.openDevTools()
    })
    windowMap.set(name, newWindow)
    newWindow.show()
  })
  newWindow.on('closed', () => {
    windowMap.delete(name)
    newWindow = null
    keySet.delete(key)
    globalShortcut.unregister(`CommandOrControl+${key}`)
  })

  newWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then()
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#' + router).then()
  } else {
    newWindow.loadFile(join(__dirname, '../renderer/index.html')).then()
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  protocol.registerFileProtocol('img', (request, callback) => {
    const url = request.url.substr(7)
    callback(decodeURI(path.normalize(url)))
  })
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow('login', 330, 450, '/fast_login', { resizable: false })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow('login', 330, 450, '/fast_login', { resizable: false })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//对外接口
// ipcMain.handle('change_size', () => {
//   mainWindow.setSize(970, 680)
//   mainWindow.center()
// })
//窗口处理
ipcMain.handle('maximize', (event, name) => {
  windowMap.get(name).maximize()
})

ipcMain.handle('unmaximize', (event, name) => {
  windowMap.get(name).unmaximize()
})

ipcMain.handle('minimize', (event, name) => {
  windowMap.get(name).minimize()
})

ipcMain.handle('show', (event, name) => {
  windowMap.get(name).show()
})

ipcMain.handle('hide', (event, name) => {
  windowMap.get(name).hide()
})

ipcMain.handle('close', (event, name) => {
  windowMap.get(name).close()
})

ipcMain.handle('create-window', (event, name, width, height, router, others) => {
  createWindow(name, width, height, router, others)
})
//文件处理
ipcMain.handle('write', (event, path, data) => {
  fs.writeFile(path, data, (error) => {
    if (error) throw error
  })
})

ipcMain.handle('read-file', (event, path) => {
  return fs.readFileSync(path)
})

ipcMain.on('read', (event, path) => {
  if (fs.existsSync(path)) event.returnValue = fs.readFileSync(path, 'utf8')
  else event.returnValue = '{}'
})

ipcMain.on('select-file', (event, options) => {
  event.returnValue = dialog.showOpenDialogSync(windowMap.get('main'), options)
})

ipcMain.on('get-project-path', (event) => {
  event.returnValue = process.env['INIT_CWD']
})

ipcMain.on('make-dir', (event, name) => {
  fs.mkdirSync(name)
})

ipcMain.handle('download-file', async (event, url, path) => {
  const writer = fs.createWriteStream(path)
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })
  response.data.pipe(writer)
})
//其它处理
ipcMain.on('set-peer-id', (event, id) => {
  peerId = id
})

ipcMain.on('get-peer-id', (event) => {
  event.returnValue = peerId
})
