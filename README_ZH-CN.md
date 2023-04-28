<div align="center">
   <img src="src/assets/logo-cover.png" width=128></img>
   <p><strong>同时与所有 AI 机器人聊天，发现最佳选择</strong></p>
</div>

## 屏幕截图

![Screenshot](screenshots/screenshot-1.png?raw=true)

## 功能

基于大型语言模型（LLMs）的 AI 机器人非常神奇。然而，它们的行为可能是随机的，不同的机器人在不同的任务上表现也有差异。如果你想获得最佳体验，不要一个一个尝试。ChatALL（中文名：齐叨）可能帮助您发现最棒的选择。

### 支持的机器人

| AI机器人       | 网页访问  | API         | 备注                                    |
|----------------|-------------|-------------|---------------------------------------|
| [ChatGPT](https://chat.openai.com)        | 支持          | 即将推出     | 支持多个模型                           |
| [Bing Chat](https://www.bing.com/new)      | 支持          | 无 API          | 可同时和三种风格聊天                       |
| [文心一言](https://yiyan.baidu.com/)   |  否     | 即将推出     | 谁能破解它的 Web API？                   |
| [Bard](https://bard.google.com/)           | 支持     | 无 API          |                                       |
| [Poe](https://poe.com/) | 即将推出     | 即将推出     |                                       |
| [MOSS](https://moss.fastnlp.top/)           | 即将推出 | 无 API      | |
| [通义千问](http://tongyi.aliyun.com/) | 即将推出     | 即将推出     | 谁能提供邀请码？                         |
| [得到学习助手](https://ai.dedao.cn/) | 即将推出     |  否     |                          |
| [讯飞星火](http://xinghuo.xfyun.cn/)  | 即将推出 | 无 API     | |

更多...

### 其他功能

* 不需要注册。使用您自己的对话机器人帐户登录
* 随时启用/禁用任何机器人
* 在一列、两列或三列视图之间切换
* 支持多种语言（中文，英文）
* 在后台保持 ChatGPT session 不中断
* 批处理模式，不需要等待前面的请求完成，就可以发下一条指令
* [TODO] 推荐最佳答案

## 先决条件

ChatALL 是一个客户端，而不是代理。因此，您必须：

1. 拥有有效帐户和/或 API token。
2. 拥有与机器人网站的可靠网络连接。
3. 如果是通过代理访问，那么必须设置为系统代理。

## 下载 / 安装

从 https://github.com/sunner/ChatALL/releases 下载

### Windows 系统

直接下载 *-win-x64.exe （多数情况下） 或 *-win-arm64.exe 安装文件并运行之。

### macOS 系统

对于苹果硅芯片 Mac（M1，M2 CPU），请下载 *-mac-arm64.dmg 文件。

对于其他 Mac，下载 *-mac-x64.dmg 文件。

### Linux 系统

下载 .AppImage 文件，将其设置为可执行，然后双击就可运行。

## 开发者

### Run

```bash
npm install
npm run electron:serve
```

### Build

为您当前的平台构建：
```bash
npm run electron:build
```

为所有平台构建：
```bash
npm run electron:build -- -wml --x64 --arm64
```

###  致谢

* GPT-4 贡献了大部分代码
* ChatGPT，Bing Chat 和 Google 提供了许多解决方案（排名分先后）
* 受 [ChatHub](https://github.com/chathub-dev/chathub) 启发。致敬！
