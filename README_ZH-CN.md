<div align="center">
   <img src="src/assets/logo-cover.png" width=256></img>
   <p><strong>同时与所有 AI 机器人聊天，找到最佳答案</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Tiếng Việt](README_VI-VN.md) | 简体中文

</div>

## 屏幕截图

![Screenshot](screenshots/screenshot-1.png?raw=true)

## 功能

基于大型语言模型（LLMs）的 AI 机器人非常神奇。然而，它们的行为可能是随机的，不同的机器人在不同的任务上表现也有差异。如果你想获得最佳体验，不要一个一个尝试。ChatALL（中文名：齐叨）可以把一条指令同时发给多个 AI，帮助您发现最好的回答。你需要做的只是[下载、安装](https://github.com/sunner/ChatALL/releases)和提问。

### 这是你吗？

ChatALL 的典型用户是：

- 🤠**大模型重度玩家**，希望从大模型找到最好的答案，或者最好的创作
- 🤓**大模型研究者**，直观比较各种大模型在不同领域的优劣
- 😎**大模型应用开发者**，快速调试 prompt，寻找表现最佳的基础模型

### 支持的 AI

| AI 机器人                                                    | 网页访问 | API      | 说明                                     |
| ------------------------------------------------------------ | -------- | -------- | ---------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | 支持     | 支持     | 包含 Web Browsing、Azure OpenAI service  |
| [Bing Chat](https://www.bing.com/new)                        | 支持     | 无 API   | 不需要帐号                               |
| [文心一言](https://yiyan.baidu.com/)                         | 否       | 支持     |                                          |
| [Bard](https://bard.google.com/)                             | 支持     | 即将推出 |                                          |
| [Poe](https://poe.com/)                                      | 支持     | 即将推出 |                                          |
| [MOSS](https://moss.fastnlp.top/)                            | 支持     | 无 API   |                                          |
| [通义千问](http://tongyi.aliyun.com/)                        | 支持     | 即将推出 |                                          |
| [得到学习助手](https://ai.dedao.cn/)                         | 即将推出 | 无 API   |                                          |
| [讯飞星火](http://xinghuo.xfyun.cn/)                         | 支持     | 即将推出 |                                          |
| [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html)   | 支持     | 无 API   | 不需要帐号                               |
| [Vicuna](https://lmsys.org/blog/2023-03-30-vicuna/)          | 支持     | 无 API   | 不需要帐号                               |
| [ChatGLM](https://chatglm.cn/blog)                           | 支持     | 无 API   | 不需要帐号                               |
| [Claude](https://www.anthropic.com/index/introducing-claude) | 支持     | 无 API   | 不需要帐号                               |
| [Gradio](httpps://gradio.app/)                               | 支持     | 无 API   | 用于 Hugging Face space 或自己部署的模型 |
| [HuggingChat](https://huggingface.co/chat/)                  | 支持     | 无 API   |
| [天工](https://neice.tiangong.cn/)                           | 支持     | 即将推出 |                                          |
| [You](https://you.com/)                                      | 支持     | 无 API   |                                          |
| [Pi](https://heypi.com)                                      | 支持     | 无 API   |                                          |
| [360 智脑](https://ai.360.cn/)                               | 支持     | 无       |                                          |
| [YouChat](https://you.com/)                                  | 支持     | 无       |                                          |
| [Open Assistant](https://open-assistant.io/)                 | 支持     | 无       |                                          |
| [Claude](https://claude.ai/)                                 | 支持     | 无       |                                          |
| [Character.AI](https://character.ai/)                        | 支持     | 无       |                                          |

还会有更多。[到这里](https://github.com/sunner/ChatALL/labels/more%20LLMs)为你喜欢的 AI 投票吧。

### 其他功能

- 快问模式：不需要等待前面的请求完成，就可以发下一条指令
- 对话历史保存在本地，保护你的隐私
- 高亮喜欢的答案，删除不需要的答案
- 随时启用/禁用任何机器人
- 在一列、两列或三列视图之间切换
- 自动更新到最新版
- 夜间模式（由 @tanchekwei 贡献）
- 快捷键。按 `Ctrl + /` 可以看到所有快捷键（由 @tanchekwei 贡献）
- 多对话窗口（由 @tanchekwei 贡献）
- 支持设置代理（由 @msaong 贡献）
- 提示词管理（由 @tanchekwei 贡献）
- 支持多语言（中文、英语、德语、法语、俄语、越南语、韩语、日语、西班牙语、意大利语）
- 支持 Windows，macOS 和 Linux

计划中：

欢迎参与这些功能的开发。

- [ ] 把前端部署到 GitHub Pages

## 预先需要

ChatALL 是一个客户端，而不是代理。因此，您必须：

1. 拥有可以访问这些 AI 的帐号，或 API token。
2. 与 AI 网站有可靠的网络连接。

## 下载 / 安装

从 https://github.com/sunner/ChatALL/releases 下载

### Windows 系统

直接下载 \*-win.exe 安装文件并运行之。

### macOS 系统

对于苹果硅芯片 Mac（M1，M2 CPU），请下载 \*-mac-arm64.dmg 文件。

对于其他 Mac，下载 \*-mac-x64.dmg 文件。

如果你在使用 [Homebrew](https://brew.sh/)，可以使用以下命令安装：

```bash
brew install --cask chatall
```

### Linux 系统

下载 .AppImage 文件，将其设置为可执行，然后双击就可运行。

## 问题解决

使用中如果遇到问题，可以尝试如下方法解决：

1. **刷新** - 按下 `Ctrl + R` 或 `Cmd + R`。
2. **重启** - 退出 ChatALL，再重新运行。
3. **重新登录** - 点击右上角的设置按钮，在弹出的窗口中点击对应的登入/登出链接，重新登录网站。
4. **清空消息** - 点击右上角的扫帚按钮。

如果以上方法都不行，那么可以尝试**重置 ChatALL**。注意，这将丢失你所有的设置和消息历史。

删除下面的目录可以重置 ChatALL：

- Windows: `C:\Users\<user>\AppData\Roaming\ChatALL\`
- Linux: `/home/<user>/.config/ChatALL/`
- macOS: `/Users/<user>/Library/Application Support/ChatALL/`

如果问题依旧，请[提交一个 issue](https://github.com/sunner/ChatALL/issues)。

## 给开发者

### 贡献新的 AI 机器人

[这份文档](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA)能提供一些帮助。

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

## 致谢

### 贡献者

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### 其它

- GPT-4 贡献了大部分代码
- ChatGPT，Bing Chat 和 Google 提供了许多解决方案（排名分先后）
- 受 [ChatHub](https://github.com/chathub-dev/chathub) 启发。致敬！

## 赞助

如果您喜欢这个项目，可以通过以下方式支持：

<img src="https://sunner.cn/sponsor/alipay.jpg" width="200" />
<img src="https://sunner.cn/sponsor/wepay.jpg" width="200" />
