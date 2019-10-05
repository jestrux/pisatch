const { menubar } = require('menubar');

const mb = menubar({
  width: 600, height: 400,
  webPreferences: {nodeIntegration: true}
});

mb.on('ready', () => {
  console.log('app is ready');
});

// mb.on('after-create-window', () => mb.window.openDevTools())