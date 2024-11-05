const { app, BrowserWindow } = require('electron');
const path = require('path');

// Replace electron-is-dev with manual check
const isDev = !app.isPackaged;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 280,
    height: 340,  // Slightly taller to accommodate title bar
    frame: true,  // Enable window frame
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false, // Don't show until ready
    icon: path.join(__dirname, 'icon.png'), // Add your icon here
  });

  const startURL = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.setMenuBarVisibility(false);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
