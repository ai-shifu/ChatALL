window.ipcRenderer = require("electron").ipcRenderer;
window.shell = require("electron").shell;
console.log("preload.js loaded", window.ipcRenderer);
