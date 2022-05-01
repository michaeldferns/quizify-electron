const path = require('path');
const { app, BrowserWindow } = require('electron');

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.removeMenu();

  const filePath = path.join(__dirname, '../index.html');

  mainWindow.loadFile(filePath);

  mainWindow.once('ready-to-show', () => {
    if (mainWindow !== null) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
  }
});
