import { app, dialog, Menu } from 'electron';
import fs from 'fs';
import path from 'path';

const userDataPath = app.getPath('userData');
const proxySettingPath = path.join(userDataPath, 'proxySetting.json');
let proxySetting;
let enableProxy;
let proxyMode;
let PACMode;
let proxyServer;
let PACUrl;
let PACfile;
readSetting();

function readSetting() {
  try {
    proxySetting = JSON.parse(fs.readFileSync(proxySettingPath, 'utf8'));
  } catch (err) {
    console.error(`Read File failed: ${err}`);
  }
  enableProxy = proxySetting.enableProxy ? proxySetting.enableProxy : 'Yes';
  proxyMode = proxySetting.proxyMode ? proxySetting.proxyMode : 'All';
  PACMode = proxySetting.PACMode ? proxySetting.PACMode : 'File';
  proxyServer = proxySetting.proxyServer ? proxySetting.proxyServer : 'Not set';
  PACUrl = proxySetting.PACUrl ? proxySetting.PACUrl : 'Not set';
  PACfile = proxySetting.PACfile ? proxySetting.PACfile : 'Not set';
}

function updateSetting(key, value, mainWindow) {
  // Read the settings from file
  let settings = JSON.parse(fs.readFileSync(proxySettingPath, 'utf8'));
  // Update the specific setting
  settings[key] = value;
  // Write all settings back to file
  fs.writeFileSync(proxySettingPath, JSON.stringify(settings), 'utf8');
  // Update the menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
}

function createMenuTemplate(mainWindow) {
  return [
    {
      label: 'Proxy Settings',
      submenu: [
        {
          label: 'How to Setup Proxy',
          click: async () => {

            const message = `Setup the Proxy in File: ${proxySettingPath}\n\nAfter change, you need to restart the program.`;
            await dialog.showMessageBox(mainWindow, {
              type: 'info',
              message: message,
              buttons: ['OK']
            });
          }
        },

        {
          type: 'separator',
        },
        {
          label: `Enable Proxy: ${enableProxy}`,
          submenu: [
            {
              label: 'Yes',
              type: 'radio',
              click: () => {
                enableProxy = 'Yes';
                updateSetting('enableProxy', enableProxy, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },
            {
              label: 'No',
              type: 'radio',
              click: () => {
                enableProxy = 'No';
                updateSetting('enableProxy', enableProxy, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },
          ],
        },
        {
          label: `Proxy Mode: ${proxyMode}`,
          enabled: enableProxy === 'Yes',
          submenu: [
            {
              label: 'All',
              type: 'radio',
              click: () => {
                proxyMode = 'All';
                updateSetting('proxyMode', proxyMode, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },
            {
              label: 'PAC',
              type: 'radio',
              click: () => {
                proxyMode = 'PAC';
                updateSetting('proxyMode', proxyMode, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },

          ],
        },
        {
          label: `PAC Mode: ${PACMode}`,
          enabled: enableProxy === 'Yes' && proxyMode === 'PAC',
          submenu: [
            {
              label: 'File',
              type: 'radio',
              click: () => {
                PACMode = 'File';
                updateSetting('PACMode', PACMode, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },
            {
              label: 'URL',
              type: 'radio',
              click: () => {
                PACMode = 'URL';
                updateSetting('PACMode', PACMode, mainWindow);
                Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              },
            },

          ],
        },
        {
          label: 'Select PAC File',
          enabled: enableProxy === 'Yes' && proxyMode === 'PAC' && PACMode === 'File',
          click: async () => {
            const { filePaths } = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [{ name: 'All Files', extensions: ['*'] }]
            });
            if (filePaths.length > 0) {
              PACfile = filePaths[0];
              updateSetting('PACfile', PACfile, mainWindow);
              Menu.setApplicationMenu(Menu.buildFromTemplate(createMenuTemplate(mainWindow)));
              readSetting();
            }
          }
        },
        {
          type: 'separator',
        },
        {
          label: `Proxy: ${proxyServer}`,
        },
        {
          label: 'Proxy Settings File',
          submenu: [
            {
              label: `Proxy File: ${proxySettingPath}`,
              click: async () => {

                const message = `Proxy File: ${proxySettingPath}`;
                await dialog.showMessageBox(mainWindow, {
                  type: 'info',
                  message: message,
                  buttons: ['OK']
                });
              }
            },
          ]

        },
        {
          label: `PAC Url: ${PACUrl ? 'Set' : 'Not Set'}`,
          submenu: [
            {
              label: `PAC Url: ${PACUrl}`,
            },
          ]
        },
        {
          label: `PAC File: ${PACfile ? 'Set' : 'Not Set'}`,
          submenu: [
            {
              label: `PAC File: ${PACfile}`,
            },
          ]
        },
        {
          type: 'separator',
        },
        {
          label: 'Restart Me!',
          click: () => {
            app.relaunch();
            app.exit();
          }
        },
      ]
    }
  ];
}

export default createMenuTemplate;
