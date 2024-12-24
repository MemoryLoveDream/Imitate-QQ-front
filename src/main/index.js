import { app, shell, BrowserWindow, ipcMain, globalShortcut, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { dialog } from 'electron'

const path = require('path')
const sqlite3 = require('sqlite3')
const windowMap = new Map()
let peerId = ''
let database

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

ipcMain.on('mkdir', (event, name) => {
  fs.mkdirSync(name)
})

ipcMain.handle('download-file', async (event, request, path) => {
  ;(await request).data.pipe(fs.createWriteStream(path))
})

//其它处理
ipcMain.handle('connect-database', (event, path) => {
  database = new sqlite3.Database(path, function (err) {
    if (err) console.error('连接数据库错误：' + err.message)
  })
  database.run(
    'create table if not exists message (messageType integer, senderId text, receiverId text, ' +
      'sendTime text, chatType integer, content text);'
  )
})

ipcMain.on('database-run', (event, sql, param) => {
  database.run(sql, param, function (err) {
    if (err) console.error(err)
  })
})

ipcMain.on('database-get', (event, sql, param) => {
  database.get(sql, param, function (err, row) {
    if (err) console.error(err)
    else event.returnValue = row
  })
})

ipcMain.on('database-all', (event, sql, param) => {
  database.all(sql, param, function (err, rows) {
    if (err) console.error(err)
    else event.returnValue = rows
  })
})

ipcMain.on('database-each', (event, sql, param, callback) => {
  database.each(sql, param, callback)
})

ipcMain.on('set-peer-id', (event, id) => {
  peerId = id
})

ipcMain.on('get-peer-id', (event) => {
  event.returnValue = peerId
})
