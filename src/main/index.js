import { app, shell, BrowserWindow, ipcMain, globalShortcut, protocol } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import { dialog } from 'electron'

const path = require('path')
let mainWindow
const map = new Map()

let peerId = ''

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 450,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    globalShortcut.register('CommandOrControl+Q', () => {
      mainWindow.webContents.openDevTools()
    })
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then()
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then()
  }
}

const createChildWindow = (name, width1, height1, router) => {
  let childWindow = new BrowserWindow({
    modal: true,
    width: width1,
    height: height1,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  map.set(name, childWindow)

  childWindow.on('ready-to-show', () => {
    globalShortcut.register('CommandOrControl+W', () => {
      childWindow.webContents.openDevTools()
    })
    childWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    childWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#' + router).then()
  } else {
    childWindow.loadFile(join(__dirname, '../renderer/index.html')).then()
  }
  childWindow.on('closed', () => {
    childWindow = null
  })
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
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//对外接口
ipcMain.handle('change_size', () => {
  mainWindow.setSize(970, 680)
  mainWindow.center()
})

ipcMain.handle('maximize', (event, name) => {
  if (name === 'main') {
    mainWindow.maximize()
  } else map.get(name).maximize()
})

ipcMain.handle('unmaximize', (event, name) => {
  if (name === 'main') {
    mainWindow.unmaximize()
  } else map.get(name).unmaximize()
})

ipcMain.handle('minimize', (event, name) => {
  if (name === 'main') {
    mainWindow.minimize()
  } else map.get(name).minimize()
})

ipcMain.handle('show', (event, name) => {
  if (name === 'main') {
    mainWindow.show()
  } else map.get(name).show()
})

ipcMain.handle('hide', (event, name) => {
  if (name === 'main') {
    mainWindow.hide()
  } else map.get(name).hide()
})

ipcMain.handle('quit', (event, name) => {
  if (name === 'main') {
    mainWindow.close()
  } else map.get(name).close()
})

ipcMain.handle('create_child', (event, name, width, height, router) => {
  createChildWindow(name, width, height, router)
})

ipcMain.handle('write', (event, path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err
  })
})

ipcMain.on('read', (event, path) => {
  if (fs.existsSync(path)) event.returnValue = fs.readFileSync(path, 'utf8')
  else event.returnValue = '[]'
})

ipcMain.on('select_file', (event, options) => {
  event.returnValue = dialog.showOpenDialogSync(options)
})

ipcMain.on('get_project_path', (event) => {
  event.returnValue = process.env['INIT_CWD']
})

ipcMain.on('make_dir', (event, name) => {
  fs.mkdirSync(name)
})

ipcMain.on('get_project_path', (event) => {
  event.returnValue = process.env['INIT_CWD']
})

ipcMain.on('set_peer_id', (event, id) => {
  peerId = id
})

ipcMain.on('get_peer_id', (event) => {
  event.returnValue = peerId
})
