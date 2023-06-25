import { app, dialog } from 'electron';
import fs from 'fs';
import path from 'path';

function createMenuTemplate(mainWindow) {
  return [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Proxy Settings',
          click: async () => {
            const userDataPath = app.getPath('userData');
            const proxySettingPath = path.join(userDataPath, 'proxySetting.json');
            let proxySetting;
            try {
              proxySetting = JSON.parse(fs.readFileSync(proxySettingPath, 'utf8'));
            } catch (err) {
              console.error(`读取文件失败: ${err}`);
            }

            const message = `Proxy Settings\n\nYou can Set the Proxy in the File: ${proxySettingPath}\n\nAfter change this, you need to restart the program. \n\nCurrent Proxy Setting: ${proxySetting.proxyServer ? proxySetting.proxyServer : 'Not set'}`;
            console.log(message);
            await dialog.showMessageBox(mainWindow, {
              type: 'info',
              message: message,
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];
}

export default createMenuTemplate;
