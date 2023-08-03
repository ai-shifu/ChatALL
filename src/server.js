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
    let ans;
    try {
      ans = await new Promise((r) => {
        const interval = setInterval(() => {
          if (answer) {
            clearInterval(interval);
            r(answer);
          }
        }, 3000);
      });
    } finally {
      answer = null;
    }
    res.send(ans);
    // eslint-disable-next-line no-debugger
    // debugger;
  });

  app.listen(8000, () => {
    console.log("Server is listening on port 8000");
  });
}
