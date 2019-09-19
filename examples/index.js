'use strict'
const { BrowserWindow, app } = require('electron')
const parseArgs = require('minimist')
const electronTerminalOpen = require('electron-terminal-open')

let mainWindow

function createMainWindow() {
  const win = new BrowserWindow({
    title: 'sample-app',
    width: 400,
    height: 500,
  })

  if (process.env.NODE_ENV === 'development') {
    win.openDevTools()
  }

  win.loadURL(`https://kangax.github.io/compat-table/es6/`)
  win.on('closed', () => {
    mainWindow = null
  })

  return win
}

const args = parseArgs(process.argv.slice(1))

if (args.h || args.help) {
  console.log(`help sample`)
  process.exit(0) // eslint-disable-line
}

if (args.v || args.version) {
  console.log(app.getName(), app.getVersion())
  process.exit(0) // eslint-disable-line
}

app.on('ready', () => {
  electronTerminalOpen(app)
    .then(() => {
      mainWindow = createMainWindow()
    })
    .catch(err => {
      console.log(err)
    })
})

app.on('activate', () => {
  mainWindow.show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
