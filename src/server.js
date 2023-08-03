const express = require("express");
const bodyParser = require("body-parser");
export function createServer(ipcMain, mainWindow) {
  const app = express();

  app.use(bodyParser.json());

  let answer;
  ipcMain.handle("SEND-PROMPT-REPLY", (event, arg) => {
    answer = arg;
  });
  app.post("/ask", async (req, res) => {
    const data = req.body;
    console.log(data);
    mainWindow.webContents.send("SEND-PROMPT", data);
    const ans = await new Promise((r) => {
      const interval = setInterval(() => {
        if (answer) {
          clearInterval(interval);
          r(answer);
        }
      }, 3000);
    });
    res.json({
      message: ans,
    });
    answer = null;
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}
