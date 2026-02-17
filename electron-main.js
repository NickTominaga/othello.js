const { app, BrowserWindow } = require('electron');
const path = require('path');

const SERVER_HOST = process.env.HOST || '127.0.0.1';
const SERVER_PORT = Number(process.env.PORT || 3450);

let mainWindow;
let server;

function startExpressServer() {
  const serverPath = path.join(__dirname, 'server.js');
  // server.js exports the HTTP server instance.
  // Loading it starts Express, then we can connect Electron to it.
  // eslint-disable-next-line global-require, import/no-dynamic-require
  server = require(serverPath);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(`http://${SERVER_HOST}:${SERVER_PORT}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startExpressServer();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (server && typeof server.close === 'function') {
    server.close();
  }
});
