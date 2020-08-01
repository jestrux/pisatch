const path = require('path');
const { menubar } = require('menubar');
const { ipcMain, clipboard, shell } = require("electron");

const mb = menubar({
  icon: path.join(__dirname, 'icon.png'),
  browserWindow: {
    width: 630, height: 80,
    backgroundColor: "#000000"
  },
  preloadWindow: true,
  webPreferences: {nodeIntegration: true}
});

mb.on('ready', () => {
  console.log('app is ready');
});

ipcMain.on('send-tweet', () => {
  let twitterUrl = "https://twitter.com/intent/tweet?text=";
  twitterUrl += "Yo, check out this really cool image search menu app by @jestrux it's 🔥🔥";
  twitterUrl += " &url=https://github.com/jestrux/Search-Images-Menu-App";

  shell.openExternal(twitterUrl);
});

ipcMain.on('copy-link', (event, link) => {
  clipboard.writeText(link, 'selection')
});

ipcMain.on('state-change', (event, state) => {
  switch (state) {
    case "searching":
    case "no-results":
      mb.window.setSize(630, 150)
      break;
  
    default:
      mb.window.setSize(630, 460);
      break;
  }
})

// mb.on('after-create-window', () => mb.window.openDevTools())