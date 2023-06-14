"use strict";

import { app, autoUpdater, net } from "electron";

let localMainWindow;

const saveLatestVersion = (data) => {
  if (data) {
    const latestVersion = JSON.parse(data).tag_name;
    const currentVersion = app.getVersion();
    localMainWindow.webContents.executeJavaScript(`
            const storage = JSON.parse(localStorage.getItem("chatall-app"));
            const updatedVersions = { ...storage.versions, current: "v${currentVersion}", latest: "${latestVersion}"};
            storage.versions = updatedVersions;
            localStorage.setItem("chatall-app", JSON.stringify(storage));
            `,
    );
  }
};

const getLatestVersionFromGithub = () => {
  const request = net.request({
    method: "GET",
    protocol: "https:",
    hostname: "api.github.com",
    path: "/repos/sunner/ChatALL/releases/latest",
  });
  request.on("response", (response) => {
    response.on("data", (data) => saveLatestVersion(data));
  });
  request.setHeader("Content-Type", "application/json");
  request.end();
};

const updateApp = (mainWindow) => {
  localMainWindow = mainWindow;
  autoUpdater.on("error", getLatestVersionFromGithub);
  require("update-electron-app")();
};

export default updateApp;
