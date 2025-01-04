"use strict";

import { app, autoUpdater, net } from "electron";

let localMainWindow;

const saveLatestVersion = async (data) => {
  if (data) {
    try {
      const latestVersion = JSON.parse(data).tag_name;
      const currentVersion = app.getVersion();
      const saveVersionScript = `
      localStorage.setItem(
        "chatall-versions",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("chatall-versions")),
          current: "v${currentVersion}",
          latest: "${latestVersion}",
        })
      );`;
      await localMainWindow.webContents.executeJavaScript(saveVersionScript);
      localMainWindow.webContents.send("version-saved");
      autoUpdater.removeListener("error", getLatestVersionFromGithub);
    } catch (error) {
      console.error(`data: ${JSON.stringify(data)}`);
      console.error(JSON.stringify(error));
    }
  }
};

const getLatestVersionFromGithub = () => {
  const request = net.request({
    method: "GET",
    protocol: "https:",
    hostname: "api.github.com",
    path: "/repos/ai-shifu/ChatALL/releases/latest",
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
  require("update-electron-app").updateElectronApp();
};

export default updateApp;
