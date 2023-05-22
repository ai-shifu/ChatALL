"use strict";

import { app, protocol, BrowserWindow, ipcMain, autoUpdater } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

const DEFAULT_USER_AGENT = ""; // Empty string to use the Electron default
let mainWindow = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// Auto Updater
require("update-electron-app")();

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: "./preload.js",
    },
  });

  mainWindow = win;

  // Force the SameSite attribute to None for all cookies
  // This is required for the cross-origin request to work
  win.webContents.session.cookies.on(
    "changed",
    async (event, cookie, cause, removed) => {
      if (
        !removed &&
        cause === "explicit" &&
        cookie.sameSite !== "no_restriction"
      ) {
        try {
          const domain = cookie.domain.startsWith(".")
            ? cookie.domain.substring(1)
            : cookie.domain;
          const url = `https://${domain}${cookie.path}`;
          let newCookie = {
            url: url,
            name: cookie.name,
            value: cookie.value,
            path: cookie.path,
            httpOnly: cookie.httpOnly,
            expirationDate: cookie.expirationDate,
            secure: true, // Must be true for cross-origin cookies
            sameSite: "no_restriction",
          };
          // If the domain starts with a dot, set the domain as is.
          // Otherwise, Electron will use the url domain without the first dot as default.
          if (cookie.domain.startsWith(".")) {
            newCookie.domain = cookie.domain;
          }

          await win.webContents.session.cookies.set(newCookie);
        } catch (error) {
          console.error(error, cookie);
        }
      }
    },
  );

  // Modify the Referer header for each request.
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { url, requestHeaders } = details;
      const urlObj = new URL(url);

      // Only replace outbound access and electron origin
      if (
        ["http:", "https:"].includes(urlObj.protocol) &&
        !["localhost", "127.0.0.1"].includes(urlObj.hostname) &&
        requestHeaders["Referer"]
      ) {
        const refererObj = new URL(requestHeaders["Referer"]);
        if (["localhost", "127.0.0.1"].includes(refererObj.hostname)) {
          const referer = `${urlObj.protocol}//${urlObj.host}/`;
          requestHeaders["Referer"] = referer;
        }
      }

      // To depress the 403 error
      if (url.startsWith("https://bard.google.com/faq")) {
        requestHeaders["sec-fetch-mode"] = "navigate";
      } else if (url.includes("BardChatUi")) {
        requestHeaders["origin"] = "https://bard.google.com";
        requestHeaders["sec-fetch-site"] = "same-origin";
      }

      callback({ requestHeaders });
    },
  );

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

function createNewWindow(url, userAgent = "") {
  const newWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // webSecurity: false,  // false will break Cloudflare captcha challenge
    },
  });

  if (userAgent) {
    newWin.webContents.setUserAgent(userAgent);
  }
  newWin.loadURL(url);

  // Get the secret of MOSS
  if (url.includes("moss.fastnlp.top")) {
    newWin.on("close", async (e) => {
      try {
        e.preventDefault(); // Prevent the window from closing
        const secret = await newWin.webContents.executeJavaScript(
          'localStorage.getItem("flutter.token");',
        );
        mainWindow.webContents.send("moss-secret", secret);
      } catch (error) {
        console.error(error);
      }
      newWin.destroy(); // Destroy the window manually
    });
  }
}

ipcMain.handle("create-new-window", (event, url, userAgent) => {
  createNewWindow(url, userAgent);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  if (DEFAULT_USER_AGENT) {
    app.userAgentFallback = DEFAULT_USER_AGENT;
  }

  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
