
// --------------------------------------------------- //
// ------------------ Electron Main ------------------ //
// --------------------------------------------------- //

const { BrowserWindow, app } = require('electron')
require('./app.js')

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`http://localhost:8080/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready', main)