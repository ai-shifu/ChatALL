const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const iconPath =
    process.platform === "darwin"
      ? path.join(__dirname, "assets/icon.icns")
      : path.join(__dirname, "assets/icon.ico");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
