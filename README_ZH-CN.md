<div align="center">
   <img src="src/assets/logo-cover.png" width=256></img>
   <p><strong>同时与所有 AI 机器人聊天，找到最佳答案</strong></p>

[Deutsch](README_DE-DE.md) | [English](README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Tiếng Việt](README_VI-VN.md) | 简体中文

</div>

## 屏幕截图

![Screenshot](screenshots/screenshot-1.png?raw=true)

## 功能

基于大型语言模型（LLMs）的 AI 机器人非常神奇。然而，它们的行为可能是随机的，不同的机器人在不同的任务上表现也有差异。如果你想获得最佳体验，不要一个一个尝试。ChatALL（中文名：齐叨）可以把一条指令同时发给多个 AI，帮助您发现最好的回答。你需要做的只是[下载、安装](https://github.com/sunner/ChatALL/releases)和提问。

### 支持的 AI

| AI 机器人                                                    | 网页访问 | API      | 说明                                     |
| ------------------------------------------------------------ | -------- | -------- | ---------------------------------------- |
| [ChatGPT](https://chat.openai.com)                           | 支持     | 支持     | 包含 Web Browsing                        |
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
| [通义千问](https://qianwen.aliyun.com/)                      | 支持     | 即将推出 |                                          |

还会有更多。[到这里](https://github.com/sunner/ChatALL/labels/more%20LLMs)为你喜欢的 AI 投票吧。

### 其他功能

- 快问模式：不需要等待前面的请求完成，就可以发下一条指令
- 对话历史保存在本地，保护你的隐私
- 高亮喜欢的答案，删除不需要的答案
- 自动保持 ChatGPT 不掉线
- 随时启用/禁用任何机器人
- 在一列、两列或三列视图之间切换
- 支持多语言（中文，英语，德语，法语，俄语，越南语，韩语）
- 支持 Windows，macOS 和 Linux

计划中：

欢迎参与这些功能的开发。

- [ ] 夜间模式
- [ ] 多聊天窗口
- [ ] 把前端部署到 GitHub Pages
- [ ] 集成 LangChain

## 预先需要

ChatALL 是一个客户端，而不是代理。因此，您必须：

1. 拥有可以访问这些 AI 的帐号，或 API token。
2. 与 AI 网站有可靠的网络连接。
3. 如果是通过 VPN 访问，那么必须设置为系统/全局代理。

## 下载 / 安装

从 https://github.com/sunner/ChatALL/releases 下载

### Windows 系统

直接下载 \*-win.exe 安装文件并运行之。

### macOS 系统

对于苹果硅芯片 Mac（M1，M2 CPU），请下载 \*-mac-arm64.dmg 文件。

对于其他 Mac，下载 \*-mac-x64.dmg 文件。

如果运行时系统提示不能检查软件是否是恶意的，那么按照 [Apple 官方指引](https://support.apple.com/guide/mac-help/apple-cant-check-app-for-malicious-software-mchleab3a043/mac)操作即可。

### Linux 系统

下载 .AppImage 文件，将其设置为可执行，然后双击就可运行。

## 给开发者

### 贡献新的 AI 机器人

[这份文档](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA)能提供一些帮助。

### 环境依赖

Node.js 必须是 v16.x

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
